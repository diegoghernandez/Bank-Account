import { Link, useLocation, useNavigate } from "react-router-dom";
import { Filled } from "../../components/Buttons/Filled/Filled";
import { Outline } from "../../components/Buttons/Outline/Outline";
import { TextField } from "../../components/TextField/TextField";
import { InputTypes } from "../../constants/InputType";
import { TextFieldTypes } from "../../constants/TextFieldType";
import { saveTransaction } from "../_services/transactions";
import { useState } from "react";
import { TransactionType } from "../../constants/TransactionType";
import { getTraduction } from "../../utils/getTraduction";
import { Traduction } from "../../constants/Traduction";

export const Transaction = () => {
   const [error, setError] = useState({});
   const navigate = useNavigate();
   const { state } = useLocation();
   const t = getTraduction(Traduction.TRANSACTION_PAGE);

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
      const limit = (typeValue === "Deposit") ? 2 : 3; 
      if (!typeValue) setError({type: t.errorMessages[0]});
      else if (Array.from(elements).slice(0,limit).some((element) => !element.value)) {
         const emptyError = t.errorMessages[1];
         setError({
            amount: !elements[1].value ? emptyError : "",
            desc: (!elements[2].value && limit == 3) ? emptyError : "",
         });
      } else {
         saveTransaction({
            idAccount,
            "idTransferAccount": Number(elements[2].value),
            "amount": Number(elements[1].value),
            "transactionType": transactionType
         }, email).then(() => navigate(state?.location?.pathname ?? "/"))
         .catch((e) => {
            const message = JSON.parse(e.message);
            setError(message);
         });
      }
   };

   return (
      <section className="flex flex-col gap-4 w-full h-screen px-4 justify-center items-center">
         <h1 className="text-4xl font-bold font-sans">{t.title}</h1>
         <form 
            className="flex flex-col items-center gap-3 w-full"
            onSubmit={handleSubmit}   
         >
            <TextField
               label={t.labels[0]}
               type={TextFieldTypes.Menu}
               inputType={InputTypes.Text}
               supportiveText={error.type}
               isError={error.type}
               menuParameters={Object.values(TransactionType).map((type) => type.description)}
            />
            <TextField
               label={t.labels[1]}
               type={TextFieldTypes.Default}
               inputType={InputTypes.Number}
               supportiveText={error.amount}
               isError={error.amount}
            />
            <TextField
               label={t.labels[2]}
               type={TextFieldTypes.Default}
               inputType={InputTypes.Number}
               supportiveText={error.desc}
               isError={error.desc}
            />
            <Filled label={t.accept} />
         </form>

         <Link className="w-full" to="/">
            <Outline label={t.cancel} />
         </Link>
      </section>
   );
};