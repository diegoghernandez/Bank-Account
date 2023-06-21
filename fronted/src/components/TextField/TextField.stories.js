import { InputTypes } from "../../constants/InputTypes";
import { TextFieldTypes } from "../../constants/TextFieldTypes";
import { TextField } from "./TextField";

export default {
   title: "TextField",
   component: TextField,
   tags: ['autodocs'],
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
   forWhat: "Base",
};