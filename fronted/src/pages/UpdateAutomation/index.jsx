import { useRef, useState } from "react";
import { Filled } from "../../components/Buttons/Filled";
import { Bar } from "../../components/Loader/Bar";
import { TextField } from "../../components/TextField";
import { InputTypes } from "../../constants/InputType";
import { TextFieldTypes } from "../../constants/TextFieldType";
import { Traduction } from "../../constants/Traduction";
import { SEO } from "../../utils/SEO";
import { getTraduction } from "../../utils/getTraduction";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Outline } from "../../components/Buttons/Outline";
import { Switch } from "../../components/Switch";
import { deleteAutomation, updateAutomation } from "../_services/automation";
import { Modal } from "../../components/Modal";

export const UpdateAutomation = () => {
   const [error, setError] = useState({});
   const [isLoading, setIsLoading] = useState(false);
   const [message, setMessage] = useState("");
   const navigate = useNavigate();
   const { state } = useLocation();
   const { automation } = state;
   const t = getTraduction(Traduction.UPDATE_AUTOMATION_PAGE);
   const dialogRef = useRef();

   const handleSubmit = (event) => {
      event.preventDefault();

      const { idAccount } = JSON.parse(localStorage.getItem("account"));
      const elements = event.target.elements;

      const hours = Number(elements[3].value.split(" ")[1]);

      setIsLoading(true);

      setTimeout(() => {
         updateAutomation({
            "idAutomation": automation.idAutomation,
            idAccount,
            "name": elements[0].value,
            "amount": Number(elements[1].value),
            "idTransferAccount": Number(elements[2].value),
            "hoursToNextExecution": hours,
            "executionTime": automation.executionTime,
            "status": elements[6].checked
         }).then((data) => {
            setMessage(data);
            dialogRef.current?.showModal?.();
   
            setTimeout(() => {
               dialogRef?.current?.close?.();
               navigate(-1);
            }, 1000);
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

            <Link className={`w-full group/outline outline-none ${(isLoading) ? "cursor-default" : ""}`} to={-1}>
               <Outline label={t.cancel} isDisable={isLoading} />
            </Link>

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
                     message: message
                  }}
               />
            }

            {(message === t.delete.message) && 
               <Modal 
                  dialogRef={dialogRef}
                  messageUtils={{
                     message: message,
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
