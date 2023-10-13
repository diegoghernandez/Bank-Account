import { useEffect, useRef, useState } from "react";
import { DividerCard } from "../../components/Divider/DividerCard";
import { Navbar } from "../../components/Navbar";
import { TextField } from "../../components/TextField";
import { Page } from "../../constants/Page";
import { TextFieldTypes } from "../../constants/TextFieldType";
import { getTransactions, getTransactionsByName, getTransactionsByDateAndName } from "../_services/transactions";
import { TransactionType } from "../../constants/TransactionType";
import { StatusError } from "../../errors/StatusError";
import { getTraduction } from "../../utils/getTraduction";
import { Traduction } from "../../constants/Traduction";
import { Link } from "react-router-dom";
import { Fab } from "../../components/Buttons/FAB";
import { Spin } from "../../components/Loader/Spin";
import { SEO } from "../../utils/SEO";

const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

const getFormattedDate = (date) => {
   const transformDate = Date.parse(date);  
   const newDate = new Date(transformDate);

   return `${months[newDate.getMonth()]} ${newDate.getDate()} ${newDate.getFullYear()}`;
};

const getDatesAndModifiedContent = (dates, content) => {
   const modifiedContent = [];
   const loopDates = [dates].flat();

   for (const cont of content) {
      const newDate = getFormattedDate(cont.transactionTimestamp);
      if (!loopDates.includes(newDate)) {
         modifiedContent.push({date: newDate});
         loopDates.push(newDate);
      }
      
      modifiedContent.push(cont);
   }

   return { loopDates, modifiedContent };
};

