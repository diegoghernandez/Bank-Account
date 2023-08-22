import { useEffect, useRef, useState } from "react";
import { Fab } from "../../components/Buttons/FAB/FAB";
import { Card } from "../../components/Card/Card";
import { Navbar } from "../../components/Navbar/Navbar";
import { TextField } from "../../components/TextField/TextField";
import { Page } from "../../constants/Page";
import { TextFieldTypes } from "../../constants/TextFieldType";
import { Link } from "react-router-dom";
import { getAutomations } from "../_services/automation";

const getTimePeriod = (hoursToNextExecution) => {
   let hours = hoursToNextExecution;
   let days = (hours / 24).toFixed();
   let weeks = (days / 7 > 1) ? (days / 7).toFixed() : 0;

   hours = hours - (days * 24);
   days = days - (weeks * 7);

   let text = "Each ";

   if (weeks == 1)  text = text.concat(weeks, " week/");
   else if (weeks > 1)  text = text.concat(weeks, " weeks/");
   
   if (days == 1) text = text.concat(days, " day/");
   else if (days > 1)  text = text.concat(days, " days/");
   
   if (hours == 1)  text = text.concat(hours, " hour");
   else if (hours > 1)  text = text.concat(hours, " hours");

   return text;
};

export const Automations = () => {
   const [status, setStatus] = useState("");
   const [automations, setAutomations] = useState([]);
   const [notFound, setNotFound] = useState(false); 
   const [text, setText] = useState("");

   const typeReference = useRef();
   const textReference = useRef();

   const { idAccount, email } = JSON.parse(localStorage.getItem("account"));

   useEffect(() => {
      getAutomations(idAccount, email)
         .then((data) => {
            setAutomations(data, ...automations);
            setNotFound(false);
         }).catch(() => {
            setNotFound(true);
         });
   }, []);

   const handleChange = () => {
      setText(textReference.current?.value);
      setStatus(typeReference.current?.value);
   }


   return (
      <main className="flex flex-col gap-3 pt-3 px-4 mb-3">
         <form 
            className="flex flex-col gap-3"
            onChange={handleChange}   
         >
            <TextField
               label="Transaction Type"
               type={TextFieldTypes.Menu}
               valueRef={typeReference}
               functionToUpdate={handleChange}
               menuParameters={["Active", "Disabled"]}
            />
            <TextField 
               label="Name"
               type = {TextFieldTypes.Search}
               valueRef={textReference}
               functionToUpdate={handleChange}
            />
         </form>

         <div className="flex flex-col w-full gap-2">
            {notFound && <p>No automations found</p>}
            {automations?.map((automation) => {
               const isTextName = automation.name.toLowerCase().includes(text.toLowerCase());
               let isTextType = true;

               if (status) {
                  isTextType = status === "Active" 
                     ? automation.status === true 
                     : automation.status === false;
               }
               return (
                  (isTextName && isTextType) &&
                  <Card 
                     key={automation.idAutomation}
                     name={automation.name}
                     money={automation.amount}
                     period={getTimePeriod(automation.hoursToNextExecution)}
                     disable={automation.status}
                  />
               );
            })}
         </div>

         <Link className="group/fab" to="/automation">
            <Fab label="Automation" />
         </Link>
         <div className="w-full h-20">
            <Navbar page={Page.Automation} />
         </div>
      </main>
   );
}