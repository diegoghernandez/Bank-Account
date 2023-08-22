import { useCallback, useEffect, useRef, useState } from "react";
import { DividerCard } from "../../components/Divider/DividerCard/DividerCard";
import { Navbar } from "../../components/Navbar/Navbar";
import { TextField } from "../../components/TextField/TextField";
import { Page } from "../../constants/Page";
import { TextFieldTypes } from "../../constants/TextFieldType";
import { getTransactions, getTransactionsByName, getTransactionsByDateAndName } from "../_services/transactions";
import { TransactionType } from "../../constants/TransactionType";

const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

const getFormattedDate = (date) => {
   const transformDate = Date.parse(date);  
   const newDate = new Date(transformDate);

   return `${months[newDate.getMonth()]} ${newDate.getDate()} ${newDate.getFullYear()}`;
}

const formatType = (str) => {
   str = str.toLowerCase();
   str = str[0].toUpperCase() + str.slice(1);
   str = str.replace("_", " ");
   return str;
}

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
}

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

   const typeReference = useRef();
   const textReference = useRef();
   const dateReference = useRef();

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

      globalThis.removeEventListener("scrollend", () => setPage({
         ...page,
         search: page.search + 1
      }));
   };

   const getData = useCallback(async () => {
      try {
         let content = {};
         let last = false;
         let type = "default";
         let pageContent = page[type] + 1;

         setLoading(true);

         if (texts.date[0] || texts.name) {
            globalThis.removeEventListener("scrollend", () => setPage({
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
                  getTransactionsByDateAndName(idAccount, texts.date[0], texts.date[1]?.toUpperCase() ?? "", texts.name, actualPage)

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
         
         const reverseTransactions = allTransactions[type].toReversed();
         const isDupe = reverseTransactions.some((transaction) => modifiedContent.some((value) => {
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
            globalThis.removeEventListener("scrollend", () => setPage({
               ...page,
               [type]: pageContent
            }));
         } else {
            globalThis.addEventListener("scrollend", () => setPage({
               ...page,
               [type]: pageContent
            }));

            if (texts.name || texts.date) {
               globalThis.removeEventListener("scrollend", () => setPage({
                  ...page,
                  default: page.default + 1
               }));
            }
         }
      } catch (error) {
         setNotFound(true);
         setLoading(false);
         setDates({ ...dates, search: [] });
         setAllTransactions({ ...allTransactions, search: [] });  
      }
   }, [page, texts.name, texts.date]);

   let transactions = allTransactions.default;

   if (texts.date[0]) transactions = allTransactions.search;
   else if (texts.name) transactions = allTransactions.search;
   
   useEffect(() => {
      getData();
   }, [getData]);

   return (
      <main>
         <form className="flex flex-col gap-3 pt-3 px-4 mb-3" >
            <TextField
               label="Transaction Type"
               type={TextFieldTypes.Menu}
               valueRef={typeReference}
               functionToUpdate={handleChange}
               menuParameters={Object.values(TransactionType).map((type) => type.description)}
            />
            <TextField 
               label="Name"
               type={TextFieldTypes.Search}
               valueRef={textReference}
               functionToUpdate={handleChange}
            />
            <TextField 
               label="Date"
               type={TextFieldTypes.Modal}
               valueRef={dateReference}
               functionToUpdate={handleChange}
               modalParameters={{
                  year: [2023, 2022, 2021, 2020, 2019],
                  month: ["", ...months].flat(),
                  day: ["", "01", "02", "03", "04", "05"]
               }}
            />
         </form>
         <h2 className="text-lg font-medium font-sans ml-4 underline">Transactions</h2>
         {notFound && <p>No automations found</p>}
         {transactions?.map((transaction) => {
            const isTextType = transaction?.transactionType?.toLowerCase().includes(texts.type.toLowerCase().replace(" ", "_"));
            return (
               <>
                  {(transaction?.date) &&
                  <div key={transaction?.date} className="mt-3 pl-4 pb-1 border-b border-primary">
                     <h3 className="text-sm font-medium font-sans">{transaction?.date}</h3>
                  </div>
                  }
                  {(isTextType) &&
                     <DividerCard 
                        key={transaction?.idTransaction}
                        transferAccount={transaction?.idTransferAccount}
                        name={transaction?.receiverName}
                        amount={transaction?.transactionAmount?.toFixed(2)}
                        type={formatType(transaction?.transactionType)}
                        time={transaction?.transactionTimestamp}
                        automated={transaction?.isAutomated}
                     />
                  }
               </>
            )
         })}

         {loading && 
            <div className="w-full h-12 flex justify-center items-center">
               <figure className="rounded-full border-r-primary border-4 border-outline h-10 w-10 animate-spin"></figure>
            </div>
         }


         <div className="w-full h-20">
            <Navbar page={Page.Transactions} />
         </div>
      </main>
   );
}