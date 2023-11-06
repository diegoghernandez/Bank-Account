import { useRef, useState } from "react";
import { Filled } from "../../components/Buttons/Filled";
import { TextField } from "../../components/TextField";
import { InputTypes } from "../../constants/InputType";
import { TextFieldTypes } from "../../constants/TextFieldType";
import { Traduction } from "../../constants/Traduction";
import { getTraduction } from "../../utils/getTraduction";
import { SEO } from "../../utils/SEO";
import { Bar } from "../../components/Loader/Bar";
import { register } from "../_services/auth";
import { Modal } from "../../components/Modal";
import { Link, useNavigate } from "react-router-dom";
import { validInputElement } from "../../utils/validInputElement";

/**
 * Page containing the logic to register a new user
 * @returns 
 */
export const SignUp = () => {
   /** @type {[boolean, import("react").Dispatch<import("react").SetStateAction<boolean>>]} */
   const [isLoading, setIsLoading] = useState(false);
   /** @type {[object, import("react").Dispatch<import("react").SetStateAction<object>>]} */
   const [error, setError] = useState("");
   /** @type {[string, import("react").Dispatch<import("react").SetStateAction<string>>]} */
   const [successMessage, setSuccessMessage] = useState("");
   const navigate = useNavigate();
   /** @type {import("react").MutableRefObject<HTMLDialogElement>} */
   const dialogRef = useRef();
   const t = getTraduction(Traduction.SIGN_UP_PAGE);

   /** @param {import("react").FormEvent<HTMLFormElement>} event */
   const handleSubmit = (event) => {
      event.preventDefault();

      const { elements } = event.currentTarget;
      const inputArray = validInputElement([elements[0], elements[1], elements[2], elements[3]]);
      const name = inputArray?.[0].value;
      const email = inputArray?.[1].value;
      const password = inputArray?.[2].value;
      const confirmation = inputArray?.[3].value;

      setIsLoading(true);

      setTimeout(() => {
         register({ name, email, password, matchingPassword: confirmation })
            .then((data) => {
               setSuccessMessage(data);
               dialogRef.current?.showModal?.();
            }).catch((e) => {
               const message = JSON.parse(e.message);
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
                  supportiveText={error.name}
                  isError={error.name}
                  isDisable={isLoading}
                  />
               <TextField
                  label={t.labels[1]}
                  type={TextFieldTypes.DEFAULT}
                  initialInputType={InputTypes.EMAIL}
                  supportiveText={error.email}
                  isError={error.email}
                  isDisable={isLoading}
                  />
               <TextField
                  label={t.labels[2]}
                  type={TextFieldTypes.PASSWORD}
                  supportiveText={error.password}
                  isError={error.password}
                  isDisable={isLoading}
                  />
               <TextField
                  label={t.labels[3]}
                  type={TextFieldTypes.PASSWORD}
                  supportiveText={error.confirmation}
                  isError={error.confirmation}
                  isDisable={isLoading}
                  />
               <Filled label={t.accept} isDisable={isLoading} />
            </form>
            {isLoading && <Bar />}
            <div className="text-sm font-normal font-sans">
                  <span className="text-onSurface-variant dark:text-onSurface-variant-dark">{t.link[0]} </span>
                  <Link to="/sign-in" className="text-primary dark:text-primary-dark hover:underline">
                     {t.link[1]}
                  </Link>
               </div>
            <Modal 
               title={t.success}
               dialogRef={dialogRef}
               messageUtils={{
                  message: successMessage,
                  function: () => navigate("/sign-in"),
                  accept: true
               }}
            />
         </div>
      </section>
   );
};