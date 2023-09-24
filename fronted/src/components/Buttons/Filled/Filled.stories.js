import { Filled } from "./Filled";

export default {
   title: "Buttons/Filled",
   component: Filled,
   tags: ['autodocs'],
   args: { label: "Button", isDisable: false }
};

export const Default = {};
export const Disable = { args: { isDisable: true }};