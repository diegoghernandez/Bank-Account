import { Link, useNavigate } from "react-router-dom";
import { Filled } from "../../components/Buttons/Filled";
import { Outline } from "../../components/Buttons/Outline";
import { TextField } from "../../components/TextField";
import { InputTypes } from "../../constants/InputType";
import { TextFieldTypes } from "../../constants/TextFieldType";
import { saveAutomation } from "../_services/automation";
import { useRef, useState } from "react";
import { getTraduction } from "../../utils/getTraduction";
import { Traduction } from "../../constants/Traduction";
import { Bar } from "../../components/Loader/Bar";
import { SEO } from "../../utils/SEO";
import { Modal } from "../../components/Modal";
import { validInputElement } from "../../utils/validInputElement";

/**
 * Page containing the logic for create a new Automation
 * @returns 
 */
export const Automation = () => {
   /** @type {[object, import("react").Dispatch<import("react").SetStateAction<object>>]} */
   const [error, setError] = useState({});
   /** @type {[boolean, import("react").Dispatch<import("react").SetStateAction<boolean>>]} */
   const [isLoading, setIsLoading] = useState(false);
   /** @type {[string, import("react").Dispatch<import("react").SetStateAction<string>>]} */
   const [successMessage, setSuccessMessage] = useState("");
   const navigate = useNavigate();
   const t = getTraduction(Traduction.AUTOMATION_PAGE);
   /** @type {import("react").MutableRefObject<HTMLDialogElement>} */
   const dialogRef = useRef();

   /** @param {import("react").FormEvent<HTMLFormElement>} event */
   const handleSubmit = (event) => {
      event.preventDefault();

      /** @type {{ idAccount: number }} */
      const { idAccount } = JSON.parse(localStorage.getItem("account"));
      const { elements } = event.currentTarget;
      const inputArray = validInputElement([elements[0], elements[1], elements[2], elements[3]]);

      const hours = Number(inputArray[3].value.split(" ")[1]);

      setIsLoading(true);

      setTimeout(() => {
         saveAutomation({
            idAccount,
            "name": inputArray[0].value,
            "amount": Number(inputArray[1].value),
            "idTransferAccount": Number(inputArray[2].value),
            "hoursToNextExecution": hours,
         }).then((data) => {
            setSuccessMessage(data);
            dialogRef.current?.showModal?.();
   
            setTimeout(() => {
               dialogRef?.current?.close?.();
               navigate("/automations");
            }, 1000);
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
         bg-white md:rounded-2xl md:px-6 md:py-8 md:h-fit dark:border-outline-variant dark:bg-black">
            <SEO title={t.seo.title} description={t.seo.description} />
            <h1 className="text-4xl font-bold font-sans text-onSurface dark:text-onSurface-dark">{t.title}</h1>
            <form 
               className="flex flex-col items-center gap-3 w-full"
               onSubmit={handleSubmit}
            >
               <TextField
                  label={t.labels[0]}
                  type={TextFieldTypes.DEFAULT}
                  initialInputType={InputTypes.TEXT}
                  isError={error.name}
                  supportiveText={error.name}
                  isDisable={isLoading}
               />
               <TextField
                  label={t.labels[1]}
                  type={TextFieldTypes.DEFAULT}
                  initialInputType={InputTypes.NUMBER}
                  isError={error.amount}
                  supportiveText={error.amount}
                  isDisable={isLoading}
               />
               <TextField
                  label={t.labels[2]}
                  type={TextFieldTypes.DEFAULT}
                  initialInputType={InputTypes.NUMBER}
                  isError={error.desc}
                  supportiveText={error.desc ?? t.description}
                  isDisable={isLoading}
               />
               <TextField
                  label={t.labels[3]}
                  type={TextFieldTypes.MODAL}
                  initialInputType={InputTypes.TEXT}
                  isError={error.hoursToNextExecution}
                  supportiveText={error.hoursToNextExecution}
                  modalParameters={[{
                     label: t.modalParameters[0],
                     initialInputType: InputTypes.NUMBER,
                     textFieldType: TextFieldTypes.DEFAULT
                  }, {
                     label: t.modalParameters[1],
                     initialInputType: InputTypes.NUMBER,
                     textFieldType: TextFieldTypes.DEFAULT,
                     max: 6
                  }, {
                     label: t.modalParameters[2],
                     initialInputType: InputTypes.NUMBER,
                     textFieldType: TextFieldTypes.DEFAULT,
                     max: 23
                  }]}
                  isDisable={isLoading}
               />
               <Filled label={t.accept} isDisable={isLoading} />
            </form>

            <Link className={`w-full group/outline outline-none ${(isLoading) ? "cursor-default" : ""}`} to="/automations">
               <Outline label={t.cancel} isDisable={isLoading} />
            </Link>

            {isLoading && <Bar />}

            <Modal 
               dialogRef={dialogRef}
               messageUtils={{
                  message: successMessage
               }}
            />
         </div>
      </section>
   );
};