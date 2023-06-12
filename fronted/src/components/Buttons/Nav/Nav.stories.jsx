import { Page } from "../../../constants/Page";
import { Nav } from "./Nav";

export default {
   title: "Buttons/Nav",
   component: Nav,
   tags: ['autodocs'],
   argTypes: {
      page: {
         options: Object.keys(Page),
         mapping: Page,
         control: "radio"
      }
   }
};

const Template = ({ label, ...args }) => {
   return Nav({ label, ...args });
};

export const Default  = Template.bind({});
Default.args = {
   active: false,
};