import { rest } from "msw";
import automations from "../fixtures/automations.json";

const API = "http://localhost:8090/automations";

export const automationHandler = [
   rest.get(`${API}/account`, (req, res, ctx) => {
      const idAccount = req.url.searchParams.get("id");

      if (idAccount == 238589851) {
         return res(ctx.json(automations));
      }

      return res(ctx.status(404));
   }),

   rest.put(`${API}/update`, async (req, res, ctx) => {
      const { idAutomation } = await req.json();
      
      if (idAutomation == 4234) {
         return res(ctx.status(400), ctx.json({
            name: "Incorrect name",
            amount: "Not enough balance",
            desc: "Account not found",
            hoursToNextExecution: "So much hours"
         }));
      } else {
         return res(ctx.status(200), ctx.text("Automation updated successfully"));
      }
   }),

   rest.post(`${API}/save`, async (req, res, ctx) => {
      const { idTransferAccount } = await req.json();

      if (idTransferAccount == 124124) {
         return res(ctx.status(404), ctx.json({
            desc: "Account not found"
         }));
      } else {
         return res(ctx.status(200), ctx.text("Automation created successfully"));
      }
   })
];