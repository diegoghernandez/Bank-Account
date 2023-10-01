import { useEffect, useRef, useState } from "react";
import { Fab } from "../../components/Buttons/FAB/FAB";
import { Card } from "../../components/Card/Card";
import { Navbar } from "../../components/Navbar/Navbar";
import { TextField } from "../../components/TextField/TextField";
import { Page } from "../../constants/Page";
import { TextFieldTypes } from "../../constants/TextFieldType";
import { Link } from "react-router-dom";
import { getAutomations } from "../_services/automation";
import { getTraduction } from "../../utils/getTraduction";
import { Traduction } from "../../constants/Traduction";
import { Spin } from "../../components/Loader/Spin/Spin";

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


   return (
      <section className="md:flex md:flex-row-reverse">
         <div className="w-full flex flex-col gap-3 pt-3 px-4 md:p-0 mb-3 md:m-0">
            <form 
               className="flex flex-col gap-3 md:pt-3 md:px-6"
               onChange={handleChange}   
            >
               <TextField
                  label={t.labels[0]}
                  type={TextFieldTypes.Menu}
                  valueRef={typeReference}
                  functionToUpdate={handleChange}
                  menuParameters={t.menuParameters}
               />
               <TextField 
                  label={t.labels[1]}
                  type = {TextFieldTypes.Search}
                  valueRef={textReference}
                  functionToUpdate={handleChange}
               />
            </form>

            <div className="flex flex-col w-full gap-2 md:pt-3 md:px-6 md:h-[calc(100%-8rem)] md:overflow-y-scroll">
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
                     />
                  );
               })}
               {loading && <Spin />}
            </div>
         </div>
         <div className="w-full h-20 md:w-fit md:h-fit">
            <Navbar page={Page.Automation} >
               <Link className="group/fab" to="/automation">
                  <Fab label={t.fab} />
               </Link>
            </Navbar>
         </div>
      </section>
   );
};