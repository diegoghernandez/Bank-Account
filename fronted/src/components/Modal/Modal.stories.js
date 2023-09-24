import { Modal } from "./Modal";

export default {
   title: "Modal",
   component: Modal,
   tags: ["autodocs"],
   parameters: {
      layout: "fullscreen",
   },
   args: { title: "Options" }
};

export const ListModal = {
   args: {
      listUtils: {
         parameters: {
            year: [2015, 2016, 2017], 
            month: ["December", "January", "February"], 
            day: [1, 2, 3]
         },
      }
   }
};
export const FormModal = {
   args: {
      formUtils: {
         inputs: ["First parameter", "Second parameter"],
      }
   }
};

export const MessageModal = {
   args: {
      messageUtils: {
         message: "This is an example"
      }
   }
};
