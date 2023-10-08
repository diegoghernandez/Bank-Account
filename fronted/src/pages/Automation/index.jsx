import { Link, useNavigate } from "react-router-dom";
import { Filled } from "../../components/Buttons/Filled";
import { Outline } from "../../components/Buttons/Outline";
import { TextField } from "../../components/TextField";
import { InputTypes } from "../../constants/InputType";
import { TextFieldTypes } from "../../constants/TextFieldType";
import { saveAutomation } from "../_services/automation";
import { useState } from "react";
import { getTraduction } from "../../utils/getTraduction";
import { Traduction } from "../../constants/Traduction";
import { Bar } from "../../components/Loader/Bar";
import { SEO } from "../../utils/SEO";

export const Automation = () => {
   const [error, setError] = useState({});
   const [isLoading, setIsLoading] = useState(false);
   const [successMessage, setSuccessMessage] = useState("");
   const navigate = useNavigate();
   const t = getTraduction(Traduction.AUTOMATION_PAGE);

   const handleSubmit = (event) => {
      event.preventDefault();

      const { idAccount } = JSON.parse(localStorage.getItem("account"));
      const elements = event.target.elements;

      const hours = Number(elements[3].value.split(" ")[1]);

      setIsLoading(true);

      setTimeout(() => {
         saveAutomation({
            idAccount,
            "name": elements[0].value,
            "amount": Number(elements[1].value),
            "idTransferAccount": Number(elements[2].value),
            "hoursToNextExecution": hours,
         }).then((data) => {
            setSuccessMessage(data);
   
            setTimeout(() => {
               navigate("/automations");
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
         bg-white md:rounded-2xl md:px-6 md:py-8 md:h-fit">
            <SEO title={t.seo.title} description={t.seo.description} />
            {!successMessage && <>
               <h1 className="text-4xl font-bold font-sans">{t.title}</h1>
               <form 
                  className="flex flex-col items-center gap-3 w-full"
                  onSubmit={handleSubmit}
               >
                  <TextField
                     label={t.labels[0]}
                     type={TextFieldTypes.DEFAULT}
                     inputType={InputTypes.TEXT}
                     isError={error.name}
                     supportiveText={error.name}
                     isDisable={isLoading}
                  />
                  <TextField
                     label={t.labels[1]}
                     type={TextFieldTypes.DEFAULT}
                     inputType={InputTypes.NUMBER}
                     isError={error.amount}
                     supportiveText={error.amount}
                     isDisable={isLoading}
                  />
                  <TextField
                     label={t.labels[2]}
                     type={TextFieldTypes.DEFAULT}
                     inputType={InputTypes.NUMBER}
                     isError={error.desc}
                     supportiveText={error.desc ?? t.description}
                     isDisable={isLoading}
                  />
                  <TextField
                     label={t.labels[3]}
                     type={TextFieldTypes.MODAL}
                     inputType={InputTypes.TEXT}
                     isError={error.hoursToNextExecution}
                     supportiveText={error.hoursToNextExecution}
                     modalParameters={{
                        [t.modalParameters[0]]: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22],
                        [t.modalParameters[1]]: [0, 1, 2, 3, 4, 5, 6],
                        [t.modalParameters[2]]: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23]
                     }}
                     isDisable={isLoading}
                  />
                  <Filled label={t.accept} isDisable={isLoading} />
               </form>

               <Link className="w-full group/outline outline-none" to="/automations">
                  <Outline label={t.cancel} isDisable={isLoading} />
               </Link>

               {isLoading && <Bar />}
            </>}

            {successMessage && <p>{successMessage}</p>}
         </div>
      </section>
   );
};