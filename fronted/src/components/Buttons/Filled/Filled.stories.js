import { Filled } from ".";

export default {
   title: "Buttons/Filled",
   component: Filled,
   tags: ['autodocs'],
   args: { label: "Button", isDisable: false }
};

export const Default = {};
export const Disable = { args: { isDisable: true }};