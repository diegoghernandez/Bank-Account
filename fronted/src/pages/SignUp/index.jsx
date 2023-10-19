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

export const SignUp = () => {
   const [isLoading, setIsLoading] = useState(false);
   const [error, setError] = useState("");
   const [successMessage, setSuccessMessage] = useState("");
   const t = getTraduction(Traduction.SIGN_UP_PAGE);
   const dialogRef = useRef();

   const handleSubmit = (event) => {
      event.preventDefault();
      const name = event?.target?.elements[0]?.value;
      const email = event?.target?.elements[1]?.value;
      const password = event?.target?.elements[2]?.value;
      const confirmation = event?.target?.elements[3]?.value;

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
                  inputType={InputTypes.TEXT}
                  supportiveText={error.name}
                  isError={error.name}
                  isDisable={isLoading}
                  />
               <TextField
                  label={t.labels[1]}
                  type={TextFieldTypes.DEFAULT}
                  inputType={InputTypes.EMAIL}
                  supportiveText={error.email}
                  isError={error.email}
                  isDisable={isLoading}
                  />
               <TextField
                  label={t.labels[2]}
                  type={TextFieldTypes.DEFAULT}
                  inputType={InputTypes.PASSWORD}
                  supportiveText={error.password}
                  isError={error.password}
                  isDisable={isLoading}
                  />
               <TextField
                  label={t.labels[3]}
                  type={TextFieldTypes.DEFAULT}
                  inputType={InputTypes.PASSWORD}
                  supportiveText={error.confirmation}
                  isError={error.confirmation}
                  isDisable={isLoading}
                  />
               <Filled label={t.accept} isDisable={isLoading} />
            </form>
            {isLoading && <Bar />}
            <Modal 
               title={t.success}
               dialogRef={dialogRef}
               messageUtils={{
                  message: successMessage
               }}
            />
         </div>
      </section>
   );
};