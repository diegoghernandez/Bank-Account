import { Modal } from ".";
import { InputTypes } from "../../constants/InputType";
import { TextFieldTypes } from "../../constants/TextFieldType";

export default {
   title: "Modal",
   component: Modal,
   parameters: {
      layout: "fullscreen",
   },
   args: { title: "Options" }
};

export const ListModal = {
   args: {
      listUtils: {
         parameters: [{
            label: "Name",
            inputType: InputTypes.TEXT,
            textFieldType: TextFieldTypes.DEFAULT
         }, {
            label: "Month",
            textFieldType: TextFieldTypes.MENU,
            menuParameters: ["January", "February", "March"]
         }, {
            label: "Weeks",
            inputType: InputTypes.NUMBER,
            textFieldType: TextFieldTypes.DEFAULT,
            max: 6
         }],
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
