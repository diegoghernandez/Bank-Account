import { useEffect, useState } from "react";
import { Fab } from "../../components/Buttons/FAB/FAB";
import { Card } from "../../components/Card/Card";
import { Navbar } from "../../components/Navbar/Navbar";
import { Switch } from "../../components/Switch/Switch";
import { TextField } from "../../components/TextField/TextField";
import { Page } from "../../constants/Page";
import { TextFieldTypes } from "../../constants/TextFieldType";
import { Link } from "react-router-dom";
import { StatusError } from "../../errors/StatusError";
import { getAutomations } from "../_services/automation";

export const Automations = () => {
   const [status, setStatus] = useState("disabled");
   const [automations, setAutomations] = useState([]);
   const [notFound, setNotFound] = useState(false); 

   const { idAccount, email } = JSON.parse(localStorage.getItem("account"));

   useEffect(() => {
      getAutomations(idAccount, email)
         .then((data) => {
            if (data instanceof StatusError) setNotFound(true);
            else setAutomations(data, ...automations);
         });
   }, []);

   const handleSubmit = (event) => {
      event.preventDefault();
      console.log(event.target);

      if (status !== "default") {
         setStatus("default");
      }
   }


   return (
      <main className="flex flex-col gap-3 pt-3 px-4 mb-3">
         <form 
            className="flex flex-col gap-3"
            onChange={handleSubmit}   
         >
            <TextField 
               label="Name"
               type = {TextFieldTypes.Search}
            />
            <Switch
               label="Automation status"
               status={status}
               selected={false}
            />
         </form>

         <div className="flex flex-col w-full gap-2">
            {notFound && <p>No automations found</p>}
            {automations?.map((automation) => {
               return (
                  <Card 
                     key={automation.idAutomation}
                     name={automation.name}
                     money={automation.amount}
                     period={automation.executionTime}
                  />
               );
            })}
         </div>

         <Link to="/automation">
            <Fab label="Automation" />
         </Link>
         <div className="w-full h-20">
            <Navbar page={Page.Automation} />
         </div>
      </main>
   );
}