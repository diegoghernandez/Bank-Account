import { Card } from "./Card";

export default {
   title: "Card",
   component: Card,
   tags: ['autodocs']
};

const Template = ({ label, ...args }) => { 
   return Card({ label, ...args });
};

export const Default  = Template.bind({});
Default.args = {
   name: "Name",
   money: "43254.00",
   period: "Missing 7 days/14 hours/32 minutes"
};