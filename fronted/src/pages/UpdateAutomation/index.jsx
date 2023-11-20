import { useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Filled } from "../../components/Buttons/Filled";
import { Outline } from "../../components/Buttons/Outline";
import { Bar } from "../../components/Loader/Bar";
import { Modal } from "../../components/Modal";
import { Switch } from "../../components/Switch";
import { TextField } from "../../components/TextField";
import { InputTypes } from "../../constants/InputType";
import { TextFieldTypes } from "../../constants/TextFieldType";
import { Traduction } from "../../constants/Traduction";
import { SEO } from "../../utils/SEO";
import { getTraduction } from "../../utils/getTraduction";
import { validInputElement } from "../../utils/validInputElement";
import { deleteAutomation, updateAutomation } from "../_services/automation";

export const UpdateAutomation = () => {
   /** @type {[object, import("react").Dispatch<import("react").SetStateAction<object>>]} */
   const [error, setError] = useState({});
   /** @type {[boolean, import("react").Dispatch<import("react").SetStateAction<boolean>>]} */
   const [isLoading, setIsLoading] = useState(false);
   /** @type {[string, import("react").Dispatch<import("react").SetStateAction<string>>]} */
   const [message, setMessage] = useState("");
   const navigate = useNavigate();
   const { state } = useLocation();
   /** @type {{ automation: object }} */
   const { automation } = state;
   const t = getTraduction(Traduction.UPDATE_AUTOMATION_PAGE);
   /** @type {import("react").MutableRefObject<HTMLDialogElement>} */
   const dialogRef = useRef();

   /** @param {import("react").FormEvent<HTMLFormElement>} event */
   const handleSubmit = (event) => {
      event.preventDefault();

      const { idAccount } = JSON.parse(localStorage.getItem("account"));
      const { elements } = event.currentTarget;
      const inputArray = validInputElement([elements[0], elements[1], elements[2], elements[3], elements[9]]);
      const hours = Number(inputArray?.[3].value.split(" ")[1]);

      setIsLoading(true);

      setTimeout(() => {
         updateAutomation({
            "idAutomation": automation.idAutomation,
            idAccount,
            "name": inputArray?.[0].value,
            "amount": Number(inputArray?.[1].value),
            "idTransferAccount": Number(inputArray?.[2].value),
            "hoursToNextExecution": hours,
            "executionTime": automation.executionTime,
            "status": inputArray?.[4].checked
         }).then((data) => {
            setMessage(data);
            dialogRef.current?.showModal?.();
         }).catch((e) => {
            const message = (JSON.parse(e.message));
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
            <h1 className="text-4xl text-center font-bold font-sans text-onSurface dark:text-onSurface-dark">{t.title}</h1>
            <form 
               className="flex flex-col items-center gap-3 w-full"
               onSubmit={handleSubmit}
            >
               <TextField
                  label={t.labels[0]}
                  initialValue={automation.name}
                  type={TextFieldTypes.DEFAULT}
                  isError={error.name}
                  supportiveText={error.name}
                  isDisable={isLoading}
               />
               <TextField
                  label={t.labels[1]}
                  initialValue={automation.amount}
                  type={TextFieldTypes.DEFAULT}
                  initialInputType={InputTypes.NUMBER}
                  isError={error.amount}
                  supportiveText={error.amount}
                  isDisable={isLoading}
               />
               <TextField
                  label={t.labels[2]}
                  initialValue={automation.idTransferAccount}
                  type={TextFieldTypes.DEFAULT}
                  initialInputType={InputTypes.NUMBER}
                  isError={error.desc}
                  supportiveText={error.desc ?? t.description}
                  isDisable={isLoading}
               />
               <TextField
                  label={t.labels[3]}
                  initialValue={`${t.modalValue[0]} ${automation.hoursToNextExecution} ${t.modalValue[1]}`}
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
               <div className="w-full border-outline-variant dark:border-outline-variant-dark">
                  <Switch 
                     label={t.labels[4]}
                     isDisable={isLoading}
                     checked={automation.status}
                  />
               </div>
               <Filled label={t.accept} isDisable={isLoading} />
            </form>
            
            <Outline 
               label={t.cancel} 
               isDisable={isLoading} 
               handleClick={() => navigate(-1)}
            />

            <button 
               disabled={isLoading}
               className="text-base font-normal font-sans text-error dark:text-error-dark 
                  disabled:text-onSurface/38 disabled:dark:text-onSurface-dark/38"
               onClick={() => {
                  setMessage(t.delete.message);
                  setTimeout(() => {
                     dialogRef.current?.showModal?.();
                  }, 100);
               }}
            >
               {t.delete.button}
            </button>

            {isLoading && <Bar />}

            {(message !== t.delete.message) && 
               <Modal 
                  dialogRef={dialogRef}
                  messageUtils={{
                     message: message,
                     accept: true,
                     function: () => {
                        dialogRef?.current?.close?.();
                        navigate(-1);
                     }
                  }}
               />
            }

            {(message === t.delete.message) && 
               <Modal 
                  title={t.delete.title}
                  dialogRef={dialogRef}
                  messageUtils={{
                     message: message,
                     cancel: true,
                     accept: true,
                     function: () => {
                        deleteAutomation(automation.idAutomation)
                           .then((result) => {
                              setMessage(result);
                              setTimeout(() => {
                                 dialogRef.current?.showModal?.();
                              }, 100);
                           })
                           .catch((error) => {
                              setMessage(error.message);
                              setTimeout(() => {
                                 dialogRef.current?.showModal?.();
                              }, 100);
                           });
                     }
                  }}
               />
            }
         </div>
      </section>
   );
};
