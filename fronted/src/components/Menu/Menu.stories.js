import { Menu } from "./Menu";

export default {
   title: "Menu",
   component: Menu,
   tags: ['autodocs']
};

const Template = ({ label, ...args }) => { 
   return Menu({ label, ...args });
};

export const Default  = Template.bind({});
Default.args = {};