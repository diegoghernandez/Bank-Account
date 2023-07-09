import { rest } from "msw";

export const accountHandler = [
   rest.get("http://localhost:8090/api/accounts/email/:email", (req, res, ctx) => {
      const { email } = req.params;

      if (email === "user@names.com") {
         return res(ctx.json({
            "idAccount": 1,
            "accountName": "user",
            "email": "user@names.com",
            "currentBalance": 22677.00
         }));
      }

      return res(ctx.status(404));
   })
]