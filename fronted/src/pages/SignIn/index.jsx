import { useLocation, useNavigate } from "react-router-dom";
import { Filled } from "../../components/Buttons/Filled";
import { TextField } from "../../components/TextField";
import { InputTypes } from "../../constants/InputType";
import { TextFieldTypes } from "../../constants/TextFieldType";
import { getAccountData } from "../_services/account";
import { login as logUser } from "../_services/auth";
import { useState } from "react";
import { getTraduction } from "../../utils/getTraduction";
import { Traduction } from "../../constants/Traduction";
import { Bar } from "../../components/Loader/Bar";
import { SEO } from "../../utils/SEO";
import { useAuth } from "../../hooks/useAuth";

export const SignIn = () => {
   const [error, setError] = useState("");
   const [isLoading, setIsLoading] = useState(false);
   const { login } = useAuth();
   const navigate = useNavigate();
   const { state } = useLocation();
   const t = getTraduction(Traduction.SIGN_IN_PAGE);

   const handleSubmit = (event) => {
      event.preventDefault();
      const email = event?.target?.elements[0]?.value;
      const password = event?.target?.elements[1]?.value;

      setIsLoading(true);

      setTimeout(() => {
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
               setIsLoading(false);
               setError(message);
            });
      }, 1000);

   };

   return (
      <section className="flex justify-center items-center h-screen">
         <div className="flex flex-col justify-center items-center gap-4 w-full max-w-[75ch] h-full px-4 mx-auto border border-outline-variant
         bg-white md:rounded-2xl md:px-6 md:py-8 md:h-fit dark:border-outline-variant-dark dark:bg-black">
            <SEO title={t.seo.title} description={t.seo.description} />
            <h1 className="text-4xl font-bold font-sans text-onSurface dark:text-onSurface-dark">{t.title}</h1>
            <form
               className="flex flex-col items-center gap-3 w-full"
               onSubmit={handleSubmit}   
            >
               <TextField
                  label={t.labels[0]}
                  type={TextFieldTypes.DEFAULT}
                  inputType={InputTypes.EMAIL}
                  supportiveText={error}
                  isError={error}
                  isDisable={isLoading}
                  />
               <TextField
                  label={t.labels[1]}
                  type={TextFieldTypes.DEFAULT}
                  inputType={InputTypes.PASSWORD}
                  supportiveText={error}
                  isError={error}
                  isDisable={isLoading}
                  />
               <Filled label={t.accept} isDisable={isLoading} />
            </form>
            {isLoading && <Bar />}
         </div>
      </section>
   );
};