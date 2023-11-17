import { withRouter } from "storybook-addon-react-router-v6";
import { Home } from ".";
import { rest } from "msw";
import automations from "../../mocks/fixtures/automations.json";
import { Traduction } from "../../constants/Traduction";
import { waitFor, within } from "@storybook/testing-library";
import { getTraduction } from "../../utils/getTraduction";
import { expect } from "@storybook/jest";

export default {
   title: "Pages/Home",
   component: Home,
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
      },
      viewport: {
         defaultViewport: "iphone5"
      }
   }
};

const API = "http://localhost:8090/automations/account";

export const Default = {
   play: async ({ canvasElement }) => { 
      const canvas = within(canvasElement);

      await waitFor(() => {
         setTimeout(async () => {
            await expect(await canvas.findAllByRole("article")).toHaveLength(2);
         }, 1000);
      });
   },
   parameters: {
      msw: [
         rest.get(API, (req, res, ctx) => {
            return res(ctx.delay(1000), ctx.json(automations));
         }),
      ],
   },
};

export const NotFound = {
   play: async ({ canvasElement }) => { 
      const canvas = within(canvasElement);
      const t = getTraduction(Traduction.HOME_PAGE);
      
      await waitFor(() => {
         setTimeout(async () => {
            await expect(await canvas.findByText(t.notFound)).toBeInTheDocument();
         }, 900);
      });
   },
   parameters: {
      msw: [
         rest.get(API, (req, res, ctx) => {
            return res(ctx.delay(1000), ctx.status(404));
         }),
      ],
   },
};