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

   rest.get(`${API}/resend-token`, async (req, res, ctx) => 
      res(ctx.status(200), ctx.text("Verification Link Sent"))),

   rest.get(`${API}/verify-registration`, async (req, res, ctx) => {
      const token = req.url.searchParams.get("token");

      if (token == "nu3v3-9b58-41ae-8723-29d7ff675a30") {
         return res(ctx.status(200), ctx.text("valid"));
      }

      return res(ctx.status(400), ctx.text("expired"));
   }),

   rest.put(`${API}/save-password`, async (req, res, ctx) => {
      const token = req.url.searchParams.get("token");

      if (token == "er143ge8-9b58-41ae-8723-29d7ff675a30") {
         return res(ctx.status(200), ctx.text("valid"));
      } else if (token == "nu3v3-9b58-41ae-8723-29d7ff675a30") {
         return res(ctx.status(400), ctx.text("expired"));
      } else {
         return res(ctx.status(400), ctx.text("invalid"));
      }
   }),

   rest.get(`${API}/verify-email`, async (req, res, ctx) => {
      const token = req.url.searchParams.get("token");

      if (token == "nu3v3-9b58-41ae-8723-29d7ff675a30") {
         return res(ctx.status(200), ctx.text("valid"));
      }

      return res(ctx.status(400), ctx.text("expired"));
   }),

   rest.put(`${API}/secure/change-name`, async (req, res, ctx) => {
      const body = await req.json();

      if (body.newPassword === "1234") {
         return res(ctx.status(200), ctx.json({ result: "Change name successfully"}));
      }

      return res(ctx.status(400), ctx.json({ newPassword: "Invalid password"}));
   }),

   rest.put(`${API}/secure/change-password`, async (req, res, ctx) => {
      const body = await req.json();

      if (body.oldPassword === "oldPass") {
         return res(ctx.status(200), ctx.json({ result: "Change password successfully"}));
      }

      return res(ctx.status(400), ctx.json({ oldPassword: "Invalid old password"}));
   }),

   rest.put(`${API}/secure/change-email`, async (req, res, ctx) => {
      const body = await req.json();

      if (body.email === "test@names.com") {
         return res(ctx.status(200), ctx.json({ result: "Change email successfully"}));
      }

      return res(ctx.status(400), ctx.json({ newPassword: "Invalid password"}));
   })
];