import { Link, useNavigate } from "react-router-dom";
import { Filled } from "../../components/Buttons/Filled";
import { Outline } from "../../components/Buttons/Outline";
import { TextField } from "../../components/TextField";
import { InputTypes } from "../../constants/InputType";
import { TextFieldTypes } from "../../constants/TextFieldType";
import { saveTransaction } from "../_services/transactions";
import { useRef, useState } from "react";
import { TransactionType } from "../../constants/TransactionType";
import { getTraduction } from "../../utils/getTraduction";
import { Traduction } from "../../constants/Traduction";
import { Bar } from "../../components/Loader/Bar";
import { SEO } from "../../utils/SEO";

export const Transaction = () => {
   const [error, setError] = useState({});
   const [isLoading, setIsLoading] = useState(false);
   const [isActive, setIsActive] = useState(false);
   const [successMessage, setSuccessMessage] = useState("");
   const navigate = useNavigate();
   const t = getTraduction(Traduction.TRANSACTION_PAGE);
   const typeReference = useRef();

   const handleSubmit = (event) => {
      event.preventDefault();

      const { idAccount, email } = JSON.parse(localStorage.getItem("account"));
      const elements = event.target.elements;
      let transactionType;
      
      for (const type of Object.entries(TransactionType)) {
         if (type[1].description.includes(elements[0].value)) {
            transactionType = type[0];
         }
      }

      const typeValue = elements[0].value;
      if (!typeValue) setError({type: t.errorMessages[0]});
      else {
         setIsLoading(true);

         setTimeout(() => {
            saveTransaction({
               idAccount,
               "idTransferAccount": Number(elements[2].value),
               "amount": Number(elements[1].value),
               "transactionType": transactionType
            }, email).then((data) => {
               setSuccessMessage(data);
   
               setTimeout(() => {
                  navigate("/");
               }, 1000);
            }).catch((e) => {
               const message = JSON.parse(e.message);
               setIsLoading(false);
               setError(message);
            });
         }, 1000);
      }
   };

   const handleChange = () => {
      const type = typeReference.current?.value;
      
      if ((type === TransactionType.WIRE_TRANSFER.description) || (type === TransactionType.ONLINE_PAYMENT.description)) {
         setIsActive(true);
      } else {
         setIsActive(false);
      }
   };

   return (
      <section className="flex justify-center items-center h-screen">
         <div className="flex flex-col justify-center items-center gap-4 w-full max-w-[75ch] h-full px-4 mx-auto border border-outline-variant
         bg-white md:rounded-2xl md:px-6 md:py-8 md:h-fit">
            <SEO title={t.seo.title} description={t.seo.description} />
            {!successMessage && <>
               <h1 className="text-4xl font-bold font-sans">{t.title}</h1>
               <form 
                  className="flex flex-col items-center gap-3 w-full"
                  onSubmit={handleSubmit}  
               >
                  <TextField
                     valueRef={typeReference}
                     label={t.labels[0]}
                     type={TextFieldTypes.MENU}
                     inputType={InputTypes.TEXT}
                     supportiveText={error.type}
                     isError={error.type}
                     isDisable={isLoading}
                     menuParameters={Object.values(TransactionType).map((type) => type.description)}
                     functionToUpdate={handleChange}
                  />
                  <TextField
                     label={t.labels[1]}
                     type={TextFieldTypes.DEFAULT}
                     inputType={InputTypes.NUMBER}
                     supportiveText={error.amount}
                     isError={error.amount}
                     isDisable={isLoading}
                  />
                  <TextField
                     label={t.labels[2]}
                     type={TextFieldTypes.DEFAULT}
                     inputType={InputTypes.NUMBER}
                     supportiveText={error.desc}
                     isError={error.desc}
                     isDisable={(isLoading) ? isLoading : !isActive}
                  />
                  <Filled label={t.accept} isDisable={isLoading} />
               </form>

               <Link className="w-full" to="/transactions">
                  <Outline label={t.cancel} isDisable={isLoading} />
               </Link>

               {isLoading && <Bar />}
            </>}
            {successMessage && <p>{successMessage}</p>}
         </div>
      </section>
   );
};