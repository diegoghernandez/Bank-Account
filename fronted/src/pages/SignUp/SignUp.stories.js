import { SignUp } from "./SignUp";

export default {
   title: "Pages/SignUp",
   component: SignUp,
   tags: ["autodocs"],
   parameters: {
      layout: "fullscreen",
      viewport: {
         defaultViewport: "iphone5"
      }
   }
};

const Template = ({ label, ...args }) => { 
   return SignUp({ label, ...args });
};

export const Default  = Template.bind({});
Default.args = {};