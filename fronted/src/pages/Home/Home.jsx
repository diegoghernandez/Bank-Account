import { useEffect, useState } from "react";
import { Card } from "../../components/Card/Card";
import { Navbar } from "../../components/Navbar/Navbar";
import { Page } from "../../constants/Page";
import { getAutomations } from "../_services/automation";
import { Fab } from "../../components/Buttons/FAB/FAB";
import { Link } from "react-router-dom";

export const Home = () => {
   const [automations, setAutomations] = useState([]);
   const [notFound, setNotFound] = useState(false); 

   const account = JSON.parse(localStorage.getItem("account"));

   useEffect(() => {
      getAutomations(account.idAccount, account.email)
         .then((data) => {
            setAutomations(data, ...automations);
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
                        period={automation.executionTime}
                     />
                  );
               }
            })}
         </div>

         <Link to="/transaction">
            <Fab label="Transaction" />
         </Link>
         <div className="w-full h-20">
            <Navbar page={Page.Home} />
         </div>
      </main>
   );
}