import { InputTypes } from "../../constants/InputType";
import { TextFieldTypes } from "../../constants/TextFieldType";
import { TextField } from "./TextField";

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

export const Default = { 
   args: {
      label: "Default",
      type: TextFieldTypes.Default,
      inputType: InputTypes.Text,
      supportiveText: "Supportive",
   }
};

export const Menu = { 
   args: {
      label: "Menu",
      type: TextFieldTypes.Menu,
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
      type: TextFieldTypes.Modal,
      supportiveText: "Supportive",
      modalParameters: {
         weeks: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22],
         days: [0, 1, 2, 3, 4, 5, 6],
      }
   },
   parameters: {
      controls: {
         exclude: ["type", "inputType"]
      }
   }
};