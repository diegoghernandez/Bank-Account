import { withRouter } from "storybook-addon-react-router-v6";
import { Automations } from ".";
import { rest } from "msw";
import automations from "../../mocks/fixtures/automations.json";
import { waitFor, within } from "@storybook/testing-library";
import { expect } from "@storybook/jest";
import { getTraduction } from "../../utils/getTraduction";
import { Traduction } from "../../constants/Traduction";

export default {
   title: "Pages/Automations",
   component: Automations,
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

      await waitFor(() => {
         setTimeout(async() => {
            await expect(await canvas.findAllByRole("article")).toHaveLength(3);
         }, 1000);
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
      const t = getTraduction(Traduction.AUTOMATIONS_PAGE);

      await waitFor(() => {
         expect(canvas.getByText(t.notFound)).toBeInTheDocument();
      });
   },
   parameters: {
      msw: [
         rest.get("http://localhost:8090/automations/account", (req, res, ctx) => {
            return res(ctx.status(404));
         }),
      ],
   },
};