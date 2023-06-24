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
      },
      needSupportive:  { control: "boolean" }
   }
};

const Template = ({ label, ...args }) => {
   return TextField({ label, ...args });
};

export const Default  = Template.bind({});
Default.args = {
   forWhat: "Base",
   needSupportive: true
};