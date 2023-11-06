import { useState } from "react";
import { Filled } from "../../components/Buttons/Filled";
import { TextField } from "../../components/TextField";
import { TextFieldTypes } from "../../constants/TextFieldType";
import { Traduction } from "../../constants/Traduction";
import { getTraduction } from "../../utils/getTraduction";
import { Bar } from "../../components/Loader/Bar";
import { resendToken, savePassword } from "../_services/auth";
import { Modal } from "../../components/Modal";
import { useRef } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { SEO } from "../../utils/SEO";
import { validInputElement } from "../../utils/validInputElement";

/**
 * Page containing the logic to reset the password
 * @returns 
 */
export const SavePassword = () => {
   /** @type {[boolean, import("react").Dispatch<import("react").SetStateAction<boolean>>]} */
   const [isLoading, setIsLoading] = useState(false);
   /** @type {[string, import("react").Dispatch<import("react").SetStateAction<string>>]} */
   const [error, setError] = useState("");
   /** @type {[string, import("react").Dispatch<import("react").SetStateAction<string>>]} */
   const [message, setMessage] = useState("");
   const [searchParams] = useSearchParams();
   const navigate = useNavigate();
   /** @type {import("react").MutableRefObject<HTMLDialogElement>} */
   const dialogRef = useRef();
   const t = getTraduction(Traduction.SAVE_PASSWORD);

   /** @param {import("react").FormEvent<HTMLFormElement>} event */
   const handleSubmit = (event) => {
      event.preventDefault();

      const { elements } = event.currentTarget;
      const inputArray = validInputElement([elements[0], elements[1]]);
      const password = inputArray?.[0].value;
      const confirmation = inputArray?.[1].value;

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
               dialogRef.current?.showModal?.();
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
                  type={TextFieldTypes.PASSWORD}
                  supportiveText={error}
                  isError={Boolean(error)}
                  isDisable={isLoading}
                  />
               <TextField
                  label={t.labels[1]}
                  type={TextFieldTypes.PASSWORD}
                  supportiveText={error}
                  isError={Boolean(error)}
                  isDisable={isLoading}
                  />
               <Filled label={t.accept} isDisable={isLoading} />
            </form>

            {isLoading && <Bar />}

            <Modal 
               title={(message === "valid") ? t.modal.title[0] : t.modal.title[1]}
               dialogRef={dialogRef}
               messageUtils={{
                  message: t.modal.description[message],
                  function: () => { 
                     if (message === "valid") {
                        navigate("/sign-in");
                     } else if (message === "expired") {
                        resendToken(searchParams.get("token"), "password");
                     }
                  },
                  accept: (message !== "invalid")
               }}
            />
         </div>
      </section>
   );
};