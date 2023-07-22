import { Link } from "react-router-dom";
import { Filled } from "../../components/Buttons/Filled/Filled";
import { Outline } from "../../components/Buttons/Outline/Outline";
import { TextField } from "../../components/TextField/TextField";
import { InputTypes } from "../../constants/InputType";
import { TextFieldTypes } from "../../constants/TextFieldType";
import { saveTransaction } from "../_services/transactions";
import { useState } from "react";

export const Transaction = () => {
   const handleSubmit = async (event) => {
      const { idAccount, email } = JSON.parse(localStorage.getItem("account"));
      const elements = [];

      event.preventDefault();

      for (const target of event.target) {
         if (target.value) {
            elements.push(target.value);
         }
      }

      saveTransaction({
         idAccount,
         "idTransferAccount": Number(elements[2]),
         "amount": Number(elements[1]),
         "transactionType": elements[0]
      }, email)
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
            />
            <TextField
               label="Amount"
               type={TextFieldTypes.Default}
               inputType={InputTypes.Number}
            />
            <TextField
               label="Account to transfer"
               type={TextFieldTypes.Default}
               inputType={InputTypes.Number}
               supportiveText="Add the nine account numbers"
            />
            <Filled label="Make transaction" />
         </form>

         <Link className="w-full" to="/">
            <Outline label="Cancel" />
         </Link>
      </section>
   );
}