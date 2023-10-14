import { reactRouterParameters, withRouter } from "storybook-addon-react-router-v6";
import { UpdateAutomation } from ".";
import { userEvent, waitFor, within } from "@storybook/testing-library";
import { expect } from "@storybook/jest";
import { rest } from "msw";
import { getTraduction } from "../../utils/getTraduction";
import { Traduction } from "../../constants/Traduction";

export default {
   title: "Pages/UpdateAutomation",
   component: UpdateAutomation,
   decorators: [withRouter],
   tags: ["autodocs"],
   parameters: {
      layout: "fullscreen",
      backgrounds: {
         default: "dark-blue",
         values: [
            { name: "blue", value: "rgb(247 248 255)"},
            { name: "dark-blue", value: "rgb(18 18 24)"}
         ]
      },
      reactRouter: reactRouterParameters({
         location: {
            state: {
               automation: {
                  idAutomation: 5425,
                  name: "New automation",
                  amount: 2000.00,
                  idTransferAccount: 419670285,
                  hoursToNextExecution: 6,
                  executionTime: "2023-07-15T17:51:36.986827",
                  status: true
               }
            },
         },
      }),
   },
   args: {
      
   }
};

export const Default = {};

export const Load = {
   play: async ({ canvasElement, step }) => { 
      const canvas = within(canvasElement);
      const t = getTraduction(Traduction.UPDATE_AUTOMATION_PAGE);
      const tModal = getTraduction(Traduction.MODAL);
      
      const nameInput = canvas.getByLabelText(t.labels[0]);
      const amountInput = canvas.getByLabelText(t.labels[1]);
      const transferInput = canvas.getByLabelText(t.labels[2]);
      const timeInput = canvas.getByLabelText(t.labels[3]);
      const statusSwitch = canvas.getByLabelText(t.labels[4]);

      const acceptButton = canvas.getByRole("button", { name: t.accept });

      await step("Modify and submit necessary data", async () => {
         await userEvent.clear(nameInput);
         await userEvent.type(nameInput, "Load");
         await userEvent.clear(amountInput);
         await userEvent.type(amountInput, "2321313312.32");
   
         await userEvent.click(timeInput);
         await userEvent.type(canvas.getByLabelText(t.modalParameters[0]), "22");
         await userEvent.click(canvas.getByRole("button", { name: tModal.accept }));

         await userEvent.click(statusSwitch);
         
         await userEvent.click(canvas.getByRole("button", { name: t.accept }));
      });

      await step("Initialize load state", async () => {
         await waitFor(async () => {
            await expect(nameInput).toBeDisabled();
            await expect(amountInput).toBeDisabled();
            await expect(transferInput).toBeDisabled();
            await expect(timeInput).toBeDisabled();
            await expect(statusSwitch).toBeDisabled();
            await expect(acceptButton).toBeDisabled();
   
            await expect(canvas.getByRole("progressbar")).toBeInTheDocument();
         });
      });
   },
   parameters: {
      msw: [
         rest.post("http://localhost:8090/automations/update", (req, res, ctx) => {
            return res(ctx.delay("infinite"));
         }),
      ],
   },
};

export const Error = {
   play: async ({ canvasElement, step }) => { 
      const canvas = within(canvasElement);
      const t = getTraduction(Traduction.UPDATE_AUTOMATION_PAGE);
      const tModal = getTraduction(Traduction.MODAL);
      
      const nameInput = canvas.getByLabelText(t.labels[0]);
      const amountInput = canvas.getByLabelText(t.labels[1]);
      const transferInput = canvas.getByLabelText(t.labels[2]);
      const timeInput = canvas.getByLabelText(t.labels[3]);
      const statusSwitch = canvas.getByLabelText(t.labels[4]);

      const acceptButton = canvas.getByRole("button", { name: t.accept });

      await step("Modify and submit necessary data", async () => {
         await userEvent.clear(nameInput);
         await userEvent.type(nameInput, "Mal");
         await userEvent.clear(amountInput);
         await userEvent.type(amountInput, "2321313312.32");
   
         await userEvent.click(timeInput);
         await userEvent.type(canvas.getByLabelText(t.modalParameters[0]), "22");
         await userEvent.click(canvas.getByRole("button", { name: tModal.accept }));

         await userEvent.click(statusSwitch);
         
         await userEvent.click(canvas.getByRole("button", { name: t.accept }));
      });

      await step("Initialize load state", async () => {
         await waitFor(async () => {
            await expect(nameInput).toBeDisabled();
            await expect(amountInput).toBeDisabled();
            await expect(transferInput).toBeDisabled();
            await expect(timeInput).toBeDisabled();
            await expect(statusSwitch).toBeDisabled();
            await expect(acceptButton).toBeDisabled();
   
            await expect(canvas.getByRole("progressbar")).toBeInTheDocument();
         });
      });

      await step("Initialize fail state", () => {
         setTimeout(async () => {
            await waitFor(async () => {
               await expect(nameInput).toBeInvalid();
               await expect(amountInput).toBeInvalid();
               await expect(transferInput).toBeInvalid();
               await expect(timeInput).toBeInvalid();
            });
         }, 900);
      });
   },
   parameters: {
      msw: [
         rest.put("http://localhost:8090/automations/update", (req, res, ctx) => {
            return res(ctx.status(400), ctx.json({
               name: "Incorrect name",
               amount: "Not enough balance",
               desc: "Account not found",
               hoursToNextExecution: "So much hours"
            }));
         }),
      ],
   },
};

export const Successful = {
   play: async ({ canvasElement, step }) => { 
      const canvas = within(canvasElement);
      const t = getTraduction(Traduction.UPDATE_AUTOMATION_PAGE);
      const tModal = getTraduction(Traduction.MODAL);
      
      const nameInput = canvas.getByLabelText(t.labels[0]);
      const amountInput = canvas.getByLabelText(t.labels[1]);
      const transferInput = canvas.getByLabelText(t.labels[2]);
      const timeInput = canvas.getByLabelText(t.labels[3]);
      const statusSwitch = canvas.getByLabelText(t.labels[4]);

      const acceptButton = canvas.getByRole("button", { name: t.accept });

      await step("Modify and submit necessary data", async () => {
         await userEvent.clear(nameInput);
         await userEvent.type(nameInput, "Success");
         await userEvent.clear(amountInput);
         await userEvent.type(amountInput, "2321313312.32");
   
         await userEvent.click(timeInput);
         await userEvent.type(canvas.getByLabelText(t.modalParameters[0]), "22");
         await userEvent.click(canvas.getByRole("button", { name: tModal.accept }));

         await userEvent.click(statusSwitch);
         
         await userEvent.click(canvas.getByRole("button", { name: t.accept }));
      });

      await step("Initialize load state", async () => {
         await waitFor(async () => {
            await expect(nameInput).toBeDisabled();
            await expect(amountInput).toBeDisabled();
            await expect(transferInput).toBeDisabled();
            await expect(timeInput).toBeDisabled();
            await expect(statusSwitch).toBeDisabled();
            await expect(acceptButton).toBeDisabled();
   
            await expect(canvas.getByRole("progressbar")).toBeInTheDocument();
         });
      });

      await step("See successful response", () => {
         setTimeout(async () => {
            await expect(await canvas.findByText("Automation updated successfully")).toBeInTheDocument();
         }, 1000);
      });
   },
   parameters: {
      msw: [
         rest.put("http://localhost:8090/automations/update", (req, res, ctx) => {
            return res(ctx.status(200), ctx.text("Automation updated successfully"));
         }),
      ],
   },
};
