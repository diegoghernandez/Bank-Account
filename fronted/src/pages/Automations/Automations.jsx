import { useState } from "react";
import { Fab } from "../../components/Buttons/FAB/FAB";
import { Card } from "../../components/Card/Card";
import { Navbar } from "../../components/Navbar/Navbar";
import { Switch } from "../../components/Switch/Switch";
import { TextField } from "../../components/TextField/TextField";
import { Page } from "../../constants/Page";
import { TextFieldTypes } from "../../constants/TextFieldType";

export const Automations = () => {
   const [status, setStatus] = useState("disabled");

   const automation = {
      "idAutomation": 1,
      "name": "New automation",
      "amount": 2000.00,
      "idTransferAccount": 419670285,
      "hoursToNextExecution": 6,
      "executionTime": "2023-07-15T17:51:36.986827",
      "status": true
   }

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

         <Card 
            name={automation.name}
            money={automation.amount}
            period={automation.executionTime}
         />
         <Card 
            name={automation.name}
            money={automation.amount}
            period={automation.executionTime}
         />
         <Card 
            name={automation.name}
            money={automation.amount}
            period={automation.executionTime}
         />
         <Card 
            name={automation.name}
            money={automation.amount}
            period={automation.executionTime}
         />

         <Fab label="Automation" />
         <Navbar page={Page.Automation} />
      </main>
   );
}