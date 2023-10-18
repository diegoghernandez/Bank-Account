import { Account } from "..";
import { withRouter } from "storybook-addon-react-router-v6";
import { expect } from "@storybook/jest";
import { rest } from "msw";
import { userEvent, waitFor, within } from "@storybook/testing-library";
import { getTraduction } from "../../../utils/getTraduction";
import { Traduction } from "../../../constants/Traduction";

export default {
   title: "Pages/Account/Change Email",
   component: Account,
   tags: ["autodocs"],
   decorators: [withRouter],
   parameters: {
      layout: "fullscreen",
   }
};

const API = import.meta.env.VITE_API_URL + "/auth/secure/change-email";

export const Default = {
   play: async ({ canvasElement }) => {
      const canvas = within(canvasElement);
      const t = getTraduction(Traduction.ACCOUNT_PAGE);
      const tModal = getTraduction(Traduction.MODAL);

      await userEvent.click(canvas.getByRole("button", { name: t.change.email.label }));

      await expect(canvas.getByLabelText(t.change.email.inputs[0])).toBeInTheDocument();
      await expect(canvas.getAllByLabelText(t.change.email.inputs[1])[1]).toBeInTheDocument();
      await expect(canvas.getByRole("button", { name: tModal.cancel })).toBeInTheDocument();   
      await expect(canvas.getByRole("button", { name: tModal.accept })).toBeInTheDocument();   
   }
};

export const Load = {
   play: async ({ canvasElement, step }) => { 
      const canvas = within(canvasElement);
      const t = getTraduction(Traduction.ACCOUNT_PAGE);
      const tModal = getTraduction(Traduction.MODAL);

      await userEvent.click(canvas.getByRole("button", { name: t.change.email.label }));
      
      const emailInput = canvas.getByLabelText(t.change.email.inputs[0]);
      const passwordInput = canvas.getAllByLabelText(t.change.email.inputs[1])[1];
      const acceptButton = canvas.getByRole("button", { name: tModal.accept });

      await step("Enter and submit necessary data", async () => {
         await userEvent.type(emailInput, "wrong@email.com");
         await userEvent.type(passwordInput, "W0rng PAsswrOd");
         
         await userEvent.click(acceptButton);
      });

      await step("Initialize load state", async () => {
         await waitFor(async () => {
            await expect(emailInput).toBeDisabled();
            await expect(passwordInput).toBeDisabled();
            await expect(canvas.getByRole("button", { name: tModal.cancel })).toBeDisabled();
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
      const t = getTraduction(Traduction.ACCOUNT_PAGE);
      const tModal = getTraduction(Traduction.MODAL);

      await userEvent.click(canvas.getByRole("button", { name: t.change.email.label }));
      
      const emailInput = canvas.getByLabelText(t.change.email.inputs[0]);
      const passwordInput = canvas.getAllByLabelText(t.change.email.inputs[1])[1];
      const acceptButton = canvas.getByRole("button", { name: tModal.accept });

      await step("Enter and submit necessary data", async () => {
         await userEvent.type(emailInput, "wrong@email.com");
         await userEvent.type(passwordInput, "W0rng PAsswrOd");
         
         await userEvent.click(acceptButton);
      });

      await step("Initialize load state", async () => {
         await waitFor(async () => {
            await expect(emailInput).toBeDisabled();
            await expect(passwordInput).toBeDisabled();
            await expect(canvas.getByRole("button", { name: tModal.cancel })).toBeDisabled();
            await expect(acceptButton).toBeDisabled();
   
            await expect(canvas.getByRole("progressbar")).toBeInTheDocument();
         });
      });


      await step("Initialize fail state", () => {
         setTimeout(async () => {
            await expect(emailInput).toBeInvalid();
            await expect(passwordInput).toBeInvalid();
         }, 1000);
      });
   },
   parameters: {
      msw: [
         rest.post(API, (req, res, ctx) => {
            return res(ctx.status(400), ctx.json({ 
               email: "Wrong",
               newPassword: "Invalid password"
            }));
         }),
      ],
   },
};

export const Success = {
   play: async ({ canvasElement, step }) => { 
      const canvas = within(canvasElement);
      const t = getTraduction(Traduction.ACCOUNT_PAGE);
      const tModal = getTraduction(Traduction.MODAL);

      await userEvent.click(canvas.getByRole("button", { name: t.change.email.label }));
      
      const emailInput = canvas.getByLabelText(t.change.email.inputs[0]);
      const passwordInput = canvas.getAllByLabelText(t.change.email.inputs[1])[1];
      const acceptButton = canvas.getByRole("button", { name: tModal.accept });

      await step("Enter and submit necessary data", async () => {
         await userEvent.type(emailInput, "success@email.com");
         await userEvent.type(passwordInput, "password");
         
         await userEvent.click(acceptButton);
      });

      await step("Initialize load state", async () => {
         await waitFor(async () => {
            await expect(emailInput).toBeDisabled();
            await expect(passwordInput).toBeDisabled();
            await expect(canvas.getByRole("button", { name: tModal.cancel })).toBeDisabled();
            await expect(acceptButton).toBeDisabled();
   
            await expect(canvas.getByRole("progressbar")).toBeInTheDocument();
         });
      });

      await step("See successful response", async () => {
         setTimeout(async () => {
            await canvas.findAllByText("Change email successfully");
         }, 1000);
      });
   },
   parameters: {
      msw: [
         rest.post(API, (req, res, ctx) => {
            return res(ctx.status(200), ctx.json({ result: "Change email successfully"}));
         }),
      ],
   },
};