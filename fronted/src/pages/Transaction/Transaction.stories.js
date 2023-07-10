import { Transaction } from "./Transaction";

export default {
   title: "Pages/Transaction",
   component: Transaction,
   tags: ["autodocs"],
   parameters: {
      layout: "fullscreen",
      viewport: {
         defaultViewport: "iphone5"
      }
   }
};

const Template = ({ label, ...args }) => { 
   return Transaction({ label, ...args });
};

export const Default  = Template.bind({});
Default.args = {};