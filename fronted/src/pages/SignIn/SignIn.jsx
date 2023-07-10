import { Filled } from "../../components/Buttons/Filled/Filled";
import { TextField } from "../../components/TextField/TextField";
import { InputTypes } from "../../constants/InputType";
import { TextFieldTypes } from "../../constants/TextFieldType";

export const SignIn = () => {
   return (
      <section className="flex flex-col gap-4 w-full h-screen px-4 justify-center items-center">
         <h1 className="text-4xl font-bold font-sans">Sign In</h1>
         <div className="flex flex-col items-center gap-3 w-full">
            <TextField
               forWhat="Email"
               type={TextFieldTypes.Default}
               inputType={InputTypes.Email}
               needSupportive={false}
               />
            <TextField
               forWhat="Password"
               type={TextFieldTypes.Default}
               inputType={InputTypes.Password}
               needSupportive={false}
               />
         </div>
         <Filled
            label="Sign In"
         />
      </section>
   );
}