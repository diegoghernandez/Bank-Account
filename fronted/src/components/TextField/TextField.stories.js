import { InputTypes } from "../../constants/InputType";
import { TextFieldTypes } from "../../constants/TextFieldType";
import { TextField } from "./TextField";

export default {
   title: "TextField",
   component: TextField,
   tags: ["autodocs"],
   argTypes: {
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
      label: "Base",
      type: TextFieldTypes.Default,
      inputType: InputTypes.Text,
      supportiveText: "Text",
      isError: true,
   }
};

export const Menu = { 
   args: {
      label: "Base",
      type: TextFieldTypes.Menu,
      supportiveText: "Text",
      isError: false,
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
      label: "Base",
      type: TextFieldTypes.Modal,
      supportiveText: "Text",
      isError: false,
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