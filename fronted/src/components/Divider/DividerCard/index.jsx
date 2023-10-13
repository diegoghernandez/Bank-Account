import { AutomationIcon } from "../../../assets/automation";

export const DividerCard = ({
   transferAccount = 0,
   name,
   amount,
   type,
   time,
   automated = false
}) => {
   const isTransfer = transferAccount != 0 ? 
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