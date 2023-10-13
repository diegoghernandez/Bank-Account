import { withRouter } from "storybook-addon-react-router-v6";
import { SignIn } from ".";
import { rest } from "msw";
import { userEvent, waitFor, within } from "@storybook/testing-library";
import { getTraduction } from "../../utils/getTraduction";
import { expect } from "@storybook/jest";
import { Traduction } from "../../constants/Traduction";

export default {
   title: "Pages/SignIn",
   component: SignIn,
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
      viewport: {
         defaultViewport: "iphone5"
      }
   }
};

export const Default = {};

export const Load = {
   play: async ({ canvasElement, step }) => { 
      const canvas = within(canvasElement);
      const t = getTraduction(Traduction.SIGN_IN_PAGE);
      
      const emailInput = canvas.getByLabelText(t.labels[0]);
      const passwordInput = canvas.getByLabelText(t.labels[1]);
      const acceptButton = canvas.getByRole("button", { name: t.accept });

      await step("Enter and submit necessary data", async () => {
         await userEvent.type(emailInput, "loading@email.com");
         await userEvent.type(passwordInput, "Loading.....");
         
         await userEvent.click(canvas.getByRole("button", { name: t.accept }));
      });


      await step("Initialize load state", async () => {
         await waitFor(async () => {
            await expect(emailInput).toBeDisabled();
            await expect(passwordInput).toBeDisabled();
            await expect(acceptButton).toBeDisabled();
   
            await expect(canvas.getByRole("progressbar")).toBeInTheDocument();
         });
      });

   },
   parameters: {
      msw: [
         rest.post("http://localhost:8090/auth/login", (req, res, ctx) => {
            return res(ctx.delay("infinite"));
         }),
      ],
   },
};

export const Error = {
   play: async ({ canvasElement, step }) => { 
      const canvas = within(canvasElement);
      const t = getTraduction(Traduction.SIGN_IN_PAGE);
      
      const emailInput = canvas.getByLabelText(t.labels[0]);
      const passwordInput = canvas.getByLabelText(t.labels[1]);
      const acceptButton = canvas.getByRole("button", { name: t.accept });

      await step("Enter and submit necessary data", async () => {
         await userEvent.type(emailInput, "wrong@email.com");
         await userEvent.type(passwordInput, "W0rng PAsswrOd");
         
         await userEvent.click(canvas.getByRole("button", { name: t.accept }));
      });

      await step("Initialize load state", async () => {
         await waitFor(async () => {
            await expect(emailInput).toBeDisabled();
            await expect(passwordInput).toBeDisabled();
            await expect(acceptButton).toBeDisabled();
   
            await expect(canvas.getByRole("progressbar")).toBeInTheDocument();
         });
      });


      await step("Initialize fail state", () => {
         setTimeout(async () => {
            await waitFor(async () => {
               await expect(emailInput).toBeInvalid();
               await expect(passwordInput).toBeInvalid();
            });
         }, 900);
      });

   },
   parameters: {
      msw: [
         rest.post("http://localhost:8090/auth/login", (req, res, ctx) => {
            return res(ctx.status(403),);
         }),
      ],
   },
};