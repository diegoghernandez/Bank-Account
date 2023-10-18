import { rest } from "msw";

export const accountHandler = [
   rest.get(import.meta.env.VITE_API_URL + "/accounts/email/:email", (req, res, ctx) => {
      const { email } = req.params;

      if (email == "user@names.com") {
         return res(ctx.json({
            "idAccount": 1,
            "accountName": "user",
            "email": "user@names.com",
            "currentBalance": 22677.00
         }));
      } else {
         return res(ctx.json({
            "idAccount": 238589851,
            "accountName": "juan",
            "email": "juan@names.com",
            "currentBalance": 22677.00
         }));
      }
   })
];