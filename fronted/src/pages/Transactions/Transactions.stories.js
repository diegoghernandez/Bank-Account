import { withRouter } from "storybook-addon-react-router-v6";
import { Transactions } from "./Transactions";
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
      viewport: {
         defaultViewport: "iphone5"
      }
   }
};

export const Default = {
   play: async ({ canvasElement }) => { 
      const canvas = within(canvasElement);

      await waitFor(async () => {
         await expect(canvas.getAllByRole("article")).toHaveLength(3);
      });
   },
   parameters: {
      msw: [
         rest.get("http://localhost:8090/transactions/account", (req, res, ctx) => {
            return res(ctx.json(transactions));
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
         rest.get("http://localhost:8090/transactions/account", (req, res, ctx) => {
            return res(ctx.status(404));
         }),
      ],
   },
};