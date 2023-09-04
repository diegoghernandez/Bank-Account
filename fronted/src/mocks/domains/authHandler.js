import { rest } from "msw";

const API = "http://localhost:8090/auth";

export const authHandler = [
   rest.post(`${API}/login`, async (req, res, ctx) => {
      const body = await req.json();

      if (body.email === "user@user.com") {
         return res(ctx.status(200), ctx.text("Token"));
      }

      return res(ctx.status(403));
   }),

   rest.post(`${API}/secure/change-name`, async (req, res, ctx) => {
      const body = await req.json();

      if (body.newPassword === "1234") {
         return res(ctx.status(200), ctx.json({ result: "Change name successfully"}));
      }

      return res(ctx.status(400), ctx.json({ newPassword: "Invalid password"}));
   }),

   rest.post(`${API}/secure/change-password`, async (req, res, ctx) => {
      const body = await req.json();

      if (body.oldPassword === "oldPass") {
         return res(ctx.status(200), ctx.json({ result: "Change password successfully"}));
      }

      return res(ctx.status(400), ctx.json({ oldPassword: "Invalid old password"}));
   }),

   rest.post(`${API}/secure/change-email`, async (req, res, ctx) => {
      const body = await req.json();

      if (body.email === "test@names.com") {
         return res(ctx.status(200), ctx.json({ result: "Change email successfully"}));
      }

      return res(ctx.status(400), ctx.json({ newPassword: "Invalid password"}));
   })
]