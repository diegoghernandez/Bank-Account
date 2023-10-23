import { reactRouterParameters, withRouter } from "storybook-addon-react-router-v6";
import { Token } from ".";
import { rest } from "msw";
import { expect } from "@storybook/jest";
import { within } from "@storybook/testing-library";
import { Traduction } from "../../constants/Traduction";
import { getTraduction } from "../../utils/getTraduction";

export default {
   title: "Pages/Token",
   render: Token,
   tags: ["autodocs"],
   decorators: [withRouter],
   parameters: {
      layout: "fullscreen",
      reactRouter: reactRouterParameters({
         location: {
            searchParams: {
               traduction: "TOKEN_REGISTER",
               token: "er143ge8-9b58-41ae-8723-29d7ff675a30"
            }
         }
      }),
      backgrounds: {
         default: "dark-blue",
         values: [
            { name: "blue", value: "rgb(247 248 255)"},
            { name: "dark-blue", value: "rgb(18 18 24)"}
         ]
      }
   }
};

const API = import.meta.env.VITE_API_URL +  "/auth/verify-registration";

export const Success = {
   play: async ({ canvasElement }) => {
      const canvas = within(canvasElement);
      const t = getTraduction(Traduction.TOKEN_REGISTER);

      await expect(canvas.getByRole("heading", { name: t.title })).toBeInTheDocument();
      await expect(await canvas.findByText(t.description.valid)).toBeInTheDocument();
   }, 
   parameters: {
      msw: [
         rest.get(API, (req, res, ctx) => {
            return res(ctx.status(200), ctx.text("valid"));
         }),
      ],
   },
};

export const Expire = {
   play: async ({ canvasElement }) => {
      const canvas = within(canvasElement);
      const t = getTraduction(Traduction.TOKEN_REGISTER);

      await expect(canvas.getByRole("heading", { name: t.title })).toBeInTheDocument();
      await expect(await canvas.findByText(t.description.expire)).toBeInTheDocument();
   }, 
   parameters: {
      msw: [
         rest.get(API, (req, res, ctx) => {
            return res(ctx.status(400), ctx.text("expire"));
         }),
      ],
   },
};