export const Transactions = () => {
   const [allTransactions, setAllTransactions] = useState({
      default: [],
      search: []
   });
   const [texts, setTexts] = useState({
      type: "",
      name: "",
      date: ""
   });
   const [dates, setDates] = useState({
      default: [],
      search: []
   });
   const [page, setPage] = useState({
      default: 0,
      search: [0, "", ""],
   });
   const [notFound, setNotFound] = useState(false); 
   const [loading, setLoading] = useState(true);
   const t = getTraduction(Traduction.TRANSACTIONS_PAGE);

   const typeReference = useRef();
   const textReference = useRef();
   const dateReference = useRef();
   const transactionsContainer = useRef();

   const whichContainer = (globalThis.matchMedia?.("(min-width: 768px)").matches) ? transactionsContainer.current : globalThis;

   const { idAccount } = JSON.parse(localStorage.getItem("account"));

   const handleChange = () =>{
      const text = textReference.current?.value;
      const type = typeReference.current?.value;
      const date = dateReference.current?.value;

      setDates({ ...dates, search: [] });
      setAllTransactions({ ...allTransactions, search: [] });
      setPage({ ...page, search: [0, "", ""] });  

      setNotFound(false);
      setLoading(true);

      setTexts({
         type: type,
         name: text,
         date: date.split(" ")
      });

      whichContainer?.removeEventListener?.("scrollend", () => setPage({
         ...page,
         search: page.search + 1
      }));
   };
   
   useEffect(() => {
      const abortCont = new AbortController();
      setLoading(true);

      setTimeout(async () => {         
         try {
            let content = {};
            let last = false;
            let type = "default";
            let pageContent = page[type] + 1;
   
            if (texts.date[0] || texts.name) {
               whichContainer?.removeEventListener?.("scrollend", () => setPage({
                  ...page,
                  default: page.default + 1
               }));
   
               const text = textReference?.current?.value;
               const date = dateReference?.current?.value;
               let actualPage = page.search[0];
               if ((text !== page.search[1]) || (date !== page.search[2])) {
                  setPage({...page, search: [0, text, date]});
                  actualPage = 0;
               } 
   
               pageContent = [page.search[0] + 1, page.search[1], page.search[2]];
   
               if (texts.date[0]) {
                  const { content: dateContent, last: dateLast } = await 
                     getTransactionsByDateAndName(idAccount, texts.date[0], texts.date[1]?.toUpperCase() ?? "", texts.name, actualPage);
   
                  content = dateContent;
                  last = dateLast;
               } else {
                  const { content: nameContent, last: nameLast } = await getTransactionsByName(idAccount, texts.name, actualPage);
      
                  content = nameContent;
                  last = nameLast;
               }
   
               type = "search";
            } else {
               const { content: defaultContent, last: defaultLast } = await getTransactions(idAccount, page?.default);
   
               content = defaultContent;
               last = defaultLast;
            }
   
            const { loopDates, modifiedContent } = getDatesAndModifiedContent(dates[type], content);
   
            const reverseTransactions = allTransactions[type].toReversed?.();
            const isDupe = reverseTransactions?.some((transaction) => modifiedContent.some((value) => {
               if (value?.date) return false;
               return value?.idTransaction === transaction?.idTransaction;
            }));
   
            if (!isDupe) {
               setDates({
                  ...dates,
                  [type]: loopDates
               });
               setAllTransactions({
                  ...allTransactions,
                  [type]: [...allTransactions[type], modifiedContent].flat()
               });  
            }

            setNotFound(false);
            setLoading(false);
            if (last) {
               setLoading(false);
               whichContainer?.removeEventListener?.("scrollend", () => setPage({
                  ...page,
                  [type]: pageContent
               }));
            } else {
               whichContainer?.addEventListener?.("scrollend", () => setPage({
                  ...page,
                  [type]: pageContent
               }));
   
               if (texts.name || texts.date) {
                  whichContainer?.removeEventListener?.("scrollend", () => setPage({
                     ...page,
                     default: page.default + 1
                  }));
               }
            }
         } catch (error) {
            if (error instanceof StatusError) {
               setNotFound(true);
               setLoading(false);
               setDates({ ...dates, search: [] });
               setAllTransactions({ ...allTransactions, search: [] });  
            }
         }
      }, 500);

      return () => abortCont.abort();
   }, [page, texts.name, texts.date]);

   let transactions = allTransactions.default;

   if (texts.date[0]) transactions = allTransactions.search;
   else if (texts.name) transactions = allTransactions.search;

   return (
      <section className="h-full md:h-screen md:flex md:flex-row-reverse md:overflow-hidden">
         <SEO title={t.seo.title} description={t.seo.description} />
         <div className="w-full min-h-[calc(100vh-5rem)] bg-white border-outline-variant md:border md:rounded-2xl md:mx-6 md:my-4 
            md:pb-2 dark:bg-black dark:border-outline-variant-dark">
            <form className="flex flex-col gap-3 pt-3 px-4 md:px-6 mb-3 md:pt-4">
               <TextField
                  label={t.labels[0]}
                  type={TextFieldTypes.MENU}
                  valueRef={typeReference}
                  functionToUpdate={handleChange}
                  menuParameters={Object.values(TransactionType).map((type) => type.description)}
                  menuClasses="w-[calc(100%-2rem)] md:w-[calc(100%-11rem)]"
               />
               <TextField 
                  label={t.labels[1]}
                  type={TextFieldTypes.SEARCH}
                  valueRef={textReference}
                  functionToUpdate={handleChange}
               />
               <TextField 
                  label={t.labels[2]}
                  type={TextFieldTypes.MODAL}
                  valueRef={dateReference}
                  functionToUpdate={handleChange}
                  modalParameters={{
                     year: [2023, 2022, 2021, 2020, 2019],
                     month: ["", ...months].flat(),
                     day: ["", "01", "02", "03", "04", "05"]
                  }}
               />
            </form>
            <h2 className="text-lg font-medium font-sans ml-4 underline md:ml-6 text-onSurface dark:text-onSurface-dark">{t.title}</h2>
            {notFound && <p className="text-onSurface dark:text-onSurface-dark">{t.notFound}</p>}
            <div ref={transactionsContainer}  className="md:h-[calc(100%-16rem)] md:overflow-y-scroll">
               {transactions?.map((transaction) => {
                  const formattedType = TransactionType[transaction?.transactionType]?.description;
                  const isTextType = formattedType?.includes(texts.type);
                  return (
                     <>
                        {(transaction?.date) &&
                        <div key={transaction?.date} className="mt-3 pl-4 pb-1 border-b border-primary dark:border-primary-dark">
                           <h3 className="text-sm font-medium font-sans text-onSurface dark:text-onSurface-dark">{transaction?.date}</h3>
                        </div>
                        }
                        {(isTextType) &&
                           <DividerCard 
                              key={transaction?.idTransaction}
                              transferAccount={transaction?.idTransferAccount}
                              name={transaction?.receiverName}
                              amount={transaction?.transactionAmount?.toFixed(2)}
                              type={formattedType}
                              time={transaction?.transactionTimestamp}
                              automated={transaction?.isAutomated}
                           />
                        }
                     </>
                  );
               })}
               {loading && <Spin />}
            </div>
         </div>
         <div className="w-full h-20 md:w-fit md:h-fit">
            <Navbar page={Page.TRANSACTIONS} >
               <Link className="group/fab outline-none" to="/transaction">
                  <Fab label={(globalThis.matchMedia?.("(min-width: 768px)").matches) ? t.fab.large : t.fab.small} />
               </Link>
            </Navbar>
         </div>
      </section>
   );
};