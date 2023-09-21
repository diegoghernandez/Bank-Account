import { Filled } from "./Filled";

export default {
   title: "Buttons/Filled",
   component: Filled,
   tags: ['autodocs']
};

const Template = ({ label, ...args }) => {
   return Filled({ label, ...args });
};

export const Default  = Template.bind({});
Default.args = {
   label: "Button",
   isDisable: false
};