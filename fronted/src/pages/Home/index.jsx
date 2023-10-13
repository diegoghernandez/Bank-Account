import { useEffect, useState } from "react";
import { Card } from "../../components/Card";
import { Navbar } from "../../components/Navbar";
import { Page } from "../../constants/Page";
import { getAutomations } from "../_services/automation";
import { getTraduction } from "../../utils/getTraduction";
import { Traduction } from "../../constants/Traduction";
import { Spin } from "../../components/Loader/Spin";
import { SEO } from "../../utils/SEO";
import { useNavigate } from "react-router-dom";

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
   const [loading, setLoading] = useState(true);
   const navigate = useNavigate();
   const t = getTraduction(Traduction.HOME_PAGE);

   const account = JSON.parse(localStorage.getItem("account"));

   useEffect(() => {
      setLoading(true);

      getAutomations(account?.idAccount, account?.email)
         .then((data) => {
            setLoading(false);
            
            if (data.filter((automation) => automation.status === true).length === 0) {
               setNotFound(true);
            } else {
               setAutomations(data);
               setNotFound(false);
            }
         }).catch(() => {
            setLoading(false);
            setNotFound(true);
         });
   }, []);

   const handleAutomation = (automation) => {
      navigate("/update-automation", { state: { automation } });
   };

   return (
      <section className="h-full md:h-screen md:flex md:flex-row-reverse md:justify-end md:overflow-hidden">
         <SEO title={t.seo.title} description={t.seo.description} />
         <div className="w-full min-h-[calc(100vh-5rem)] flex flex-col px-4 pt-4 will-change-scroll bg-white border-outline-variant md:border
            md:rounded-2xl md:mx-6 md:my-4 md:p-0 dark:bg-black dark:border-outline-variant-dark">
            <div className="flex flex-col items-center justify-center gap-2 mb-6 font-normal font-sans text-onSurface dark:text-onSurface-dark md:px-6 md:pt-4">
               <p className="text-sm">{t.greeting} {account?.accountName}</p>
               <p className="text-base">{t.balance}:</p>
               <p className="text-2xl">{account?.currentBalance.toFixed(2)}</p>
            </div>

            <p className="text-base font-semibold font-sans mb-3 md:mb-0 md:px-6 text-onSurface dark:text-onSurface-dark">{t.activeAutomation}:</p>
            <div className="inline-flex flex-col w-full gap-2 md:py-3 md:px-6 md:mb-2 md:h-[calc(100%-8rem)] md:overflow-y-scroll">
               {notFound && <p className="text-onSurface dark:text-onSurface-dark">{t.notFound}</p>}
               {automations?.map((automation) => {
                  if (automation.status) {
                     return (
                        <Card 
                           key={automation.idAutomation}
                           name={automation.name}
                           money={automation.amount}
                           period={getTimePeriod(t.period, automation.executionTime)}
                           disable={automation.status}
                           handleFunction={() => handleAutomation(automation)}
                        />
                     );
                  }
               })}
               {loading && <Spin />}
            </div>
         </div>
         <div className="w-full h-20 md:w-fit md:h-fit">
            <Navbar page={Page.HOME} />
         </div>
      </section>
   );
};