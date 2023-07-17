import { rest } from "msw";

const API = "http://localhost:8090/api/auth";

export const authHandler = [
   rest.post(`${API}/login`, async (req, res, ctx) => {
      const body = await req.json();

      if (body.email === "user@user.com") {
         return res(ctx.status(200), ctx.text("Token"));
      }

      return res(ctx.status(403));
   })
]