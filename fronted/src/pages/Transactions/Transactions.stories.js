import { Transactions } from "./Transactions";

export default {
   title: "Pages/Transactions",
   component: Transactions,
   tags: ["autodocs"],
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