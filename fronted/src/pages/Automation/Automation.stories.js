import { withRouter } from "storybook-addon-react-router-v6";
import { Automation } from "./Automation";

export default {
   title: "Pages/Automation",
   component: Automation,
   tags: ["autodocs"],
   decorators: [withRouter],
   parameters: {
      layout: "fullscreen",
      viewport: {
         defaultViewport: "iphone5"
      }
   }
};

const Template = ({ label, ...args }) => { 
   return Automation({ label, ...args });
};

export const Default  = Template.bind({});
Default.args = {};