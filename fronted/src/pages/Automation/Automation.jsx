import { Link } from "react-router-dom";
import { Filled } from "../../components/Buttons/Filled/Filled";
import { Outline } from "../../components/Buttons/Outline/Outline";
import { TextField } from "../../components/TextField/TextField";
import { InputTypes } from "../../constants/InputType";
import { TextFieldTypes } from "../../constants/TextFieldType";
import { saveAutomation } from "../_services/automation";
import { useState } from "react";

export const Automation = () => {
   const [error, setError] = useState({});

   const handleSubmit = (event) => {
      event.preventDefault()

      const { idAccount } = JSON.parse(localStorage.getItem("account"));
      const elements = event.target;

      saveAutomation({
         idAccount,
         "name": elements[0].value,
         "amount": Number(elements[1].value),
         "idTransferAccount": Number(elements[2].value),
         "hoursToNextExecution": Number(elements[3].value),
      }).catch((e) => {
         const message = (JSON.parse(e.message));
         setError(message);
      });
   }

   return (
      <section className="flex flex-col gap-4 w-full h-screen px-4 justify-center items-center">
         <h1 className="text-4xl font-bold font-sans">Automation</h1>
         <form 
            className="flex flex-col items-center gap-3 w-full"
            onSubmit={handleSubmit}
         >
            <TextField
               label="Name"
               type={TextFieldTypes.Default}
               inputType={InputTypes.Text}
               isError={error.name}
               supportiveText={error.name}
            />
            <TextField
               label="Amount"
               type={TextFieldTypes.Default}
               inputType={InputTypes.Number}
               isError={error.amount}
               supportiveText={error.amount}
            />
            <TextField
               label="Account to transfer"
               type={TextFieldTypes.Default}
               inputType={InputTypes.Number}
               isError={error.desc}
               supportiveText={error.desc ?? "Add the nine account numbers"}
            />
            <TextField
               label="Period of time"
               type={TextFieldTypes.Default}
               inputType={InputTypes.Date}
               isError={error.hoursToNextExecution}
               supportiveText={error.hoursToNextExecution}
            />
            <Filled label="Make automation" />
         </form>

         <Link className="w-full" to="/automations">
            <Outline label="Cancel" />
         </Link>
      </section>
   );
}