import { Account } from "./Account";

export default {
   title: "Pages/Account",
   component: Account,
   tags: ["autodocs"],
   parameters: {
      layout: "fullscreen",
      viewport: {
         defaultViewport: "iphone5"
      }
   }
};

const Template = ({ label, ...args }) => { 
   return Account({ label, ...args });
};

export const Default  = Template.bind({});
Default.args = {};