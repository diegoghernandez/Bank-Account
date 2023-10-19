import { rest } from "msw";

const API = import.meta.env.VITE_API_URL +  "/auth";

export const authHandler = [
   rest.post(`${API}/login`, async (req, res, ctx) => {
      const body = await req.json();

      if (body.email === "user@user.com") {
         return res(ctx.status(200), ctx.text("Token"));
      }

      return res(ctx.status(400));
   }),

   rest.post(`${API}/register`, async (req, res, ctx) => {
      const body = await req.json();

      if (body.email === "user@user.com") {
         return res(ctx.status(200), ctx.text("Account created successfully"));
      }

      return res(ctx.status(400), ctx.json({
         name: "Simple, wrong name,",
         email: "Wrong email",
         password: "Bad password",
         confirmation: "Bad confirmation"
      }));
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
];