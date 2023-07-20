import { useEffect, useState } from "react";
import { Card } from "../../components/Card/Card";
import { Navbar } from "../../components/Navbar/Navbar";
import { Page } from "../../constants/Page";
import { getAutomations } from "../_services/automation";
import { StatusError } from "../../errors/StatusError";
import { Fab } from "../../components/Buttons/FAB/FAB";
import { Link } from "react-router-dom";

export const Home = () => {
   const [automations, setAutomations] = useState([{
      "idAutomation": 1,
      "name": "New automation",
      "amount": 2000.00,
      "idTransferAccount": 419670285,
      "hoursToNextExecution": 6,
      "executionTime": "2023-07-15T17:51:36.986827",
      "status": true
   }]);
   const [notFound, setNotFound] = useState(false); 

   useEffect(() => {
      getAutomations(1)
         .then((data) => {
            if (data instanceof StatusError) setNotFound(true);
            else setAutomations([data, ...automations]);
         });
   }, []);

   return (
      <main className="flex flex-col px-4 pt-4 will-change-scroll">
         <div className="flex flex-col items-center justify-center gap-2 mb-6 font-normal font-sans">
            <p className="text-sm">Hello name</p>
            <p className="text-base">Active balance:</p>
            <p className="text-2xl">$43242.00</p>
         </div>

         <p className="text-base font-semibold font-sans mb-3">Automatic payments active:</p>
         <div className="flex flex-col w-full gap-2">
            {notFound && <p>No automations found</p>}
            {automations?.map((automation) => (
               <Card 
                  key={automation.idAutomation}
                  name={automation.name}
                  money={automation.amount}
                  period={automation.executionTime}
               />
            ))}
         </div>

         <Link to="/transaction">
            <Fab label="Transaction" />
         </Link>
         <Navbar page={Page.Home} />
      </main>
   );
}