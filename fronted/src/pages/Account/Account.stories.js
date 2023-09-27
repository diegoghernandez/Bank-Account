import { withRouter } from "storybook-addon-react-router-v6";
import { Account } from "./Account";

export default {
   title: "Pages/Account",
   component: Account,
   tags: ["autodocs"],
   decorators: [withRouter],
   parameters: {
      layout: "fullscreen",
      viewport: {
         defaultViewport: "iphone5"
      }
   }
};

export const Default = {};