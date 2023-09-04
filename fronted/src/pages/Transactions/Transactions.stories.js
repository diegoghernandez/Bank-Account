import { withRouter } from "storybook-addon-react-router-v6";
import { Transactions } from "./Transactions";

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

const Template = ({ label, ...args }) => { 
   return Transactions({ label, ...args });
};

export const Default  = Template.bind({});
Default.args = {};