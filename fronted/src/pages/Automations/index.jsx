import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Fab } from "../../components/Buttons/FAB";
import { Card } from "../../components/Card";
import { Spin } from "../../components/Loader/Spin";
import { Navbar } from "../../components/Navbar";
import { TextField } from "../../components/TextField";
import { Page } from "../../constants/Page";
import { TextFieldTypes } from "../../constants/TextFieldType";
import { Traduction } from "../../constants/Traduction";
import { SEO } from "../../utils/SEO";
import { getTraduction } from "../../utils/getTraduction";
import { getAutomations } from "../_services/automation";

/**
 * Return a formatted text to show the period of time of automation from the hoursToNextExecution
 * @param {Array<String>} textTime The text to represent each part of the period
 * @param {number} hoursToNextExecution The value with the execution period
 * @returns 
 */
const getTimePeriod = (textTime, hoursToNextExecution) => {
   /** @type {number} */
   let hours = hoursToNextExecution;
   /** @type {number} */
   let days = Number((hours / 24).toFixed());
   /** @type {number} */
   let weeks = (days / 7 > 1) ? Number((days / 7).toFixed()) : 0;

   hours = hours - (days * 24);
   days = days - (weeks * 7);

   let text = textTime[0];

   if (weeks >= 1)  text = text.concat(String(weeks), ` ${textTime[1]}/`);
   
   if (days >= 1) text = text.concat(String(days), ` ${textTime[2]}/`);
   
   if (hours >= 1)  text = text.concat(String(hours), ` ${textTime[3]}`);

   return text;
};

/**
 * Page containing all automations in the account
 * @returns 
 */
export const Automations = () => {
   /** @type {[string, import("react").Dispatch<import("react").SetStateAction<string>>]} */
   const [status, setStatus] = useState("");
   /** @type {[Array<object>, import("react").Dispatch<import("react").SetStateAction<Array<object>>>]} */
   const [automations, setAutomations] = useState([]);
   /** @type {[boolean, import("react").Dispatch<import("react").SetStateAction<boolean>>]} */
   const [notFound, setNotFound] = useState(false); 
   /** @type {[boolean, import("react").Dispatch<import("react").SetStateAction<boolean>>]} */
   const [loading, setLoading] = useState(true);
   /** @type {[string, import("react").Dispatch<import("react").SetStateAction<string>>]} */
   const [text, setText] = useState("");
   const navigate = useNavigate();
   const t = getTraduction(Traduction.AUTOMATIONS_PAGE);

   /** @type {import("react").MutableRefObject<HTMLInputElement>} */
   const typeReference = useRef();
   /** @type {import("react").MutableRefObject<HTMLInputElement>} */
   const textReference = useRef();

   /** @type {{ idAccount: number, email: string }} */
   const { idAccount, email } = JSON.parse(localStorage.getItem("account"));

   useEffect(() => {
      getAutomations(idAccount, email)
         .then((data) => {
            setAutomations(data);
            setNotFound(false);
            setLoading(false);
         }).catch(() => {
            setLoading(false);
            setNotFound(true);
         });
   }, []);

   const handleChange = () => {
      setText(textReference.current?.value);
      setStatus(typeReference.current?.value);
   };

   /** @param {object} automation */
   const handleAutomation = (automation) => {
      navigate("/update-automation", { state: { automation } });
   };

   return (
      <section className="h-full md:h-screen md:flex md:flex-row-reverse md:overflow-hidden">
         <SEO title={t.seo.title} description={t.seo.description} />
         <div className="w-full min-h-[calc(100vh-5rem)] flex flex-col gap-3 pt-3 px-4 pb-3 md:border border-outline-variant bg-white 
            md:rounded-2xl md:mx-6 md:my-4 md:p-0 dark:border-outline-variant-dark dark:bg-black">
            <form 
               className="flex flex-col gap-3 md:pt-6 md:pl-6 md:pr-8"
               onChange={handleChange}   
            >
               <TextField
                  label={t.labels[0]}
                  type={TextFieldTypes.MENU}
                  valueRef={typeReference}
                  functionToUpdate={handleChange}
                  menuParameters={t.menuParameters}
                  menuClasses="w-[calc(100%-2rem)] md:w-[calc(100%-11.5rem)]"
               />
               <TextField 
                  label={t.labels[1]}
                  type = {TextFieldTypes.SEARCH}
                  valueRef={textReference}
                  functionToUpdate={handleChange}
               />
            </form>

            <div className="flex flex-col w-full h-full gap-2 md:py-3 md:pl-6 md:pr-4 md:mb-2 md:h-[calc(100%-8rem)] md:overflow-y-scroll">
               {notFound && <p className="text-onSurface dark:text-onSurface-dark">{t.notFound}</p>}
               {automations?.map((automation) => {
                  const isTextName = automation.name.toLowerCase().includes(text.toLowerCase());
                  let isTextType = true;

                  if (status) {
                     isTextType = status === (t.menuParameters[0])
                        ? automation.status === true 
                        : automation.status === false;
                  }
                  return (
                     (isTextName && isTextType) &&
                     <Card 
                        key={automation.idAutomation}
                        name={automation.name}
                        money={automation.amount}
                        period={getTimePeriod(t.period, automation.hoursToNextExecution)}
                        isDisable={!automation.status}
                        handleFunction={() => handleAutomation(automation)}
                     />
                  );
               })}
               {loading && <Spin />}
            </div>
         </div>
         <div className="w-full h-20 md:w-fit md:h-fit">
            <Navbar page={Page.AUTOMATIONS} >
               <Fab 
                  label={ (globalThis.matchMedia?.("(min-width: 768px)").matches) ? t.fab.large : t.fab.small } 
                  handleClick={() => navigate("/automation")}
               />
            </Navbar>
         </div>
      </section>
   );
};