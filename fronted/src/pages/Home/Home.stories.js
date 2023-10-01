import { withRouter } from "storybook-addon-react-router-v6";
import { Home } from "./Home";
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
      viewport: {
         defaultViewport: "iphone5"
      }
   }
};

export const Default = {
   play: async ({ canvasElement }) => { 
      const canvas = within(canvasElement);

      await waitFor(async () => {
         await expect(canvas.getAllByRole("article")).toHaveLength(2);
      });
   },
   parameters: {
      msw: [
         rest.get("http://localhost:8090/automations/account", (req, res, ctx) => {
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
         rest.get("http://localhost:8090/automations/account", (req, res, ctx) => {
            return res(ctx.delay(1000), ctx.status(404));
         }),
      ],
   },
};