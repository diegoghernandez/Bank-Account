import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Filled } from "../../components/Buttons/Filled";
import { Outline } from "../../components/Buttons/Outline";
import { Bar } from "../../components/Loader/Bar";
import { Modal } from "../../components/Modal";
import { TextField } from "../../components/TextField";
import { InputTypes } from "../../constants/InputType";
import { TextFieldTypes } from "../../constants/TextFieldType";
import { Traduction } from "../../constants/Traduction";
import { TransactionType } from "../../constants/TransactionType";
import { SEO } from "../../utils/SEO";
import { getTraduction } from "../../utils/getTraduction";
import { validInputElement } from "../../utils/validInputElement";
import { saveTransaction } from "../_services/transactions";

/**
 * Page containing the logic for create a new Transaction
 * @returns 
 */
export const Transaction = () => {
   /** @type {[object, import("react").Dispatch<import("react").SetStateAction<object>>]} */
   const [error, setError] = useState({});
   /** @type {[boolean, import("react").Dispatch<import("react").SetStateAction<boolean>>]} */
   const [isLoading, setIsLoading] = useState(false);
   const [isActive, setIsActive] = useState(false);
   /** @type {[string, import("react").Dispatch<import("react").SetStateAction<string>>]} */
   const [successMessage, setSuccessMessage] = useState("");
   const navigate = useNavigate();
   const t = getTraduction(Traduction.TRANSACTION_PAGE);
   /** @type {import("react").MutableRefObject<HTMLDialogElement>} */
   const dialogRef = useRef();
   /** @type {import("react").MutableRefObject<HTMLInputElement>} */
   const typeReference = useRef();

   /** @param {import("react").FormEvent<HTMLFormElement>} event */
   const handleSubmit = (event) => {
      event.preventDefault();

      const { idAccount, email } = JSON.parse(localStorage.getItem("account"));
      const { elements } = event.currentTarget;
      const inputArray = validInputElement([elements[0], elements[1], elements[2]]);
      /** @type {string} */
      let transactionType;
      
      for (const type of Object.entries(TransactionType)) {
         if (type[1].description.includes(inputArray?.[0].value)) {
            transactionType = type[0];
         }
      }

      const typeValue = inputArray?.[0].value;
      if (!typeValue) setError({ type: t.errorMessages[0] });
      else if (transactionType == "DEPOSIT" && inputArray?.[2].value) {
         setError({ desc: t.errorMessages[2] });
         setIsActive(true);
      } else {
         setIsLoading(true);

         setTimeout(() => {
            saveTransaction({
               idAccount,
               "idTransferAccount": Number(inputArray?.[2].value),
               "amount": Number(inputArray?.[1].value),
               "transactionType": transactionType
            }, email).then((data) => {
               setSuccessMessage(data);
               dialogRef.current?.showModal?.();
   
               setTimeout(() => {
                  dialogRef?.current?.close?.();
                  navigate("/transactions");
               }, 1000);
            }).catch((e) => {
               const message = JSON.parse(e.message);
               setIsLoading(false);
               setError(message);
            });
         }, 1000);
      }
   };

   /** Check when the the transaction type change to activate or desactive the transfer account input */
   const handleTransactionTypeChange = () => {
      const type = typeReference.current?.value;
      
      if ((type === TransactionType.WIRE_TRANSFER.description) || (type === TransactionType.ONLINE_PAYMENT.description)) {
         setIsActive(true);
         setError({});
      } else {
         setIsActive(false);
         setError({});
      }
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
                  valueRef={typeReference}
                  label={t.labels[0]}
                  type={TextFieldTypes.MENU}
                  initialInputType={InputTypes.TEXT}
                  supportiveText={error.type}
                  isError={error.type}
                  isDisable={isLoading}
                  menuParameters={Object.values(TransactionType).map((type) => type.description)}
                  menuClasses="w-[calc(100%-2rem)] md:max-w-[calc(75ch-3rem)]"
                  functionToUpdate={handleTransactionTypeChange}
               />
               <TextField
                  label={t.labels[1]}
                  type={TextFieldTypes.DEFAULT}
                  initialInputType={InputTypes.NUMBER}
                  supportiveText={error.amount}
                  isError={error.amount}
                  isDisable={isLoading}
               />
               <TextField
                  label={t.labels[2]}
                  type={TextFieldTypes.DEFAULT}
                  initialInputType={InputTypes.NUMBER}
                  supportiveText={error.desc ?? t.supportText}
                  isError={error.desc}
                  isDisable={(isLoading) ? isLoading : !isActive}
               />
               {isLoading && <Bar />}
               <Filled label={t.accept} isDisable={isLoading} />
            </form>
            
            <Outline 
               label={t.cancel} 
               isDisable={isLoading} 
               handleClick={() => navigate("/transactions")}
            />

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