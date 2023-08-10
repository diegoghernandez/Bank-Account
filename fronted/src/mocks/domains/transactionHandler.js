import { rest } from "msw";
import transactions from "../fixtures/transactions.json";

const API = "http://localhost:8090/transactions";

export const transactionHandler = [
   rest.get(`${API}/account`, (req, res, ctx) => {
      const idAccount = req.url.searchParams.get("id");

      if (idAccount == 1) {
         return res(ctx.json({
            "content": [
               {
                  "idTransaction": 1,
                  "idTransferAccount": 0,
                  "receiverName": "Random1",
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
         }));
      } 

      return res(ctx.status(404));
   }),

   rest.get(`${API}/name`, (req, res, ctx) => {
      const name = req.url.searchParams.get("name");

      if (name === "new") {
         return res(ctx.json({
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
         }));
      } 

      return res(ctx.status(404));
   }),

   rest.get(`${API}/year`, (req, res, ctx) => {
      const idAccount = req.url.searchParams.get("id");

      if (idAccount == 1) {
         return res(ctx.json(transactions));
      }

      return res(ctx.status(404));
   }),

   rest.post(`${API}/save`, (req, res, ctx) => {
      return res(ctx.status(200), ctx.json({
         "idTransaction": 1,
         "idTransferAccount": 432,
         "receiverName": "juan",
         "transactionAmount": 1400.00,
         "transactionType": "ONLINE_PAYMENT",
         "transactionTimestamp": "2023-07-15T19:13:13.295080043",
         "isAutomated": false
      }));
   })
]
