import { useEffect, useState } from "react";
import { DividerCard } from "../../components/Divider/DividerCard/DividerCard";
import { Navbar } from "../../components/Navbar/Navbar";
import { TextField } from "../../components/TextField/TextField";
import { Page } from "../../constants/Page";
import { TextFieldTypes } from "../../constants/TextFieldType";
import { getTransactions } from "../_services/transactions";
import { StatusError } from "../../errors/StatusError";

export const Transactions = () => {
   const [transactions, setTransactions] = useState([]);
   const [notFound, setNotFound] = useState(false); 
   const [page, setPage] = useState(0);

   const { idAccount } = JSON.parse(localStorage.getItem("account"));

   useEffect(() => {
      getTransactions(idAccount, page)
         .then(({content, last}) => {
            if (content instanceof StatusError) setNotFound(true);
            else {
               setTransactions([...transactions, content].flat());  
               if (last) globalThis.removeEventListener("scrollend", () => setPage(page + 1))
               else globalThis.addEventListener("scrollend", () => setPage(page + 1));
            } 
         });
   }, [page]);

   return (
      <main>
         <div className="flex flex-col gap-3 pt-3 px-4 mb-3">
            <TextField
               label="Transaction Type"
               type = {TextFieldTypes.Menu}
            />
            <TextField 
               label="Name"
               type = {TextFieldTypes.Search}
            />
         </div>
         <h2 className="text-lg font-medium font-sans ml-4 underline">Transactions</h2>
         <div className="mt-3 pl-4 pb-1 border-b border-outline-variant ">
            <h3 className="text-sm font-medium font-sans">03 March 2024</h3>
         </div>
         {notFound && <p>No automations found</p>}
         {transactions?.map((transaction) => (
            <DividerCard 
               key={transaction.idTransaction}
               transferAccount={transaction.idTransferAccount}
               name={transaction.receiverName}
               amount={transaction.transactionAmount.toFixed(2)}
               type={transaction.transactionType}
               time={transaction.transactionTimestamp}
               automated={transaction.isAutomated}
            />
         ))}

         <div className="w-full h-20">
            <Navbar page={Page.Transactions} />
         </div>
      </main>
   );
}