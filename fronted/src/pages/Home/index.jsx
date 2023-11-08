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

/**
 * Return a formatted text to show missing time for execution of automation from the executionTime
 * @param {Array<String>} textTime The text to represent each part of the period
 * @param {string} executionTime The value with the time to the next execution
 * @returns 
 */
const getTimePeriod = (textTime, executionTime) => {
   /** @type {number} */
   const startTime = new Date().getTime();
   /** @type {number} */
   const endTime = new Date(executionTime).getTime();

   /** @type {number} */
   const hoursToNextExecution = Math.round((endTime - startTime) / (1000 * 60 * 60));

   /** @type {number} */
   let hours = hoursToNextExecution;
   /** @type {number} */
   let days = Math.floor(hours / 24);
   /** @type {number} */
   let weeks = Math.floor(days / 7);

   hours = hoursToNextExecution % 24;
   if (weeks !== 0) days = days - (weeks * 7);
   
   /** @type {string} */
   let text = textTime[0];

   if (weeks >= 1)  text = text.concat(String(weeks), ` ${textTime[1]}/`);
   
   if (days >= 1) text = text.concat(String(days), ` ${textTime[2]}/`);
   
   if (hours >= 1)  text = text.concat(String(hours), ` ${textTime[3]}`);

   return text;
};

/**
 * Page containing all active automations and general values of account
 * @returns 
 */
export const Home = () => {
   /** @type {[Array<object>, import("react").Dispatch<import("react").SetStateAction<Array<object>>>]} */
   const [automations, setAutomations] = useState([]);
   /** @type {[boolean, import("react").Dispatch<import("react").SetStateAction<boolean>>]} */
   const [notFound, setNotFound] = useState(false); 
   /** @type {[boolean, import("react").Dispatch<import("react").SetStateAction<boolean>>]} */
   const [loading, setLoading] = useState(true);
   const navigate = useNavigate();
   const t = getTraduction(Traduction.HOME_PAGE);

   /** @type {{ idAccount: number,  email: string, accountName: string, currentBalance: number}} */
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
                           isDisable={!automation.status}
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