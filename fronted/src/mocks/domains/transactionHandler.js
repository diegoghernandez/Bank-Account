import { rest } from "msw";
import transactions from "../fixtures/transactions.json";

const API = "http://localhost:8090/transactions";

const paginationStructure = (content) => {
   return {
      "content": content,
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
   };
};

export const transactionHandler = [
   rest.get(`${API}/account`, (req, res, ctx) => {
      const idAccount = req.url.searchParams.get("id");
      
      if (idAccount == 238589851) {
         return res(ctx.json(transactions));
      } else {
         return res(ctx.status(404));
      }
   }),

   rest.post(`${API}/filter`, async (req, res, ctx) => {
      const type = req.url.searchParams.get("type");
      const name = req.url.searchParams.get("name");
      const body = await req.json();

      if (type == "WIRE_TRANSFER") {
         return res(ctx.json(paginationStructure([{
            "idTransaction": 2,
            "idTransferAccount": 432,
            "receiverName": "Random1",
            "transactionAmount": 120.00,
            "transactionType": "WIRE_TRANSFER",
            "transactionTimestamp": "2023-06-26T21:02:13.374219",
            "isAutomated": false
         }, {
            "idTransaction": 3,
            "idTransferAccount": 78568,
            "receiverName": "Random3",
            "transactionAmount": 120.00,
            "transactionType": "WIRE_TRANSFER",
            "transactionTimestamp": "2023-06-26T21:02:13.374219",
            "isAutomated": false
         }])));
      } else if (name == "new") {
         return res(ctx.json(paginationStructure([{
            "idTransaction": 1,
            "idTransferAccount": 654,
            "receiverName": "New",
            "transactionAmount": 120.00,
            "transactionType": "WIRE_TRANSFER",
            "transactionTimestamp": "2023-06-26T21:02:13.374219",
            "isAutomated": false
         }, {
            "idTransaction": 2,
            "idTransferAccount": 654,
            "receiverName": "New",
            "transactionAmount": 120.00,
            "transactionType": "WIRE_TRANSFER",
            "transactionTimestamp": "2023-06-26T21:02:13.374219",
            "isAutomated": false
         }])));
      } else if (body.year == "2023") {
         return res(ctx.json(paginationStructure([
               {
                  "idTransaction": 1,
                  "idTransferAccount": 654,
                  "receiverName": "New",
                  "transactionAmount": 120.00,
                  "transactionType": "WIRE_TRANSFER",
                  "transactionTimestamp": "2023-06-26T21:02:13.374219",
                  "isAutomated": false
               }, {
                  "idTransaction": 2,
                  "idTransferAccount": 654,
                  "receiverName": "New",
                  "transactionAmount": 120.00,
                  "transactionType": "WIRE_TRANSFER",
                  "transactionTimestamp": "2023-06-26T21:02:13.374219",
                  "isAutomated": false
               }
            ])));
      } else {
         return res(ctx.status(404));
      }

   }),

   rest.post(`${API}/save`, async (req, res, ctx) => {
      const { idTransferAccount } = await req.json();

      if (idTransferAccount == 124124) {
         return res(ctx.status(404), ctx.json({
            amount: "Not enough balance"
         }));
      }

      return res(ctx.status(200), ctx.text("Transaction made successfully"));
   })
];
