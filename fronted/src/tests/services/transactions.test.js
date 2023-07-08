import { StatusError } from "../../errors/StatusError";
import { getTransactions, getTransactionsByYear } from "../../pages/services/transactions";
import transactions from "../../mocks/fixtures/transactions.json"

const transaction = [{
   "idTransaction": 1,
   "idTransferAccount": 0,
   "receiverName": "Random1",
   "transactionAmount": 120.00,
   "transactionType": "DEPOSIT",
   "transactionTimestamp": "2023-06-26T21:02:13.374219",
   "isAutomated": false
}];

describe("Transactions tests", () => {
   
   describe("getTransaction test", () => {

      it("Should be a function", () => {
         expect(typeof getTransactions).toBe("function");
      });

      it("Should throw an StatusError if there is no element", async () => {
         const exception = await getTransactions(21, 3);

         expect(exception).toBeInstanceOf(StatusError);
         expect(exception.message).toStrictEqual("No transactions found");
         expect(exception.status).toStrictEqual(404);
      });

      it("Should give the right content", async () => {
         const content = await getTransactions(1, 0);
         expect(content).toStrictEqual(transaction);
      });
   });

   describe("getTransactionByYear test", () => {

      it("Should be a function", () => {
         expect(typeof getTransactionsByYear).toBe("function");
      });

      it("Should throw an StatusError if there is no element", async () => {
         const exception = await getTransactionsByYear(21, 2000);

         expect(exception).toBeInstanceOf(StatusError);
         expect(exception.message).toStrictEqual("No transactions found by 2000");
         expect(exception.status).toStrictEqual(404);
      });

      it("Should give the right content by year", async () => {
         const content = await getTransactionsByYear(1, 2023);
         expect(content).toStrictEqual(transactions);
      });
   });
});