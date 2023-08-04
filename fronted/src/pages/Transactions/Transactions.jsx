import { useEffect, useRef, useState } from "react";
import { DividerCard } from "../../components/Divider/DividerCard/DividerCard";
import { Navbar } from "../../components/Navbar/Navbar";
import { TextField } from "../../components/TextField/TextField";
import { Page } from "../../constants/Page";
import { TextFieldTypes } from "../../constants/TextFieldType";
import { getTransactions } from "../_services/transactions";

const getFormattedDate = (date) => {
   const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

   const transformDate = Date.parse(date);  
   const newDate = new Date(transformDate);

   return `${months[newDate.getMonth()]} ${newDate.getDate()} ${newDate.getFullYear()}`;
}

export const Transactions = () => {
   const [transactions, setTransactions] = useState([]);
   const [dates, setDates] = useState([]);
   const [notFound, setNotFound] = useState(false); 
   const [loading, setLoading] = useState(true);
   const [page, setPage] = useState(0);
   const [textName, setTextName] = useState("");
   const [textType, setTextType] = useState("");

   const typeReference = useRef();
   const textReference = useRef();

   const { idAccount } = JSON.parse(localStorage.getItem("account"));

   useEffect(() => {
      getTransactions(idAccount, page)
         .then(({content, last}) => {
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
            
            setDates(loopDates);
            setTransactions([...transactions, modifiedContent].flat());  
            setNotFound(false);
            
            if (last) {
               globalThis.removeEventListener("scrollend", () => setPage(page + 1));
               setLoading(false);
            } else globalThis.addEventListener("scrollend", () => setPage(page + 1));
         }).catch(() => {
            setNotFound(true);
            setLoading(false);
         });
   }, [page]);

   const handleChange = (event) =>{
      event?.preventDefault();

      setTextName(textReference.current?.value);
      setTextType(typeReference.current?.value);
   }

   return (
      <main>
         <form 
            className="flex flex-col gap-3 pt-3 px-4 mb-3"
            onChange={handleChange}
         >
            <TextField
               label="Transaction Type"
               type={TextFieldTypes.Menu}
               valueRef={typeReference}
               functionToUpdate={handleChange}
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
            const isTextName = transaction?.receiverName?.toLowerCase().includes(textName.toLowerCase());
            const isTextType = transaction?.transactionType?.includes(textType);
            return (
               <>
                  {(transaction?.date && !isTextName) &&
                  <div key={transaction?.date} className="mt-3 pl-4 pb-1 border-b border-primary">
                     <h3 className="text-sm font-medium font-sans">{transaction?.date}</h3>
                  </div>
                  }
                  {(isTextName && isTextType) &&
                     <DividerCard 
                        key={transaction?.idTransaction}
                        transferAccount={transaction?.idTransferAccount}
                        name={transaction?.receiverName}
                        amount={transaction?.transactionAmount?.toFixed(2)}
                        type={transaction?.transactionType}
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