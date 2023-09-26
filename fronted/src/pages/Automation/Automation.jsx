import { Link, useNavigate } from "react-router-dom";
import { Filled } from "../../components/Buttons/Filled/Filled";
import { Outline } from "../../components/Buttons/Outline/Outline";
import { TextField } from "../../components/TextField/TextField";
import { InputTypes } from "../../constants/InputType";
import { TextFieldTypes } from "../../constants/TextFieldType";
import { saveAutomation } from "../_services/automation";
import { useState } from "react";
import { getTraduction } from "../../utils/getTraduction";
import { Traduction } from "../../constants/Traduction";

export const Automation = () => {
   const [error, setError] = useState({});
   const navigate = useNavigate();
   const t = getTraduction(Traduction.AUTOMATION_PAGE);

   const handleSubmit = (event) => {
      event.preventDefault();

      const { idAccount } = JSON.parse(localStorage.getItem("account"));
      const elements = event.target.elements;

      if (Array.from(elements).slice(0,4).some((element) => !element.value)) {
         const emptyError = t.errorMessage;
         setError({
            name: !elements[0].value ? emptyError : "",
            amount: !elements[1].value ? emptyError : "",
            desc: !elements[2].value ? emptyError : "",
            hoursToNextExecution: !elements[3].value ? emptyError : ""
         });
      } else {
         const hours = Number(elements[3].value.split(" ")[1]);
   
         saveAutomation({
            idAccount,
            "name": elements[0].value,
            "amount": Number(elements[1].value),
            "idTransferAccount": Number(elements[2].value),
            "hoursToNextExecution": hours,
         }).then(() => navigate("/automations"))
         .catch((e) => {
            const message = (JSON.parse(e.message));
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
               type={TextFieldTypes.Default}
               inputType={InputTypes.Text}
               isError={error.name}
               supportiveText={error.name}
            />
            <TextField
               label={t.labels[1]}
               type={TextFieldTypes.Default}
               inputType={InputTypes.Number}
               isError={error.amount}
               supportiveText={error.amount}
            />
            <TextField
               label={t.labels[2]}
               type={TextFieldTypes.Default}
               inputType={InputTypes.Number}
               isError={error.desc}
               supportiveText={error.desc ?? t.description}
            />
            <TextField
               label={t.labels[3]}
               type={TextFieldTypes.Modal}
               inputType={InputTypes.Text}
               isError={error.hoursToNextExecution}
               supportiveText={error.hoursToNextExecution}
               modalParameters={{
                  [t.modalParameters[0]]: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22],
                  [t.modalParameters[1]]: [0, 1, 2, 3, 4, 5, 6],
                  [t.modalParameters[2]]: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23]
               }}
            />
            <Filled label={t.accept} />
         </form>

         <Link className="w-full" to="/automations">
            <Outline label={t.cancel} />
         </Link>
      </section>
   );
};