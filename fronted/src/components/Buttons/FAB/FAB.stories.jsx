import payments from "../../../assets/transaction.svg"
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
   label: <img width="24" height="24" src={payments} alt="" />,
   active: false,
};