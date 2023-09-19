import { describe, expect, it, vi } from "vitest";
import { Automation } from "../../pages/Automation/Automation";
import { customRender } from "../../utils/renderTest";
import userEvent from "@testing-library/user-event";
import { waitFor } from "@testing-library/dom";
import * as automation from "../../pages/_services/automation";

describe("Automation page tests", () => {
   it("Should render Automation page correctly", () => {  
      const { 
         header,
         nameInput,
         amountInput,
         transferInput,
         supportiveTransfer,
         timeInput,
         makeButton,
         cancelButton 
      } = getElements();

      expect(header).toBeInTheDocument();
      expect(nameInput).toBeInTheDocument();
      expect(amountInput).toBeInTheDocument();
      expect(transferInput).toBeInTheDocument();
      expect(supportiveTransfer).toBeInTheDocument();
      expect(timeInput).toBeInTheDocument();
      expect(makeButton).toBeInTheDocument();
      expect(cancelButton).toBeInTheDocument();
   });

   describe("After clicking", () => {
      it("If some value is not passed, should show the following error individually", async () => {
         const { user, makeButton, nameInput, amountInput, transferInput, timeInput, } = getElements();

         await user.type(nameInput, "Name");
         await user.type(transferInput, "124124");

         await user.click(makeButton);

         await waitFor(() => {
            expect(nameInput).not.toHaveAccessibleErrorMessage("Must not be empty");
            expect(amountInput).toHaveAccessibleErrorMessage("Must not be empty");
            expect(transferInput).not.toHaveAccessibleErrorMessage("Must not be empty");
            expect(timeInput).toHaveAccessibleErrorMessage("Must not be empty");
         });
      });

      it("Should show an error if there is a problem with a value", async () => {
         const { page, user, spyAutomation, makeButton, nameInput, amountInput, transferInput, timeInput, } = getElements();

         await user.type(nameInput, "Name");
         await user.type(amountInput, "124124");
         await user.type(transferInput, "124124");
         await user.click(timeInput);
         await user.click(page.getByRole("button", { name: "Accept", hidden: true }));

         await user.click(makeButton);

         await waitFor(() => {
            expect(spyAutomation).toHaveBeenCalledTimes(1);
            expect(spyAutomation).toHaveBeenLastCalledWith({
               "amount": 124124,
               "hoursToNextExecution": 1,
               "idAccount": 238589851,
               "idTransferAccount": 124124,
               "name": "Name"
            });
         });

         await waitFor(() => {
            expect(transferInput).toHaveAccessibleErrorMessage("Account not found 124124");
         });
      });

      it("Should accept the given values", async () => {
         const { page, user, spyAutomation, makeButton, nameInput, amountInput, transferInput, timeInput, } = getElements();

         await user.type(nameInput, "New automation");
         await user.type(amountInput, "2000");
         await user.type(transferInput, "2132");
         await user.click(timeInput);
         await user.click(page.getByRole("button", { name: "Accept", hidden: true }));

         await user.click(makeButton);

         await waitFor(() => {
            expect(spyAutomation).toHaveBeenCalledTimes(1);
            expect(spyAutomation).toHaveBeenLastCalledWith({
               "amount": 2000,
               "hoursToNextExecution": 1,
               "idAccount": 238589851,
               "idTransferAccount": 2132,
               "name": "New automation"
            });
         });

         await waitFor(() => {
            expect(transferInput).not.toHaveAccessibleErrorMessage("Account not found 124124");
         });
      });
   });
});

const getElements = () => {
   const page = customRender(<Automation />);
   const user = userEvent.setup();
   const spyAutomation = vi.spyOn(automation, "saveAutomation");

   const header = page.getByRole("heading");
   const nameInput = page.getByLabelText("Name");
   const amountInput = page.getByLabelText("Amount");
   const transferInput = page.getByLabelText("Account to transfer");
   const supportiveTransfer = page.getByText("Add the nine account numbers");
   const timeInput = page.getByLabelText("Period of time");
   const makeButton = page.getByRole("button", { name: "Make automation" });
   const cancelButton = page.getByRole("button", { name: "Cancel" });

   return {
      page,
      user,
      spyAutomation,
      header, 
      nameInput,
      amountInput,
      transferInput,
      supportiveTransfer,
      timeInput,
      makeButton,
      cancelButton
   };
};