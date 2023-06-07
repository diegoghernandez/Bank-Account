import { Outline } from "./Outline";

export default {
   title: "Buttons/Outline",
   component: Outline,
   tags: ['autodocs']
};

const Template = ({ label, ...args }) => {
   return Outline({ label, ...args });
};

export const Default  = Template.bind({});
Default.args = {
   label: "Button",
};