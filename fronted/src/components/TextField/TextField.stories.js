import { TextField } from "./TextField";

export default {
   title: "TextField",
   component: TextField,
   tags: ['autodocs']
};

const Template = ({ label, ...args }) => {
   return TextField({ label, ...args });
};

export const Default  = Template.bind({});
Default.args = {
   type: "Default"
};