import { withRouter } from "storybook-addon-react-router-v6";
import { Automation } from ".";
import { userEvent, waitFor, within } from "@storybook/testing-library";
import { getTraduction } from "../../utils/getTraduction";
import { Traduction } from "../../constants/Traduction";
import { expect } from "@storybook/jest";
import { rest } from "msw";

export default {
   title: "Pages/Automation",
   component: Automation,
   tags: ["autodocs"],
   decorators: [withRouter],
   parameters: {
      layout: "fullscreen",
      backgrounds: {
         default: "blue",
         values: [
            { name: "blue", value: "rgb(247 248 255)"}
         ]
      },
      viewport: {
         defaultViewport: "iphone5"
      }
   }
};

export const Default = {};

export const Load = {
   play: async ({ canvasElement, step }) => { 
      const canvas = within(canvasElement);
      const t = getTraduction(Traduction.AUTOMATION_PAGE);
      const tModal = getTraduction(Traduction.MODAL);
      
      const nameInput = canvas.getByLabelText(t.labels[0]);
      const amountInput = canvas.getByLabelText(t.labels[1]);
      const transferInput = canvas.getByLabelText(t.labels[2]);
      const timeInput = canvas.getByLabelText(t.labels[3]);

      const acceptButton = canvas.getByRole("button", { name: t.accept });

      await step("Enter and submit necessary data", async () => {
         await userEvent.type(nameInput, "Mal");
         await userEvent.type(amountInput, "2321313312.32");
         await userEvent.type(transferInput, "4132423");
   
         await userEvent.click(timeInput);
         await userEvent.selectOptions(canvas.getByRole("combobox", { name: t.modalParameters[0] }), "22");
         await userEvent.click(canvas.getByRole("button", { name: tModal.accept }));
         
         await userEvent.click(canvas.getByRole("button", { name: t.accept }));
      });

      await step("Initialize load state", async () => {
         await waitFor(async () => {
            await expect(nameInput).toBeDisabled();
            await expect(amountInput).toBeDisabled();
            await expect(transferInput).toBeDisabled();
            await expect(timeInput).toBeDisabled();
            await expect(acceptButton).toBeDisabled();
   
            await expect(canvas.getByRole("progressbar")).toBeInTheDocument();
         });
      });
   },
   parameters: {
      msw: [
         rest.post("http://localhost:8090/automations/save", (req, res, ctx) => {
            return res(ctx.delay("infinite"));
         }),
      ],
   },
};

export const Error = {
   play: async ({ canvasElement, step }) => { 
      const canvas = within(canvasElement);
      const t = getTraduction(Traduction.AUTOMATION_PAGE);
      const tModal = getTraduction(Traduction.MODAL);
      
      const nameInput = canvas.getByLabelText(t.labels[0]);
      const amountInput = canvas.getByLabelText(t.labels[1]);
      const transferInput = canvas.getByLabelText(t.labels[2]);
      const timeInput = canvas.getByLabelText(t.labels[3]);

      await step("Enter and submit necessary data", async () => {
         await userEvent.type(nameInput, "Mal");
         await userEvent.type(amountInput, "2321313312.32");
         await userEvent.type(transferInput, "4132423");
   
         await userEvent.click(timeInput);
         await userEvent.selectOptions(canvas.getByRole("combobox", { name: t.modalParameters[0] }), "22");
         await userEvent.click(canvas.getByRole("button", { name: tModal.accept }));
         
         await userEvent.click(canvas.getByRole("button", { name: t.accept }));
      });

      
      await step("Initialize load state", async () => {
         await waitFor(async () => {
            await expect(nameInput).toBeDisabled();
            await expect(amountInput).toBeDisabled();
            await expect(transferInput).toBeDisabled();
            await expect(timeInput).toBeDisabled();

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
         rest.post("http://localhost:8090/automations/save", (req, res, ctx) => {
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
      const t = getTraduction(Traduction.AUTOMATION_PAGE);
      const tModal = getTraduction(Traduction.MODAL);
      
      const nameInput = canvas.getByLabelText(t.labels[0]);
      const amountInput = canvas.getByLabelText(t.labels[1]);
      const transferInput = canvas.getByLabelText(t.labels[2]);
      const timeInput = canvas.getByLabelText(t.labels[3]);

      const acceptButton = canvas.getByRole("button", { name: t.accept });

      await step("Enter and submit necessary data", async () => {
         await userEvent.type(nameInput, "Mal");
         await userEvent.type(amountInput, "2321313312.32");
         await userEvent.type(transferInput, "4132423");
   
         await userEvent.click(timeInput);
         await userEvent.selectOptions(canvas.getByRole("combobox", { name: t.modalParameters[0] }), "22");
         await userEvent.click(canvas.getByRole("button", { name: tModal.accept }));
         
         await userEvent.click(canvas.getByRole("button", { name: t.accept }));
      });

      await step("Initialize load state", async () => {
         await waitFor(async () => {
            await expect(nameInput).toBeDisabled();
            await expect(amountInput).toBeDisabled();
            await expect(transferInput).toBeDisabled();
            await expect(timeInput).toBeDisabled();
            await expect(acceptButton).toBeDisabled();
   
            await expect(canvas.getByRole("progressbar")).toBeInTheDocument();
         });
      });

      await step("See successful response", async () => {
         setTimeout(async () => {
            await expect(await canvas.findByText("Automation created successfully")).toBeInTheDocument();
         }, 1500);
      });
   },
   parameters: {
      msw: [
         rest.post("http://localhost:8090/automations/save", (req, res, ctx) => {
            return res(ctx.status(200), ctx.delay(1500), ctx.text("Automation created successfully"));
         }),
      ],
   },
};