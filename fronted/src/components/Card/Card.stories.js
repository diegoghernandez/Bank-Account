import { Card } from ".";

export default {
   title: "Card",
   component: Card,
   args: {
      name: "Name",
      money: "43254.00",
      period: "Missing 7 days/14 hours/32 minutes",
      isDisable: false
   }
};

export const Default = {};
export const Disable = { args: { isDisable: true }};