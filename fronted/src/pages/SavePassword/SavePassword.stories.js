import { withRouter } from "storybook-addon-react-router-v6";
import { SavePassword } from ".";
import { userEvent, waitFor, within } from "@storybook/testing-library";
import { expect } from "@storybook/jest";
import { rest } from "msw";
import { getTraduction } from "../../utils/getTraduction";
import { Traduction } from "../../constants/Traduction";

export default {
   title: "Pages/Save Password",
   component: SavePassword,
   decorators: [withRouter],
   parameters: {
      layout: "fullscreen",
      backgrounds: {
         default: "dark-blue",
         values: [
            { name: "blue", value: "rgb(247 248 255)"},
            { name: "dark-blue", value: "rgb(18 18 24)"}
         ]
      },
   }
};

const API = "http://localhost:8090/auth/save-password";

export const Default = {};

export const Load = {
   play: async ({ canvasElement, step }) => { 
      const canvas = within(canvasElement);
      const t = getTraduction(Traduction.SAVE_PASSWORD);
      
      const passwordInput = canvas.getByLabelText(t.labels[0]);
      const confirmationInput = canvas.getByLabelText(t.labels[1]);

      const acceptButton = canvas.getByRole("button", { name: t.accept });

      await step("Enter and submit necessary data", async () => {
         await userEvent.type(passwordInput, "Load");
         await userEvent.type(confirmationInput, "Load");
         
         await userEvent.click(canvas.getByRole("button", { name: t.accept }));
      });

      await step("Initialize load state", async () => {
         await waitFor(async () => {
            await expect(passwordInput).toBeDisabled();
            await expect(confirmationInput).toBeDisabled();
            await expect(acceptButton).toBeDisabled();
   
            await expect(canvas.getByRole("progressbar")).toBeInTheDocument();
         });
      });
   },
   parameters: {
      msw: [
         rest.post(API, (req, res, ctx) => {
            return res(ctx.delay("infinite"));
         }),
      ],
   },
};

export const Error = {
   play: async ({ canvasElement, step }) => { 
      const canvas = within(canvasElement);
      const t = getTraduction(Traduction.SAVE_PASSWORD);
      
      const passwordInput = canvas.getByLabelText(t.labels[0]);
      const confirmationInput = canvas.getByLabelText(t.labels[1]);

      await step("Enter and submit necessary data", async () => {
         await userEvent.type(passwordInput, "Load");
         await userEvent.type(confirmationInput, "Wrong");
         
         await userEvent.click(canvas.getByRole("button", { name: t.accept }));
      });

      await step("Initialize fail state", () => {
         setTimeout(async () => {
            await waitFor(async () => {
               await expect(passwordInput).toBeInvalid();
               await expect(confirmationInput).toBeInvalid();
            });
         }, 900);
      });
   }
};

export const MessageInvalid = {
   play: async ({ canvasElement, step }) => { 
      const canvas = within(canvasElement);
      const t = getTraduction(Traduction.SAVE_PASSWORD);
      
      const passwordInput = canvas.getByLabelText(t.labels[0]);
      const confirmationInput = canvas.getByLabelText(t.labels[1]);

      const acceptButton = canvas.getByRole("button", { name: t.accept });

      await step("Enter and submit necessary data", async () => {
         await userEvent.type(passwordInput, "Message");
         await userEvent.type(confirmationInput, "Message");
         
         await userEvent.click(canvas.getByRole("button", { name: t.accept }));
      });

      await step("Initialize load state", async () => {
         await waitFor(async () => {
            await expect(passwordInput).toBeDisabled();
            await expect(confirmationInput).toBeDisabled();
            await expect(acceptButton).toBeDisabled();
   
            await expect(canvas.getByRole("progressbar")).toBeInTheDocument();
         });
      });

      await step("See message", async () => {
         setTimeout(async () => {
            await expect(await canvas.findByRole("heading", { level: 2 })).toBeInTheDocument();
            await expect(await canvas.findByText(t.modal.description.invalid)).toBeInTheDocument();
         }, 1500);
      });
   },
   parameters: {
      msw: [
         rest.post(API, (req, res, ctx) => {
            return res(ctx.status(200), ctx.text("invalid"));
         }),
      ],
   },
};

export const MessageExpired = {
   play: async ({ canvasElement, step }) => { 
      const canvas = within(canvasElement);
      const t = getTraduction(Traduction.SAVE_PASSWORD);
      const tModal = getTraduction(Traduction.MODAL);
      
      const passwordInput = canvas.getByLabelText(t.labels[0]);
      const confirmationInput = canvas.getByLabelText(t.labels[1]);

      const acceptButton = canvas.getByRole("button", { name: t.accept });

      await step("Enter and submit necessary data", async () => {
         await userEvent.type(passwordInput, "Message");
         await userEvent.type(confirmationInput, "Message");
         
         await userEvent.click(canvas.getByRole("button", { name: t.accept }));
      });

      await step("Initialize load state", async () => {
         await waitFor(async () => {
            await expect(passwordInput).toBeDisabled();
            await expect(confirmationInput).toBeDisabled();
            await expect(acceptButton).toBeDisabled();
   
            await expect(canvas.getByRole("progressbar")).toBeInTheDocument();
         });
      });

      await step("See message", async () => {
         setTimeout(async () => {
            await expect(await canvas.findByRole("heading", { level: 2 })).toBeInTheDocument();
            await expect(await canvas.findByText(t.modal.description.expired)).toBeInTheDocument();
            await expect(await canvas.findByRole("button", { name: tModal.accept })).toBeInTheDocument();
         }, 1500);
      });
   },
   parameters: {
      msw: [
         rest.post(API, (req, res, ctx) => {
            return res(ctx.status(400), ctx.text("expired"));
         }),
      ],
   },
};

export const MessageValid = {
   play: async ({ canvasElement, step }) => { 
      const canvas = within(canvasElement);
      const t = getTraduction(Traduction.SAVE_PASSWORD);
      const tModal = getTraduction(Traduction.MODAL);
      
      const passwordInput = canvas.getByLabelText(t.labels[0]);
      const confirmationInput = canvas.getByLabelText(t.labels[1]);

      const acceptButton = canvas.getByRole("button", { name: t.accept });

      await step("Enter and submit necessary data", async () => {
         await userEvent.type(passwordInput, "Message");
         await userEvent.type(confirmationInput, "Message");
         
         await userEvent.click(canvas.getByRole("button", { name: t.accept }));
      });

      await step("Initialize load state", async () => {
         await waitFor(async () => {
            await expect(passwordInput).toBeDisabled();
            await expect(confirmationInput).toBeDisabled();
            await expect(acceptButton).toBeDisabled();
   
            await expect(canvas.getByRole("progressbar")).toBeInTheDocument();
         });
      });

      await step("See message", async () => {
         setTimeout(async () => {
            await expect(await canvas.findByRole("heading", { level: 2 })).toBeInTheDocument();
            await expect(await canvas.findByText(t.modal.description.valid)).toBeInTheDocument();
            await expect(await canvas.findByRole("button", { name: tModal.accept })).toBeInTheDocument();
         }, 1500);
      });
   },
   parameters: {
      msw: [
         rest.post(API, (req, res, ctx) => {
            return res(ctx.status(200), ctx.text("valid"));
         }),
      ],
   },
};