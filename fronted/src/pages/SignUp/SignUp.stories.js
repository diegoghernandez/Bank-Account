import { withRouter } from "storybook-addon-react-router-v6";
import { SignUp } from ".";
import { userEvent, waitFor, within } from "@storybook/testing-library";
import { expect } from "@storybook/jest";
import { getTraduction } from "../../utils/getTraduction";
import { Traduction } from "../../constants/Traduction";
import { rest } from "msw";

export default {
   title: "Pages/SignUp",
   component: SignUp,
   tags: ["autodocs"],
   decorators: [withRouter],
   parameters: {
      layout: "fullscreen",
      backgrounds: {
         default: "dark-blue",
         values: [
            { name: "blue", value: "rgb(247 248 255)"},
            { name: "dark-blue", value: "rgb(18 18 24)"}
         ]
      }
   }
};

const API = "http://localhost:8090/auth/register";

export const Default = {};

export const Load = {
   play: async ({ canvasElement, step }) => { 
      const canvas = within(canvasElement);
      const t = getTraduction(Traduction.SIGN_UP_PAGE);
      
      const nameInput = canvas.getByLabelText(t.labels[0]);
      const emailInput = canvas.getByLabelText(t.labels[1]);
      const passwordInput = canvas.getByLabelText(t.labels[2]);
      const confirmationInput = canvas.getByLabelText(t.labels[3]);
      const acceptButton = canvas.getByRole("button", { name: t.accept });

      await step("Enter and submit necessary data", async () => {
         await userEvent.type(nameInput, "loading");
         await userEvent.type(emailInput, "loading@email.com");
         await userEvent.type(passwordInput, "Loading.....");
         await userEvent.type(confirmationInput, "Loading.....");
         
         await userEvent.click(acceptButton);
      });

      await step("Initialize load state", async () => {
         await waitFor(async () => {
            await expect(nameInput).toBeDisabled();
            await expect(emailInput).toBeDisabled();
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
      const t = getTraduction(Traduction.SIGN_UP_PAGE);
      
      const nameInput = canvas.getByLabelText(t.labels[0]);
      const emailInput = canvas.getByLabelText(t.labels[1]);
      const passwordInput = canvas.getByLabelText(t.labels[2]);
      const confirmationInput = canvas.getByLabelText(t.labels[3]);
      const acceptButton = canvas.getByRole("button", { name: t.accept });

      await step("Enter and submit necessary data", async () => {
         await userEvent.type(nameInput, "simple");
         await userEvent.type(emailInput, "wrong@email.com");
         await userEvent.type(passwordInput, "W0rng PAsswrOd");
         await userEvent.type(confirmationInput, "W0rng PAsswrOd");
         
         await userEvent.click(acceptButton);
      });

      await step("Initialize load state", async () => {
         await waitFor(async () => {
            await expect(nameInput).toBeDisabled();
            await expect(emailInput).toBeDisabled();
            await expect(passwordInput).toBeDisabled();
            await expect(confirmationInput).toBeDisabled();
            await expect(acceptButton).toBeDisabled();
   
            await expect(canvas.getByRole("progressbar")).toBeInTheDocument();
         });
      });

      await step("Initialize fail state", () => {
         setTimeout(async () => {
            await waitFor(async () => {
               await expect(nameInput).toBeInvalid();
               await expect(emailInput).toBeInvalid();
               await expect(passwordInput).toBeInvalid();
               await expect(confirmationInput).toBeInvalid();
            });
         }, 900);
      });
   },
   parameters: {
      msw: [
         rest.post(API, (req, res, ctx) => {
            return res(ctx.status(400), ctx.json({
               name: "Simple, wrong name,",
               email: "Wrong email",
               password: "Bad password",
               confirmation: "Bad confirmation"
            }));
         }),
      ],
   },
};

export const Success = {
   play: async ({ canvasElement, step }) => { 
      const canvas = within(canvasElement);
      const t = getTraduction(Traduction.SIGN_UP_PAGE);
      
      const nameInput = canvas.getByLabelText(t.labels[0]);
      const emailInput = canvas.getByLabelText(t.labels[1]);
      const passwordInput = canvas.getByLabelText(t.labels[2]);
      const confirmationInput = canvas.getByLabelText(t.labels[3]);
      const acceptButton = canvas.getByRole("button", { name: t.accept });

      await step("Enter and submit necessary data", async () => {
         await userEvent.type(nameInput, "Good");
         await userEvent.type(emailInput, "success@email.com");
         await userEvent.type(passwordInput, "1234");
         await userEvent.type(confirmationInput, "1234");
         
         await userEvent.click(acceptButton);
      });

      await step("Initialize load state", async () => {
         await waitFor(async () => {
            await expect(nameInput).toBeDisabled();
            await expect(emailInput).toBeDisabled();
            await expect(passwordInput).toBeDisabled();
            await expect(confirmationInput).toBeDisabled();
            await expect(acceptButton).toBeDisabled();
   
            await expect(canvas.getByRole("progressbar")).toBeInTheDocument();
         });
      });

      await step("See successful response", async () => {
         setTimeout(async () => {
            await expect(await canvas.findByText("Account created successfully")).toBeInTheDocument();
         }, 1500);
      });
   },
   parameters: {
      msw: [
         rest.post(API, (req, res, ctx) => {
            return res(ctx.status(201), ctx.text("Account created successfully"));
         }),
      ],
   },
};