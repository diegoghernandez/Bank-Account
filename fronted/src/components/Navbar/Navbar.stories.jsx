import { Navbar } from "./Navbar";

export default {
   title: "Navbar",
   component: Navbar,
   tags: ['autodocs']
};

const Template = ({ label, ...args }) => {
   return Navbar({ label, ...args });
};

export const Default  = Template.bind({});
Default.args = {
   active: false,
};