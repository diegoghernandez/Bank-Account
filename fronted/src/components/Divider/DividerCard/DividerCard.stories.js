import { DividerCard } from "./DividerCard";

export default {
   title: "Divider/DividerCard",
   component: DividerCard,
   tags: ['autodocs']
};

const Template = ({ label, ...args }) => { 
   return DividerCard({ label, ...args });
};

export const Default  = Template.bind({});
Default.args = {
   automated: true,
   transferAccount: "0",
   name: "Cuenta",
   amount: "$432003.00",
   type: "Wire Transfer",
   time: "2024/02/03  11:34:23"
};