import { Filled } from "../../components/Buttons/Filled/Filled";
import { TextField } from "../../components/TextField/TextField";
import { InputTypes } from "../../constants/InputType";
import { TextFieldTypes } from "../../constants/TextFieldType";
import { getAccountData } from "../_services/account";
import { login } from "../_services/auth";

export const SignIn = () => {
   const handleSubmit = async (event) => {
      event.preventDefault();
      const email = event.target[0].value;
      const password = event.target[1].value;
      const token = await login(email, password);
      localStorage.setItem("token", "Bearer " + token);
      getAccountData(email);
   }

   return (
      <section className="flex flex-col gap-4 w-full h-screen px-4 justify-center items-center">
         <h1 className="text-4xl font-bold font-sans">Sign In</h1>
         <form 
            className="flex flex-col items-center gap-3 w-full"
            onSubmit={handleSubmit}   
         >
            <TextField
               label="Email"
               type={TextFieldTypes.Default}
               inputType={InputTypes.Email}
               />
            <TextField
               label="Password"
               type={TextFieldTypes.Default}
               inputType={InputTypes.Password}
               />
            <Filled label="Sign In" />
         </form>
      </section>
   );
}