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

   describe("After select the type", () => {
      it("Should show all transactions with the respective type", async () =>  {
         const page = customRender(<Transactions />);
         const user = userEvent.setup();
         const typeInput = page.getByLabelText("Transaction Type");
   
         await waitForElementToBeRemoved(() => 
            page.getAllByRole("progressbar")
         );
   
         await user.click(typeInput);
         await user.click(page.getByText("Wire transfer"));

         const spyTransaction = vi.spyOn(transactions, "getTransactions");
         const spyTransactionByFilter = vi.spyOn(transactions, "getTransactionsByFilter");
   
         await waitFor(() => {
            expect(spyTransaction).toHaveBeenCalledTimes(0);
            expect(spyTransactionByFilter).toHaveBeenCalledTimes(1);
            expect(spyTransactionByFilter).toHaveBeenLastCalledWith({
               id: 238589851,
               type: "WIRE_TRANSFER",
               name: "",
               date: {},
               page: 0,
            });
         });
   
         await waitFor(() => {
            expect(page.getAllByRole("article")).length(2);
         });
      });

      it("Should show no transactions found", async () =>  {
         const page = customRender(<Transactions />);
         const user = userEvent.setup();
         const typeInput = page.getByLabelText("Transaction Type");
   
         await waitForElementToBeRemoved(() => 
            page.getAllByRole("progressbar")
         );
   
         await user.click(typeInput);
         await user.click(page.getByRole("menuitem", { name: "Deposit" }));

         const spyTransaction = vi.spyOn(transactions, "getTransactions");
         const spyTransactionByFilter = vi.spyOn(transactions, "getTransactionsByFilter");
   
         await waitFor(() => {
            expect(spyTransaction).toHaveBeenCalledTimes(0);
            expect(spyTransactionByFilter).toHaveBeenCalledTimes(1);
            expect(spyTransactionByFilter).toHaveBeenLastCalledWith({
               id: 238589851,
               type: "DEPOSIT",
               name: "",
               date: {},
               page: 0,
            });
         });
   
         await waitFor(() => {
            expect(page.getByText("No transactions found")).toBeInTheDocument();
         });
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
         const spyTransactionByFilter = vi.spyOn(transactions, "getTransactionsByFilter");
   
         await waitFor(() => {
            expect(spyTransaction).toHaveBeenCalledTimes(0);
            expect(spyTransactionByFilter).toHaveBeenCalledTimes(1);
            expect(spyTransactionByFilter).toHaveBeenLastCalledWith({
               id: 238589851,
               type: "",
               name: "new",
               date: {},
               page: 0,
            });
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
         const spyTransactionByFilter = vi.spyOn(transactions, "getTransactionsByFilter");
   
         await waitFor(() => {
            expect(spyTransaction).toHaveBeenCalledTimes(0);
            expect(spyTransactionByFilter).toHaveBeenCalledTimes(1);
            expect(spyTransactionByFilter).toHaveBeenLastCalledWith({
               id: 238589851, 
               type: "",
               name: "test name", 
               date: {},
               page: 0
            });
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
         await user.click(page.getByLabelText("Year"));
         await user.click(page.getByRole("menuitem", { name: "2023", hidden: true }));
         await user.click(page.getByRole("button", { name: "Accept", hidden: true }));
   
         const spyTransaction = vi.spyOn(transactions, "getTransactions");
         const spyTransactionByFilter = vi.spyOn(transactions, "getTransactionsByFilter");
   
         await waitFor(() => {
            expect(spyTransaction).toHaveBeenCalledTimes(0);
            expect(spyTransactionByFilter).toHaveBeenCalledTimes(1);
            expect(spyTransactionByFilter).toHaveBeenLastCalledWith({
               id: 238589851, 
               type: "",
               name: "",
               date: {
                  year: 2023, 
                  month: null,
                  day: null
               }, 
               page: 0
            });
         });
   
         await waitFor(() => {
            expect(page.getAllByText(new Intl.DateTimeFormat("en", { dateStyle: "full", timeStyle: "medium" })
               .format(new Date("2023-06-26T21:02:13.374219")))).length(2);
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
         await user.click(page.getByLabelText("Year"));
         await user.click(page.getByRole("menuitem", { name: "2022", hidden: true}));
         await user.click(page.getByRole("button", { name: "Accept", hidden: true }));
   
         const spyTransaction = vi.spyOn(transactions, "getTransactions");
         const spyTransactionByFilter = vi.spyOn(transactions, "getTransactionsByFilter");
   
         await waitFor(() => {
            expect(spyTransaction).toHaveBeenCalledTimes(0);
            expect(spyTransactionByFilter).toHaveBeenCalledTimes(1);
            expect(spyTransactionByFilter).toHaveBeenLastCalledWith({
               id: 238589851, 
               type: "",
               name: "",
               date: {
                  year: 2022, 
                  month: null,
                  day: null
               }, 
               page: 0,
            });
         });
   
         await waitFor(() => {
            expect(page.getByText("No transactions found")).toBeInTheDocument();
         });
      });
   });

});
