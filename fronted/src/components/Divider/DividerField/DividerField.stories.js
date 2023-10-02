import { DividerField } from ".";

export default {
   title: "Divider/DividerField",
   component: DividerField,
   tags: ['autodocs']
};

const Template = ({ label, ...args }) => { 
   return DividerField({ label, ...args });
};

export const Default  = Template.bind({});
Default.args = {
   label: "Label"
};