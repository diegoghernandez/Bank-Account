import { withRouter } from "storybook-addon-react-router-v6";
import { Page } from "../../constants/Page";
import { Navbar } from "./Navbar";

export default {
   title: "Navbar",
   component: Navbar,
   tags: ['autodocs'],
   decorators: [withRouter],
   argTypes: {
      page: {
         options: Object.keys(Page),
         mapping: Page,
         control: "radio"
      }
   }
};

export const Default = {
   args: {
      page: Page.Home
   }
};