import { Fab } from "./FAB";

export default {
   title: "Buttons/FAB",
   component: Fab,
   tags: ['autodocs']
};

const Template = ({ label, ...args }) => {
   return Fab({ label, ...args });
};

export const Default  = Template.bind({});
Default.args = {
   label: "Transaction",
};