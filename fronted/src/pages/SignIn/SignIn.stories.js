import { SignIn } from "./SignIn";

export default {
   title: "Pages/SignIn",
   component: SignIn,
   tags: ["autodocs"],
   parameters: {
      layout: "fullscreen",
      viewport: {
         defaultViewport: "iphone5"
      }
   }
};

const Template = ({ label, ...args }) => { 
   return SignIn({ label, ...args });
};

export const Default  = Template.bind({});
Default.args = {};