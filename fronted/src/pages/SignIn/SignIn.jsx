import { useLocation, useNavigate } from "react-router-dom";
import { Filled } from "../../components/Buttons/Filled/Filled";
import { TextField } from "../../components/TextField/TextField";
import { InputTypes } from "../../constants/InputType";
import { TextFieldTypes } from "../../constants/TextFieldType";
import { useAuth } from "../../hooks/useAuth";
import { getAccountData } from "../_services/account";
import { login as logUser } from "../_services/auth";
import { useState } from "react";
import { getTraduction } from "../../utils/getTraduction";
import { Traduction } from "../../constants/Traduction";

export const SignIn = () => {
   const { login } = useAuth();
   const navigate = useNavigate();
   const { state } = useLocation();
   const [error, setError] = useState("");
   const t = getTraduction(Traduction.SIGN_IN_PAGE);

   const handleSubmit = (event) => {
      event.preventDefault();
      const email = event?.target?.elements[0]?.value;
      const password = event?.target?.elements[1]?.value;

      if (!email || !password) {
         setError(t.errorMessage);
      } else {
         logUser(email, password)
            .then((token) => {
               localStorage.setItem("token", "Bearer " + token);
               getAccountData(email)
                  .then(() => {
                     login();
                     navigate(state?.location?.pathname ?? "/");
                  });
            }).catch((e) => {
               const message = e.message;
               setError(message);
            });
      }
   };

   return (
      <section className="flex flex-col gap-4 w-full h-screen px-4 justify-center items-center">
         <h1 className="text-4xl font-bold font-sans">{t.title}</h1>
         <form
            className="flex flex-col items-center gap-3 w-full"
            onSubmit={handleSubmit}   
         >
            <TextField
               label={t.labels[0]}
               type={TextFieldTypes.Default}
               inputType={InputTypes.Email}
               supportiveText={error}
               isError={error}
               />
            <TextField
               label={t.labels[1]}
               type={TextFieldTypes.Default}
               inputType={InputTypes.Password}
               supportiveText={error}
               isError={error}
               />
            <Filled label={t.accept} />
         </form>
      </section>
   );
};