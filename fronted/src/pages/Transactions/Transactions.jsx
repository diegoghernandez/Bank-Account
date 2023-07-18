import { DividerCard } from "../../components/DividerCard/DividerCard";
import { TextField } from "../../components/TextField/TextField";
import { TextFieldTypes } from "../../constants/TextFieldType";

export const Transactions = () => {
   const transaction = {
      "idTransaction": 1,
      "idTransferAccount": 4234234,
      "receiverName": "Random1",
      "transactionAmount": 120.32,
      "transactionType": "DEPOSIT",
      "transactionTimestamp": "2023-06-26T21:02:13.374219",
      "isAutomated": false
   }

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
         <DividerCard
            transferAccount={transaction.idTransferAccount}
            name={transaction.receiverName}
            amount={transaction.transactionAmount.toFixed(2)}
            type={transaction.transactionType}
            time={transaction.transactionTimestamp}
            automated={transaction.isAutomated}
         />
         <DividerCard
            transferAccount={transaction.idTransferAccount}
            name={transaction.receiverName}
            amount={transaction.transactionAmount}
            type={transaction.transactionType}
            time={transaction.transactionTimestamp}
            automated={transaction.isAutomated}
         />
         <DividerCard
            transferAccount={transaction.idTransferAccount}
            name={transaction.receiverName}
            amount={transaction.transactionAmount}
            type={transaction.transactionType}
            time={transaction.transactionTimestamp}
            automated={!transaction.isAutomated}
         />
      </main>
   );
}