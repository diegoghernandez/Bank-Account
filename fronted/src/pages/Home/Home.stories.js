import { Home } from "./Home";

export default {
   title: "Pages/Home",
   component: Home,
   tags: ["autodocs"],
   parameters: {
      layout: "fullscreen",
      viewport: {
         defaultViewport: "iphone5"
      }
   }
};

const Template = ({ label, ...args }) => { 
   return Home({ label, ...args });
};

export const Default  = Template.bind({});
Default.args = {};