import { Link, useLocation, useNavigate } from "react-router-dom";
import { Filled } from "../../components/Buttons/Filled/Filled";
import { Outline } from "../../components/Buttons/Outline/Outline";
import { TextField } from "../../components/TextField/TextField";
import { InputTypes } from "../../constants/InputType";
import { TextFieldTypes } from "../../constants/TextFieldType";
import { saveTransaction } from "../_services/transactions";
import { useState } from "react";
import { TransactionType } from "../../constants/TransactionType";

export const Transaction = () => {
   const [error, setError] = useState({});
   const navigate = useNavigate();
   const { state } = useLocation();

   const handleSubmit = (event) => {
      event.preventDefault();

      const { idAccount, email } = JSON.parse(localStorage.getItem("account"));
      const elements = event.target;

      if (!elements[0].value) setError({type: "You must choose one"});
      else {
         saveTransaction({
            idAccount,
            "idTransferAccount": Number(elements[2].value),
            "amount": Number(elements[1].value),
            "transactionType": elements[0].value.toUpperCase().replace(" ", "_")
         }, email).then(() => navigate(state?.location?.pathname ?? "/"))
         .catch((e) => {
            const message = JSON.parse(e.message);
            setError(message);
         });
      }
   };

   return (
      <section className="flex flex-col gap-4 w-full h-screen px-4 justify-center items-center">
         <h1 className="text-4xl font-bold font-sans">Transaction</h1>
         <form 
            className="flex flex-col items-center gap-3 w-full"
            onSubmit={handleSubmit}   
         >
            <TextField
               label="Transaction Type"
               type={TextFieldTypes.Menu}
               inputType={InputTypes.Text}
               supportiveText={error.type}
               isError={error.type}
               menuParameters={Object.values(TransactionType).map((type) => type.description)}
            />
            <TextField
               label="Amount"
               type={TextFieldTypes.Default}
               inputType={InputTypes.Number}
               supportiveText={error.amount}
               isError={error.amount}
            />
            <TextField
               label="Account to transfer"
               type={TextFieldTypes.Default}
               inputType={InputTypes.Number}
               supportiveText={error.desc}
               isError={error.desc}
            />
            <Filled label="Make transaction" />
         </form>

         <Link className="w-full" to="/">
            <Outline label="Cancel" />
         </Link>
      </section>
   );
}