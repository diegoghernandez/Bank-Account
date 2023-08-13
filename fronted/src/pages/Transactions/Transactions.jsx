import { useEffect, useRef, useState } from "react";
import { DividerCard } from "../../components/Divider/DividerCard/DividerCard";
import { Navbar } from "../../components/Navbar/Navbar";
import { TextField } from "../../components/TextField/TextField";
import { Page } from "../../constants/Page";
import { TextFieldTypes } from "../../constants/TextFieldType";
import { getTransactions, getTransactionsByName } from "../_services/transactions";
import { TransactionType } from "../../constants/TransactionType";

const getFormattedDate = (date) => {
   const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

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
      name: [],
      date: []
   });
   const [texts, setTexts] = useState({
      type: "",
      name: "",
      date: ""
   });
   const [dates, setDates] = useState({
      default: [],
      name: [],
      date: []
   });
   const [page, setPage] = useState({
      default: 0,
      name: [0, ""]
   });
   const [notFound, setNotFound] = useState(false); 
   const [loading, setLoading] = useState(true);

   const typeReference = useRef();
   const textReference = useRef();

   const { idAccount } = JSON.parse(localStorage.getItem("account"));

   const handleChange = () =>{
      const text = textReference.current?.value;
      const type = typeReference.current?.value;

      if (texts.name !== text) {
         setDates({ ...dates, name: [] });
         setAllTransactions({ ...allTransactions, name: [] });  
         setPage({ ...page, name: [0, text]});
      }

      setNotFound(false);
      setLoading(true);
      setTexts({
         type: type,
         name: text
      });
   };

   let transactions = allTransactions.default;

   if (texts.name) transactions = allTransactions.name;

   useEffect(() => {
      if (!texts.name) {
         getTransactions(idAccount, page.default)
            .then(({content, last}) => {
               const { loopDates, modifiedContent } = getDatesAndModifiedContent(dates.default, content);
               
               setDates({
                  ...dates,
                  default: loopDates
               });
               setAllTransactions({
                  ...allTransactions,
                  default: [...allTransactions.default, modifiedContent].flat()
               });  
               setNotFound(false);
               
               if (last) {
                  setLoading(false);
                  globalThis.removeEventListener("scrollend", () => setPage({
                     ...page,
                     default: page.default + 1
                  }));
               } else {
                  globalThis.addEventListener("scrollend", () => setPage({
                     ...page,
                     default: page.default + 1
                  }));
               }
            }).catch(() => {
               setNotFound(true);
               setLoading(false);
            });
      } 
   }, [page.default]);

   useEffect(() => {
      const text = textReference?.current?.value;
      let actualPage = page.name[0];
      if (text !== page.name[1]) {
         setPage({...page, name: [0, text]});
         actualPage = 0;
      }
      if (texts.name) {   
         setLoading(true)
         getTransactionsByName(idAccount, texts.name, actualPage)
            .then(({content, last}) => {
               const { loopDates, modifiedContent } = getDatesAndModifiedContent(dates.name, content);
               
               setDates({
                  ...dates,
                  name: loopDates
               });
               setAllTransactions({
                  ...allTransactions,
                  name: [...allTransactions.name, modifiedContent].flat()
               });  
               setNotFound(false);
               setLoading(false);
               
               if (last) {
                  setLoading(false);
                  globalThis.removeEventListener("scrollend", () => setPage({
                     ...page,
                     name: [page.name[0] + 1, page.name[1]]
                  }));
               } else {
                  globalThis.addEventListener("scrollend", () => setPage({
                     ...page,
                     name: [page.name[0] + 1, page.name[1]]
                  }));

                  globalThis.removeEventListener("scrollend", () => setPage({
                     ...page,
                     default: page.default + 1
                  }));
               }
            }).catch(() => {
               setNotFound(true);
               setLoading(false);
               setDates({ ...dates, name: [] });
               setAllTransactions({ ...allTransactions, name: [] });  
            });
      } else {
         globalThis.addEventListener("scrollend", () => setPage({
            ...page,
            default: page.default + 1
         }));
      }
   }, [page.name[0], texts.name]);

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