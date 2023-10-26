import { withRouter } from "storybook-addon-react-router-v6";
import { Transactions } from ".";
import { rest } from "msw";
import transactions from "../../mocks/fixtures/transactions.json";
import { waitFor, within } from "@storybook/testing-library";
import { Traduction } from "../../constants/Traduction";
import { getTraduction } from "../../utils/getTraduction";
import { expect } from "@storybook/jest";

export default {
   title: "Pages/Transactions",
   component: Transactions,
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

const API = import.meta.env.VITE_API_URL + "/transactions/account";

export const Default = {
   play: async ({ canvasElement }) => { 
      const canvas = within(canvasElement);

      await waitFor(() => {
         setTimeout(async () => {
            await expect(await canvas.findAllByRole("article")).toHaveLength(3);
         }, 1000);
      });
   },
   parameters: {
      msw: [
         rest.get(API, (req, res, ctx) => {
            return res(ctx.delay(1000), ctx.json(transactions));
         }),
      ],
   },
};

export const NotFound = {
   play: async ({ canvasElement }) => { 
      const canvas = within(canvasElement);
      const t = getTraduction(Traduction.TRANSACTIONS_PAGE);
      
      await waitFor(async () => {
         await expect(canvas.getByText(t.notFound)).toBeInTheDocument();
      });

   },
   parameters: {
      msw: [
         rest.get(API, (req, res, ctx) => {
            return res(ctx.status(404));
         }),
      ],
   },
};