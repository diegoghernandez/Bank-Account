import { Automation } from "./Automation";

export default {
   title: "Pages/Automation",
   component: Automation,
   tags: ["autodocs"],
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