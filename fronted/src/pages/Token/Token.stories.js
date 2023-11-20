import { reactRouterParameters, withRouter } from "storybook-addon-react-router-v6";
import { Token } from ".";
import { rest } from "msw";
import { expect } from "@storybook/jest";
import { userEvent, within } from "@storybook/testing-library";
import { Traduction } from "../../constants/Traduction";
import { getTraduction } from "../../utils/getTraduction";

export default {
   title: "Pages/Token",
   render: Token,
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

const API = "http://localhost:8090/auth";

export const RegisterSuccess = {
   play: async ({ canvasElement }) => {
      const canvas = within(canvasElement);
      const t = getTraduction(Traduction.TOKEN_REGISTER);

      await expect(canvas.getByRole("heading", { name: t.title })).toBeInTheDocument();
      await expect(await canvas.findByText(t.description.valid)).toBeInTheDocument();
   }, 
   parameters: {
      reactRouter: reactRouterParameters({
         location: {
            searchParams: {
               traduction: "TOKEN_REGISTER",
               token: "er143ge8-9b58-41ae-8723-29d7ff675a30"
            }
         }
      }),
      msw: [
         rest.get(API + "/verify-registration", (req, res, ctx) => {
            return res(ctx.status(200), ctx.text("valid"));
         }),
      ],
   },
};

export const RegisterExpire = {
   play: async ({ canvasElement }) => {
      const canvas = within(canvasElement);
      const t = getTraduction(Traduction.TOKEN_REGISTER);

      await expect(canvas.getByRole("heading", { name: t.title })).toBeInTheDocument();
      await expect(await canvas.findByText(t.description.expired)).toBeInTheDocument();
      await expect(await canvas.findByRole("button", { name: t.button.expired })).toBeInTheDocument();

      setTimeout(async() => {
         await userEvent.click(await canvas.findByRole("button", { name: t.button.expired }));

         await expect(canvas.getByRole("heading", { name: t.modal.title })).toBeInTheDocument();
         await expect(await canvas.findByText(t.modal.message)).toBeInTheDocument();
      }, 2000);
   }, 
   parameters: {
      reactRouter: reactRouterParameters({
         location: {
            searchParams: {
               traduction: "TOKEN_REGISTER",
               token: "er143ge8-9b58-41ae-8723-29d7ff675a30"
            }
         }
      }),
      msw: [
         rest.get(API + "/verify-registration", (req, res, ctx) => {
            return res(ctx.status(400), ctx.text("expired"));
         }),
      ],
   },
};

export const EmailSuccess = {
   play: async ({ canvasElement }) => {
      const canvas = within(canvasElement);
      const t = getTraduction(Traduction.TOKEN_EMAIL);

      await expect(canvas.getByRole("heading", { name: t.title })).toBeInTheDocument();
      await expect(await canvas.findByText(t.description.valid)).toBeInTheDocument();
   }, 
   parameters: {
      reactRouter: reactRouterParameters({
         location: {
            searchParams: {
               traduction: "TOKEN_EMAIL",
               token: "er143ge8-9b58-41ae-8723-29d7ff675a30"
            }
         }
      }),
      msw: [
         rest.get(API + "/verify-email", (req, res, ctx) => {
            return res(ctx.status(200), ctx.text("valid"));
         }),
      ],
   },
};

export const EmailExpire = {
   play: async ({ canvasElement }) => {
      const canvas = within(canvasElement);
      const t = getTraduction(Traduction.TOKEN_EMAIL);

      await expect(canvas.getByRole("heading", { name: t.title })).toBeInTheDocument();
      await expect(await canvas.findByText(t.description.expired)).toBeInTheDocument();
      await expect(await canvas.findByRole("button", { name: t.button.expired })).toBeInTheDocument();

      setTimeout(async() => {
         await userEvent.click(await canvas.findByRole("button", { name: t.button.expired }));

         await expect(canvas.getByRole("heading", { name: t.modal.title })).toBeInTheDocument();
         await expect(await canvas.findByText(t.modal.message)).toBeInTheDocument();
      }, 2000);
   }, 
   parameters: {
      reactRouter: reactRouterParameters({
         location: {
            searchParams: {
               traduction: "TOKEN_EMAIL",
               token: "er143ge8-9b58-41ae-8723-29d7ff675a30"
            }
         }
      }),
      msw: [
         rest.get(API + "/verify-email", (req, res, ctx) => {
            return res(ctx.status(400), ctx.text("expired"));
         }),
      ],
   },
};