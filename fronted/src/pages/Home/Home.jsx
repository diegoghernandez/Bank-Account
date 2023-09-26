import { useEffect, useState } from "react";
import { Card } from "../../components/Card/Card";
import { Navbar } from "../../components/Navbar/Navbar";
import { Page } from "../../constants/Page";
import { getAutomations } from "../_services/automation";
import { Fab } from "../../components/Buttons/FAB/FAB";
import { Link } from "react-router-dom";
import { getTraduction } from "../../utils/getTraduction";
import { Traduction } from "../../constants/Traduction";

const getTimePeriod = (textTime, executionTime) => {
   const startTime = new Date().getTime();
   const endTime = new Date(executionTime).getTime();

   const hoursToNextExecution = Math.round((endTime - startTime) / (1000 * 60 * 60));

   let hours = hoursToNextExecution;
   let days = Math.floor(hours / 24);
   let weeks = Math.floor(days / 7);

   hours = hoursToNextExecution % 24;
   if (weeks !== 0) days = days - (weeks * 7);
   
   let text = textTime[0];

   if (weeks >= 1)  text = text.concat(weeks, ` ${textTime[1]}/`);
   
   if (days >= 1) text = text.concat(days, ` ${textTime[2]}/`);
   
   if (hours >= 1)  text = text.concat(hours, ` ${textTime[3]}`);

   return text;
};

export const Home = () => {
   const [automations, setAutomations] = useState([]);
   const [notFound, setNotFound] = useState(false); 
   const t = getTraduction(Traduction.HOME_PAGE);

   const account = JSON.parse(localStorage.getItem("account"));

   useEffect(() => {
      getAutomations(account?.idAccount, account?.email)
         .then((data) => {
            setAutomations(data);
            setNotFound(false);
         }).catch(() => {
            setNotFound(true);
         });
   }, []);


   return (
      <section className="flex flex-col px-4 pt-4 will-change-scroll">
         <div className="flex flex-col items-center justify-center gap-2 mb-6 font-normal font-sans">
            <p className="text-sm">{t.greeting} {account?.accountName}</p>
            <p className="text-base">{t.balance}:</p>
            <p className="text-2xl">{account?.currentBalance.toFixed(2)}</p>
         </div>

         <p className="text-base font-semibold font-sans mb-3">{t.activeAutomation}:</p>
         <div className="flex flex-col w-full gap-2">
            {notFound && <p>{t.notFound}</p>}
            {automations?.map((automation) => {
               if (automation.status) {
                  return (
                     <Card 
                        key={automation.idAutomation}
                        name={automation.name}
                        money={automation.amount}
                        period={getTimePeriod(t.period, automation.executionTime)}
                        disable={automation.status}
                     />
                  );
               }
            })}
         </div>

         <Link className="group/fab" to="/transaction">
            <Fab label={t.fab} />
         </Link>
         <div className="w-full h-20">
            <Navbar page={Page.Home} />
         </div>
      </section>
   );
};