import { StatusError } from "../../errors/StatusError";
import { getTransactions, getTransactionsByFilter, saveTransaction } from "../../pages/_services/transactions";

const transaction = {
   content: [{
      "idTransaction": 1,
      "idTransferAccount": "XXXXXX0",
      "receiverName": "Random1",
      "transactionAmount": 120.00,
      "transactionType": "DEPOSIT",
      "transactionTimestamp": "2023-06-26T21:02:13.374219",
      "isAutomated": false
   }, {
      "idTransaction": 2,
      "idTransferAccount": "XXXXXX432",
      "receiverName": "Random1",
      "transactionAmount": 120.00,
      "transactionType": "WIRE_TRANSFER",
      "transactionTimestamp": "2023-06-26T21:02:13.374219",
      "isAutomated": false
   }, {
      "idTransaction": 3,
      "idTransferAccount": "XXXXXX568",
      "receiverName": "Random3",
      "transactionAmount": 120.00,
      "transactionType": "WIRE_TRANSFER",
      "transactionTimestamp": "2023-06-26T21:02:13.374219",
      "isAutomated": false
   }],
   last: true
};

const transactionByName = {
   content: [{
      "idTransaction": 1,
      "idTransferAccount": "XXXXXX654",
      "receiverName": "New",
      "transactionAmount": 120.00,
      "transactionType": "WIRE_TRANSFER",
      "transactionTimestamp": "2023-06-26T21:02:13.374219",
      "isAutomated": false
   }, {
      "idTransaction": 2,
      "idTransferAccount": "XXXXXX654",
      "receiverName": "New",
      "transactionAmount": 120.00,
      "transactionType": "WIRE_TRANSFER",
      "transactionTimestamp": "2023-06-26T21:02:13.374219",
      "isAutomated": false
   }],
   last: true
};

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
         const content = await getTransactions(238589851, 0);
         expect(content).toStrictEqual(transaction);
      });
   });

   describe("getTransactionFilter by name test", () => {
      it("Should be a function", () => {
         expect(typeof getTransactionsByFilter).toBe("function");
      });

      it("Should throw an StatusError if there is no element", async () => {
         await expect(getTransactionsByFilter({
            id: 1, 
            name: "error", 
            page: 3,
            date: {}
         })).rejects.toThrow(StatusError);
         await expect(getTransactionsByFilter({
            id: 1, 
            name: "error", 
            page: 3,
            date: {}
         })).rejects.toThrow("No transactions found");
      });

      it("Should give the right content", async () => {
         const content = await getTransactionsByFilter({
            id: 238589851, 
            name: "new", 
            page: 0
         });
         expect(content).toStrictEqual(transactionByName);
      });
   });

   describe("getTransactionFilter by date test", () => {
      it("Should be a function", () => {
         expect(typeof getTransactionsByFilter).toBe("function");
      });

      it("Should throw an StatusError if there is no element", async () => {
         await expect(getTransactionsByFilter({
            id: 21, 
            date: { year: 2020 }, 
            page: 0
         })).rejects.toThrowError(StatusError);
         await expect(getTransactionsByFilter({
            id: 21, 
            date: { year: 2020 }, 
            page: 0
         })).rejects.toThrowError("No transactions found");
      });

      it("Should give the right content by year", async () => {
         const content = await getTransactionsByFilter({
            id: 238589851, 
            date: { year: 2023 },
            page: 0
         });
         expect(content).toStrictEqual(transactionByName);
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
         
         expect(content).toStrictEqual("Transaction made successfully");
      });
   });
});