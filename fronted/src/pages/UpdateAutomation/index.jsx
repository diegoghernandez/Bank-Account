import { useState } from "react";
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
import { updateAutomation } from "../_services/automation";

export const UpdateAutomation = () => {
   const [error, setError] = useState({});
   const [isLoading, setIsLoading] = useState(false);
   const [successMessage, setSuccessMessage] = useState("");
   const navigate = useNavigate();
   const { state } = useLocation();
   const { automation } = state;
   const t = getTraduction(Traduction.UPDATE_AUTOMATION_PAGE);

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
            "status": elements[9].checked
         }).then((data) => {
            setSuccessMessage(data);
   
            setTimeout(() => {
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
                     initialValue={automation.name}
                     type={TextFieldTypes.DEFAULT}
                     inputType={InputTypes.TEXT}
                     isError={error.name}
                     supportiveText={error.name}
                     isDisable={isLoading}
                  />
                  <TextField
                     label={t.labels[1]}
                     initialValue={automation.amount}
                     type={TextFieldTypes.DEFAULT}
                     inputType={InputTypes.NUMBER}
                     isError={error.amount}
                     supportiveText={error.amount}
                     isDisable={isLoading}
                  />
                  <TextField
                     label={t.labels[2]}
                     initialValue={automation.idTransferAccount}
                     type={TextFieldTypes.DEFAULT}
                     inputType={InputTypes.NUMBER}
                     isError={error.desc}
                     supportiveText={error.desc ?? t.description}
                     isDisable={isLoading}
                  />
                  <TextField
                     label={t.labels[3]}
                     initialValue={`${t.modalValue[0]} ${automation.hoursToNextExecution} ${t.modalValue[1]}`}
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
                  <div className="w-full border-outline-variant">
                     <Switch 
                        label={t.labels[4]}
                        isDisable={isLoading}
                        checked={automation.status}
                     />
                  </div>
                  <Filled label={t.accept} isDisable={isLoading} />
               </form>

               <Link className="w-full group/outline outline-none" to={-1}>
                  <Outline label={t.cancel} isDisable={isLoading} />
               </Link>

               {isLoading && <Bar />}
            </>}

            {successMessage && <p>{successMessage}</p>}
         </div>
      </section>
   );
};
