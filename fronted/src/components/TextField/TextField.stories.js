import { InputTypes } from "../../constants/InputType";
import { TextFieldTypes } from "../../constants/TextFieldType";
import { TextField } from ".";
import { TextFieldStyles } from "../../constants/TextFieldStyles";

export default {
   title: "TextField",
   component: TextField,
   tags: ["autodocs"],
   argTypes: {
      isError: { control: "boolean" },
      isDisable: { control: "boolean" },
      type: {
         options: ["Default", "Search"],
         mapping: TextFieldTypes,
         control: "radio",
      },
      inputType: {
         options: Object.keys(InputTypes),
         mapping: InputTypes,
         control: "radio",
      }
   }
};

export const Filled = { 
   args: {
      styles: TextFieldStyles.FILLED,
      label: "Filled",
      type: TextFieldTypes.DEFAULT,
      inputType: InputTypes.TEXT,
      supportiveText: "Supportive",
   }
};

export const Outline = { 
   args: {
      label: "Outline",
      type: TextFieldTypes.DEFAULT,
      inputType: InputTypes.TEXT,
      supportiveText: "Supportive",
   }
};

export const Menu = { 
   args: {
      label: "Menu",
      type: TextFieldTypes.MENU,
      supportiveText: "Supportive",
      menuParameters: ["Deposit", "Online payment", "Wire Transfer"],
   },
   parameters: {
      controls: {
         exclude: ["type", "inputType"]
      }
   }
};

export const Modal = { 
   args: {
      label: "Modal",
      type: TextFieldTypes.MODAL,
      supportiveText: "Supportive",
      modalParameters: [{
         label: "weeks",
         inputType: InputTypes.NUMBER,
         textFieldType: TextFieldTypes.DEFAULT,
      }, {
         label: "days",
         inputType: InputTypes.NUMBER,
         textFieldType: TextFieldTypes.DEFAULT,
         max: 6
      }]
   },
   parameters: {
      controls: {
         exclude: ["type", "inputType"]
      }
   }
};