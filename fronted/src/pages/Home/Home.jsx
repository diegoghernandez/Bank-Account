import { useEffect, useState } from "react";
import { Card } from "../../components/Card/Card";
import { Navbar } from "../../components/Navbar/Navbar";
import { Page } from "../../constants/Page";
import { getAutomations } from "../_services/automation";
import { Fab } from "../../components/Buttons/FAB/FAB";
import { Link } from "react-router-dom";

const getTimePeriod = (executionTime) => {
   const startTime = new Date().getTime();
   const endTime = new Date(executionTime).getTime();

   const hoursToNextExecution = (endTime - startTime) / (1000 * 60 * 60);

   let hours = hoursToNextExecution.toPrecision(2);
   let days = (hours / 24).toFixed();
   let weeks = (days / 7 <! 1) ? (days / 7).toFixed() : 0;

   hours = hours - (days * 24);
   days = days - (weeks * 7);

   let text = "Missing ";

   if (weeks == 1)  text = text.concat(weeks, " week/");
   else if (weeks > 1)  text = text.concat(weeks, " weeks/");
   
   if (days == 1) text = text.concat(days, " day/");
   else if (days > 1)  text = text.concat(days, " days/");
   
   if (hours < 1)  text = text.concat(hours, " hour");
   else if (hours > 1)  text = text.concat(hours, " hours");

   return text;
};

export const Home = () => {
   const [automations, setAutomations] = useState([]);
   const [notFound, setNotFound] = useState(false); 

   const account = JSON.parse(localStorage.getItem("account"));

   useEffect(() => {
      getAutomations(account.idAccount, account.email)
         .then((data) => {
            setAutomations(data);
            setNotFound(false);
         }).catch(() => {
            setNotFound(true);
         });
   }, []);

   return (
      <main className="flex flex-col px-4 pt-4 will-change-scroll">
         <div className="flex flex-col items-center justify-center gap-2 mb-6 font-normal font-sans">
            <p className="text-sm">Hello {account.accountName}</p>
            <p className="text-base">Active balance:</p>
            <p className="text-2xl">{account.currentBalance.toFixed(2)}</p>
         </div>

         <p className="text-base font-semibold font-sans mb-3">Automatic payments active:</p>
         <div className="flex flex-col w-full gap-2">
            {notFound && <p>No automations found</p>}
            {automations?.map((automation) => {
               if (automation.status) {
                  return (
                     <Card 
                        key={automation.idAutomation}
                        name={automation.name}
                        money={automation.amount}
                        period={getTimePeriod(automation.executionTime)}
                        disable={automation.status}
                     />
                  );
               }
            })}
         </div>

         <Link className="group/fab" to="/transaction">
            <Fab label="Transaction" />
         </Link>
         <div className="w-full h-20">
            <Navbar page={Page.Home} />
         </div>
      </main>
   );
}