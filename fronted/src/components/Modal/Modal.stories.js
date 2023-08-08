import { Modal } from "./Modal";

export default {
   title: "Modal",
   component: Modal,
   tags: ["autodocs"],
   parameters: {
      layout: "fullscreen",
   }
};

const Template = ({ label, ...args }) => { 
   return Modal({ label, ...args });
};

export const Default  = Template.bind({});
Default.args = {
   title: "Options",
   parameters: {
      year: [2015, 2016, 2017], 
      month: ["December", "January", "February"], 
      day: [1, 2, 3]
   },
};
