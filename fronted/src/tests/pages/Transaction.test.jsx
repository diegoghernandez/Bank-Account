import { describe, expect, it, vi } from "vitest";
import { Transaction } from "../../pages/Transaction/Transaction";
import { customRender } from "../../utils/renderTest";
import userEvent from "@testing-library/user-event";
import * as transaction from "../../pages/_services/transactions";
import { waitFor } from "@testing-library/dom";

describe("Transaction page tests", () => {
   it("Should render Transaction page correctly", () => {  
      const { 
         header,
         typeInput,
         amountInput,
         transferInput,
         makeButton,
         cancelButton
      } = getElements();

      expect(header).toBeInTheDocument();
      expect(typeInput).toBeInTheDocument();
      expect(amountInput).toBeInTheDocument();
      expect(transferInput).toBeInTheDocument();
      expect(makeButton).toBeInTheDocument();
      expect(cancelButton).toBeInTheDocument();
   });

   describe("After clicking", () =>  {
      it("Should show the following error, if no type is chosen", async () => {
         const { user, typeInput, amountInput, makeButton } = getElements();

         await user.type(amountInput, "543543");
         await user.click(makeButton);
   
         expect(typeInput).toBeInvalid();
         expect(typeInput).toHaveAccessibleDescription("You must choose one");
      });

      it("Should show an error, if there is a problem with a value", async () => {
         const { page, user, spyTransaction, typeInput, amountInput, transferInput, makeButton} = getElements();

         await user.click(typeInput);
         await user.click(page.getByText("Wire transfer"));
         await user.type(amountInput, "124124");
         await user.type(transferInput, "124124");

         await user.click(makeButton);

         await waitFor(() => {
            expect(spyTransaction).toHaveBeenCalledTimes(1);
            expect(spyTransaction).toHaveBeenLastCalledWith({
               "amount": 124124,
               "idAccount": 238589851,
               "idTransferAccount": 124124,
               "transactionType": "WIRE_TRANSFER",
            }, "juan@names.com");
         });

         await waitFor(() => {
            expect(amountInput).toBeInvalid();
            expect(amountInput).toHaveAccessibleDescription("Not enough balance");
         });
      });

      it("Should accept the given values", async () => {
         const { page, user, spyTransaction, typeInput, amountInput, transferInput, makeButton} = getElements();

         await user.click(typeInput);
         await user.click(page.getByText("Wire transfer"));
         await user.type(amountInput, "2000");
         await user.type(transferInput, "2132");

         await user.click(makeButton);

         await waitFor(() => {
            expect(spyTransaction).toHaveBeenCalledTimes(1);
            expect(spyTransaction).toHaveBeenLastCalledWith({
               "amount": 2000,
               "idAccount": 238589851,
               "idTransferAccount": 2132,
               "transactionType": "WIRE_TRANSFER",
            }, "juan@names.com");
         });

         await waitFor(() => {
            expect(amountInput).not.toHaveAccessibleErrorMessage("Not enough balance");
         });
      });
   });
});

const getElements = () => {
   const page = customRender(<Transaction />);
   const user = userEvent.setup();
   const spyTransaction = vi.spyOn(transaction, "saveTransaction");

   const header = page.getByRole("heading");
   const typeInput = page.getByLabelText("Transaction Type");
   const amountInput = page.getByLabelText("Amount");
   const transferInput = page.getByLabelText("Account to transfer");
   const makeButton = page.getByRole("button", { name: "Make transaction" });
   const cancelButton = page.getByRole("button", { name: "Cancel" });

   return {
      page,
      user,
      spyTransaction,
      header, 
      typeInput,
      amountInput,
      transferInput,
      makeButton,
      cancelButton
   };
};