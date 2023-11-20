import { Outline } from ".";

export default {
   title: "Buttons/Outline",
   component: Outline,
   args: { label: "Button", isDisable: false }
};

export const Default  = {};
export const Disable  = { args: { isDisable: true } };