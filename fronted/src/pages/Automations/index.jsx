import { useEffect, useRef, useState } from "react";
import { Fab } from "../../components/Buttons/FAB";
import { Card } from "../../components/Card";
import { Navbar } from "../../components/Navbar";
import { TextField } from "../../components/TextField";
import { Page } from "../../constants/Page";
import { TextFieldTypes } from "../../constants/TextFieldType";
import { Link, useNavigate } from "react-router-dom";
import { getAutomations } from "../_services/automation";
import { getTraduction } from "../../utils/getTraduction";
import { Traduction } from "../../constants/Traduction";
import { Spin } from "../../components/Loader/Spin";
import { SEO } from "../../utils/SEO";

const getTimePeriod = (textTime, hoursToNextExecution) => {
   let hours = hoursToNextExecution;
   let days = (hours / 24).toFixed();
   let weeks = (days / 7 > 1) ? (days / 7).toFixed() : 0;

   hours = hours - (days * 24);
   days = days - (weeks * 7);

   let text = textTime[0];

   if (weeks >= 1)  text = text.concat(weeks, ` ${textTime[1]}/`);
   
   if (days >= 1) text = text.concat(days, ` ${textTime[2]}/`);
   
   if (hours >= 1)  text = text.concat(hours, ` ${textTime[3]}`);

   return text;
};

export const Automations = () => {
   const [status, setStatus] = useState("");
   const [automations, setAutomations] = useState([]);
   const [notFound, setNotFound] = useState(false); 
   const [loading, setLoading] = useState(true);
   const [text, setText] = useState("");
   const navigate = useNavigate();
   const t = getTraduction(Traduction.AUTOMATIONS_PAGE);

   const typeReference = useRef();
   const textReference = useRef();

   const { idAccount, email } = JSON.parse(localStorage.getItem("account"));

   useEffect(() => {
      getAutomations(idAccount, email)
         .then((data) => {
            setAutomations(data, ...automations);
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

   const handleAutomation = (automation) => {
      navigate("/update-automation", { state: { automation } });
   };

   return (
      <section className="h-full md:h-screen md:flex md:flex-row-reverse md:overflow-hidden">
         <SEO title={t.seo.title} description={t.seo.description} />
         <div className="w-full min-h-[calc(100vh-5rem)] flex flex-col gap-3 pt-3 px-4 pb-3 md:border border-outline-variant bg-white md:rounded-2xl md:mx-6 md:my-4 md:p-0">
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
               />
               <TextField 
                  label={t.labels[1]}
                  type = {TextFieldTypes.SEARCH}
                  valueRef={textReference}
                  functionToUpdate={handleChange}
               />
            </form>

            <div className="flex flex-col w-full h-full gap-2 md:py-3 md:pl-6 md:pr-4 md:mb-2 md:h-[calc(100%-8rem)] md:overflow-y-scroll">
               {notFound && <p>{t.notFound}</p>}
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
               <Link className="group/fab outline-none" to="/automation">
                  <Fab label={ (globalThis.matchMedia?.("(min-width: 768px)").matches) ? t.fab.large : t.fab.small } />
               </Link>
            </Navbar>
         </div>
      </section>
   );
};