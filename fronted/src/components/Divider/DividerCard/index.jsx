import { AutomationIcon } from "../../../assets/automation";

/**
 * The component to represent the transaction values
 * @param {object} props
 * @param {string} [props.transferAccount="XXXXXX0"] The transfer account to show if exist
 * @param {string} props.name Either the receiver name if there is transfer account or the account name
 * @param {number} props.amount The transaction amount
 * @param {string} props.type The transaction type
 * @param {string} props.time the transaction date
 * @param {boolean} [props.automated=false] If the transaction has been made automatically
 * @returns 
 */
export const DividerCard = ({
   transferAccount = "XXXXXX0",
   name,
   amount,
   type,
   time,
   automated = false
}) => {
   const isTransfer = transferAccount != "XXXXXX0" ? 
      `${transferAccount} - ${type}` : type;

   return (
      <article className="w-full h-20 px-4 py-3 flex flex-col justify-between bg-transparent border-b border-outline-variant font-sans text-sm font-medium text-onSurface
         dark:border-outline-variant-dark dark:text-onSurface-dark">
         <div className="flex flex-row justify-between">
            <div className="flex flex-row gap-3 items-center">
               <p>{name}</p>
               {automated && <AutomationIcon fillClass={"fill-onSurface dark:fill-onSurface-dark"} />}
            </div>
            <p>{isTransfer}</p>
         </div>
         <div className="flex flex-row justify-between">
            <p>{amount}</p>
            <p>{time}</p>
         </div>
      </article>
   );
};