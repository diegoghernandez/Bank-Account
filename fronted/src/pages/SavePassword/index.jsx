import { useState } from "react";
import { Filled } from "../../components/Buttons/Filled";
import { TextField } from "../../components/TextField";
import { InputTypes } from "../../constants/InputType";
import { TextFieldTypes } from "../../constants/TextFieldType";
import { Traduction } from "../../constants/Traduction";
import { getTraduction } from "../../utils/getTraduction";
import { Bar } from "../../components/Loader/Bar";
import { savePassword } from "../_services/auth";
import { Modal } from "../../components/Modal";
import { useRef } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { SEO } from "../../utils/SEO";

export const SavePassword = () => {
   const [isLoading, setIsLoading] = useState(false);
   const [error, setError] = useState("");
   const [message, setMessage] = useState("");
   const [searchParams] = useSearchParams();
   const navigate = useNavigate();
   const dialogRef = useRef();
   const t = getTraduction(Traduction.SAVE_PASSWORD);

   const handleSubmit = (event) => {
      event.preventDefault();
      const password = event?.target?.elements[0]?.value;
      const confirmation = event?.target?.elements[1]?.value;

      if (password === confirmation) {
         setIsLoading(true);
   
         setTimeout(() => {
            savePassword(searchParams.get("token"), { 
               idAccount: searchParams.get("id"), 
               oldPassword: password, 
               newPassword: confirmation 
            }).then((result) => {
               dialogRef.current?.showModal?.();
               setMessage(result);
            }).catch((e) => {
               const errorMessage = e.message;
               setIsLoading(false);
               setMessage(errorMessage);
            });
         }, 1000);
      } else {
         setError(t.error);
      }
   };

   return (
      <section className="flex justify-center items-center h-screen">
         <div className="flex flex-col justify-center items-center gap-4 w-full max-w-[75ch] h-full px-4 mx-auto border border-outline-variant
         bg-white md:rounded-2xl md:px-6 md:py-8 md:h-fit dark:border-outline-variant dark:bg-black">
            <SEO title={t.seo.title} />
            <h1 className="text-4xl font-bold font-sans text-onSurface dark:text-onSurface-dark">{t.title}</h1>
            <form
               className="flex flex-col items-center gap-3 w-full"
               onSubmit={handleSubmit}   
            >
               <TextField
                  label={t.labels[0]}
                  type={TextFieldTypes.DEFAULT}
                  inputType={InputTypes.PASSWORD}
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

            <Modal 
               title={(!error) ? t.messageTitle[0] : t.messageTitle[1]}
               dialogRef={dialogRef}
               messageUtils={{
                  message: message,
                  function: () => navigate("/sign-in")
               }}
            />
         </div>
      </section>
   );
};