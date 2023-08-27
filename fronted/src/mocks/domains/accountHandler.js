import { rest } from "msw";

export const accountHandler = [
   rest.get("http://localhost:8090/accounts/email/:email", (req, res, ctx) => {
      return res(ctx.json({
         "idAccount": 1,
         "accountName": "user",
         "email": "user@names.com",
         "currentBalance": 22677.00
      }));
   })
]