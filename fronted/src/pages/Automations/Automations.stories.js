import { Automations } from "./Automations";

export default {
   title: "Pages/Automations",
   component: Automations,
   tags: ["autodocs"],
   parameters: {
      layout: "fullscreen",
      viewport: {
         defaultViewport: "iphone5"
      }
   }
};

const Template = ({ label, ...args }) => { 
   return Automations({ label, ...args });
};

export const Default  = Template.bind({});
Default.args = {};