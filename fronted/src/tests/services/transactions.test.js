import { StatusError } from "../../errors/StatusError";
import { getTransactions, getTransactionsByName, getTransactionsByYear, saveTransaction } from "../../pages/_services/transactions";
import transactions from "../../mocks/fixtures/transactions.json"

const transaction = {
   "content": [
      {
         "idTransaction": 1,
         "idTransferAccount": 0,
         "isAutomated": false,
         "receiverName": "Random1",
         "transactionAmount": 120,
         "transactionTimestamp": "2023-06-26T21:02:13.374219",
         "transactionType": "DEPOSIT",
      },
   ],
   "empty": false,
   "first": true,
   "last": true,
   "number": 0,
   "numberOfElements": 1,
   "pageable": {
      "offset": 0,
      "pageNumber": 0,
      "pageSize": 10,
      "paged": true,
      "sort": {
         "empty": true,
         "sorted": false,
         "unsorted": true,
      },
      "unpaged": false,
   },
   "size": 10,
   "sort": {
      "empty": true,
      "sorted": false,
      "unsorted": true,
   },
   "totalElements": 1,
   "totalPages": 1,
};

const transactionByName = {
   "content": [
      {
         "idTransaction": 1,
         "idTransferAccount": 0,
         "receiverName": "New",
         "transactionAmount": 120.00,
         "transactionType": "DEPOSIT",
         "transactionTimestamp": "2023-06-26T21:02:13.374219",
         "isAutomated": false
      }, {
         "idTransaction": 2,
         "idTransferAccount": 0,
         "receiverName": "New",
         "transactionAmount": 120.00,
         "transactionType": "DEPOSIT",
         "transactionTimestamp": "2023-06-26T21:02:13.374219",
         "isAutomated": false
      }
   ],
   "pageable": {
      "sort": {
         "empty": true,
         "unsorted": true,
         "sorted": false
      },
      "offset": 0,
      "pageNumber": 0,
      "pageSize": 10,
      "paged": true,
      "unpaged": false
   },
   "totalPages": 1,
   "totalElements": 1,
   "last": true,
   "size": 10,
   "number": 0,
   "sort": {
      "empty": true,
      "unsorted": true,
      "sorted": false
   },
   "numberOfElements": 1,
   "first": true,
   "empty": false
}

describe("Transactions tests", () => {
   
   describe("getTransaction test", () => {

      it("Should be a function", () => {
         expect(typeof getTransactions).toBe("function");
      });

      it("Should throw an StatusError if there is no element", async () => {
         await expect(getTransactions(21, 3))
            .rejects.toThrow(StatusError);
         await expect(getTransactions(21, 3))
            .rejects.toThrow("No transactions found");
      });

      it("Should give the right content", async () => {
         const content = await getTransactions(1, 0);
         expect(content).toStrictEqual(transaction);
      });
   });

   describe("getTransactionByName test", () => {

      it("Should be a function", () => {
         expect(typeof getTransactionsByName).toBe("function");
      });

      it("Should throw an StatusError if there is no element", async () => {
         await expect(getTransactionsByName(1, "error", 3))
            .rejects.toThrow(StatusError);
         await expect(getTransactionsByName(1, "error", 3))
            .rejects.toThrow("No transactions found");
      });

      it("Should give the right content", async () => {
         const content = await getTransactionsByName(1, "new", 0);
         expect(content).toStrictEqual(transactionByName);
      });
   });

   describe("getTransactionByYear test", () => {

      it("Should be a function", () => {
         expect(typeof getTransactionsByYear).toBe("function");
      });

      it("Should throw an StatusError if there is no element", async () => {
         await expect(getTransactionsByYear(21, 2000))
            .rejects.toThrowError(StatusError);
         await expect(getTransactionsByYear(21, 2000))
            .rejects.toThrowError("No transactions found by 2000");
      });

      it("Should give the right content by year", async () => {
         const content = await getTransactionsByYear(1, 2023);
         expect(content).toStrictEqual(transactions);
      });
   });

   describe("saveTransaction test", () => {
      it("Should be a function", () => {
         expect(typeof saveTransaction).toBe("function");
      });

      it("Should save the right content", async () => {
         const content = await saveTransaction({
            "idAccount" : 1,
            "idTransferAccount": 432,
            "amount": 1400.00,
            "transactionType": "ONLINE_PAYMENT"
         });
         
         expect(content).toStrictEqual({
            "idTransaction": 1,
            "idTransferAccount": 432,
            "receiverName": "juan",
            "transactionAmount": 1400.00,
            "transactionType": "ONLINE_PAYMENT",
            "transactionTimestamp": "2023-07-15T19:13:13.295080043",
            "isAutomated": false
         });
      });
   });
});