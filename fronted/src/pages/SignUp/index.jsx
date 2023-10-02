import { Filled } from "../../components/Buttons/Filled";
import { TextField } from "../../components/TextField";
import { InputTypes } from "../../constants/InputType";
import { TextFieldTypes } from "../../constants/TextFieldType";

export const SignUp = () => {
   return (
      <section className="flex flex-col gap-4 w-full h-screen px-4 justify-center items-center">
         <h1 className="text-4xl font-bold font-sans">Sign Up</h1>
         <div className="flex flex-col items-center gap-3 w-full">
            <TextField
               label="Name"
               type={TextFieldTypes.DEFAULT}
               inputType={InputTypes.TEXT}
               needSupportive={false}
               />
            <TextField
               label="Email"
               type={TextFieldTypes.DEFAULT}
               inputType={InputTypes.EMAIL}
               needSupportive={false}
               />
            <TextField
               label="Password"
               type={TextFieldTypes.DEFAULT}
               inputType={InputTypes.PASSWORD}
               needSupportive={false}
               />
            <TextField
               label="Confirmation"
               type={TextFieldTypes.DEFAULT}
               inputType={InputTypes.PASSWORD}
               needSupportive={false}
               />
         </div>
         <Filled label="Sign Up" />
      </section>
   );
};