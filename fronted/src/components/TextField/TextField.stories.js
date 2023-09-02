import { InputTypes } from "../../constants/InputType";
import { TextFieldTypes } from "../../constants/TextFieldType";
import { TextField } from "./TextField";

export default {
   title: "TextField",
   component: TextField,
   tags: ["autodocs"],
   argTypes: {
      type: {
         options: Object.keys(TextFieldTypes),
         mapping: TextFieldTypes,
         control: "radio"
      },
      inputType: {
         options: Object.keys(InputTypes),
         mapping: InputTypes,
         control: "radio"
      }
   }
};

const Template = ({ label, ...args }) => {
   return TextField({ label, ...args });
};

export const Default  = Template.bind({});
Default.args = {
   label: "Base",
   supportiveText: "Text",
   isError: true,
   modalParameters: {
      weeks: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22],
      days: [0, 1, 2, 3, 4, 5, 6],
   }
};