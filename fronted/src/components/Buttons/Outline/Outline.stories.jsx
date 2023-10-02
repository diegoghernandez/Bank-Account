import { Outline } from ".";

export default {
   title: "Buttons/Outline",
   component: Outline,
   tags: ['autodocs'],
   args: { label: "Button", isDisable: false }
};

export const Default  = {};
export const Disable  = { args: { isDisable: true } };