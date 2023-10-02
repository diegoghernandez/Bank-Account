import { describe, it, vi } from "vitest";
import { customRender } from "../../utils/renderTest";
import { Transactions } from "../../pages/Transactions";
import * as transactions from "../../pages/_services/transactions";
import { waitFor, waitForElementToBeRemoved } from "@testing-library/dom";
import { userEvent } from "@storybook/testing-library";

describe("Transactions page tests", () => {
   it("Should render Transactions page correctly with all transactions", async () =>  {
      const page = customRender(<Transactions />);
      const spyTransaction = vi.spyOn(transactions, "getTransactions");
   
      page.getByLabelText("Transaction Type");
      page.getByLabelText("Name");
      page.getByLabelText("Date");
      page.getByRole("heading", { name: "Transactions", level: 2});
      page.getByRole("link", { name: "Transaction"});

      await waitForElementToBeRemoved(() => page.getAllByRole("progressbar"));
      
      await waitFor(() => {
         expect(spyTransaction).toHaveBeenCalledTimes(2);
         expect(spyTransaction).toHaveBeenLastCalledWith(238589851, 0);
      });

      await waitFor(() => {
         expect(page.getAllByText("Deposit")).length(1);
         expect(page.getAllByText(/Wire transfer$/i)).length(2);
      });
   });

   it("After select the type, should show all transactions with the respective type", async () =>  {
      const page = customRender(<Transactions />);
      const user = userEvent.setup();
      const typeInput = page.getByLabelText("Transaction Type");

      await waitForElementToBeRemoved(() => 
         page.getAllByRole("progressbar")
      );

      await user.click(typeInput);
      await user.click(page.getByText("Wire transfer"));

      await waitFor(() => {
         expect(page.queryByText("Deposit")).not.toBeInTheDocument();
         expect(page.getAllByText(/Wire transfer$/i)).length(2);
      });
   });

   describe("After search by name", () => {
      it("Should show all transactions with the respective name", async () =>  {
         const page = customRender(<Transactions />);
         const user = userEvent.setup();
         const nameInput = page.getByLabelText("Name");
   
         await waitForElementToBeRemoved(() => 
            page.getAllByRole("progressbar")
         );
   
         await user.type(nameInput, "new");
         await user.keyboard("{Enter}");
   
         const spyTransaction = vi.spyOn(transactions, "getTransactions");
         const spyTransactionByName = vi.spyOn(transactions, "getTransactionsByName");
         const spyTransactionByDateAndName = vi.spyOn(transactions, "getTransactionsByDateAndName");
   
         await waitFor(() => {
            expect(spyTransaction).toHaveBeenCalledTimes(1);
            expect(spyTransaction).toHaveBeenLastCalledWith(238589851, 0);
            expect(spyTransactionByName).toHaveBeenCalledTimes(1);
            expect(spyTransactionByName).toHaveBeenLastCalledWith(238589851, "new", 0);
            expect(spyTransactionByDateAndName).toHaveBeenCalledTimes(0);
         });
   
         await waitFor(() => {
            expect(page.getAllByText(/^new$/i)).length(2);
         });
      });
      
      it("Should show no transactions found", async () =>  {
         const page = customRender(<Transactions />);
         const user = userEvent.setup();
         const nameInput = page.getByLabelText("Name");
   
         await waitForElementToBeRemoved(() => 
            page.getAllByRole("progressbar")
         );
   
         await user.type(nameInput, "test name");
         await user.keyboard("{Enter}");
   
         const spyTransaction = vi.spyOn(transactions, "getTransactions");
         const spyTransactionByName = vi.spyOn(transactions, "getTransactionsByName");
         const spyTransactionByDateAndName = vi.spyOn(transactions, "getTransactionsByDateAndName");
   
         await waitFor(() => {
            expect(spyTransaction).toHaveBeenCalledTimes(1);
            expect(spyTransaction).toHaveBeenLastCalledWith(238589851, 0);
            expect(spyTransactionByName).toHaveBeenCalledTimes(1);
            expect(spyTransactionByName).toHaveBeenLastCalledWith(238589851, "test name", 0);
            expect(spyTransactionByDateAndName).toHaveBeenCalledTimes(0);
         });
   
         await waitFor(() => {
            expect(page.getByText("No transactions found")).toBeInTheDocument();
         });
      });
   });


   describe("After search by date", () => {
      it("Should show all transactions with the respective date", async () =>  {
         const page = customRender(<Transactions />);
         const user = userEvent.setup();
         const dateInput = page.getByLabelText("Date");
   
         await waitForElementToBeRemoved(() => 
            page.getAllByRole("progressbar")
         );
   
         await user.click(dateInput);
         await user.click(page.getByRole("button", { name: "Accept", hidden: true }));
   
         const spyTransaction = vi.spyOn(transactions, "getTransactions");
         const spyTransactionByName = vi.spyOn(transactions, "getTransactionsByName");
         const spyTransactionByDateAndName = vi.spyOn(transactions, "getTransactionsByDateAndName");
   
         await waitFor(() => {
            expect(spyTransaction).toHaveBeenCalledTimes(1);
            expect(spyTransaction).toHaveBeenLastCalledWith(238589851, 0);
            expect(spyTransactionByName).toHaveBeenCalledTimes(0);
            expect(spyTransactionByDateAndName).toHaveBeenCalledTimes(1);
            expect(spyTransactionByDateAndName).toHaveBeenLastCalledWith(238589851, "2023", "", "", 0);
         });
   
         await waitFor(() => {
            expect(page.getAllByText(/^2023-06/i)).length(2);
         });
      });
      
      it("Should show no transactions found", async () =>  {
         const page = customRender(<Transactions />);
         const user = userEvent.setup();
         const dateInput = page.getByLabelText("Date");
   
         await waitForElementToBeRemoved(() => 
            page.getAllByRole("progressbar")
         );
   
         await user.click(dateInput);
         await user.selectOptions(page.getByRole("combobox", { name: "year", hidden: true}), "2022");
         await user.click(page.getByRole("button", { name: "Accept", hidden: true }));
   
         const spyTransaction = vi.spyOn(transactions, "getTransactions");
         const spyTransactionByName = vi.spyOn(transactions, "getTransactionsByName");
         const spyTransactionByDateAndName = vi.spyOn(transactions, "getTransactionsByDateAndName");
   
         await waitFor(() => {
            expect(spyTransaction).toHaveBeenCalledTimes(1);
            expect(spyTransaction).toHaveBeenLastCalledWith(238589851, 0);
            expect(spyTransactionByName).toHaveBeenCalledTimes(0);
            expect(spyTransactionByDateAndName).toHaveBeenCalledTimes(1);
            expect(spyTransactionByDateAndName).toHaveBeenLastCalledWith(238589851, "2022", "", "", 0);
         });
   
         await waitFor(() => {
            expect(page.getByText("No transactions found")).toBeInTheDocument();
         });
      });
   });

});
