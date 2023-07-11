import { Filled } from "../../components/Buttons/Filled/Filled";
import { Outline } from "../../components/Buttons/Outline/Outline";
import { TextField } from "../../components/TextField/TextField";
import { InputTypes } from "../../constants/InputType";
import { TextFieldTypes } from "../../constants/TextFieldType";

export const Automation = () => {
   return (
      <section className="flex flex-col gap-4 w-full h-screen px-4 justify-center items-center">
         <h1 className="text-4xl font-bold font-sans">Automation</h1>
         <div className="flex flex-col items-center gap-3 w-full">
            <TextField
               forWhat="Name"
               type={TextFieldTypes.Default}
               inputType={InputTypes.Text}
               needSupportive={false}
            />
            <TextField
               forWhat="Amount"
               type={TextFieldTypes.Default}
               inputType={InputTypes.Number}
               needSupportive={false}
            />
            <TextField
               forWhat="Account to transfer"
               type={TextFieldTypes.Default}
               inputType={InputTypes.Number}
               needSupportive={true}
               supportiveText="Add the nine account numbers"
            />
            <TextField
               forWhat="Period of time"
               type={TextFieldTypes.Default}
               inputType={InputTypes.Date}
               needSupportive={false}
            />
         </div>
         <Filled label="Make automation" />
         <Outline label="Cancel" />
      </section>
   );
}