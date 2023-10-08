import { withRouter } from "storybook-addon-react-router-v6";
import { Page } from "../../constants/Page";
import { Navbar } from ".";
import { Fab } from "../Buttons/FAB";

export default {
   title: "Navbar",
   component: Navbar,
   tags: ["autodocs"],
   decorators: [withRouter],
   argTypes: {
      page: {
         options: Object.keys(Page),
         mapping: Page,
         control: "radio"
      },
      children: {
         control: "boolean",
      }
   }
};

export const Default = {
   args: {
      page: Page.HOME,
      children: <Fab label="Transac-tions" />
   }
};