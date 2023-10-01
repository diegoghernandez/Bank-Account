import { AutomationIcon } from "../../assets/automation";

export const Card = ({
   name,
   money,
   period,
   isDisable = false
}) => {
   return (
      <article className={`w-full h-fit cursor-pointer group`} >
         {isDisable && <div className="absolute w-[calc(100%-1.8rem)] h-[6.5rem] -translate-y-[0.11rem] -translate-x-[0.08rem] rounded-xl bg-surface-container/38"></div>}
         <div className="grid grid-cols-1 grid-rows-1 w-full pt-1 outline outline-1 rounded-xl outline-outline hover:bg-onSurface/8 focus:bg-onSurface/12 group-hover:bg-onSurface/8" tabIndex="0">
            <div className="w-full col-start-1 col-end-2 row-start-1 row-end-2 flex flex-col pl-4 pb-1 justify-end items-start">
               <h2 className="w-full text-2xl font-sans font-bold overflow-hidden overflow-ellipsis whitespace-nowrap">{name}</h2>
               <p className="text-base font-sans font-semibold mt-auto">${money}</p>
            </div>
            <div className="col-start-2 col-end-3 row-start-1 row-end-3 w-auto h-auto flex justify-end items-start mt-2 pr-4">
               <figure className="flex justify-center items-center w-12 h-12 bg-primary-container rounded-full">
                  <AutomationIcon fillClass="fill-onPrimary-container" />
               </figure>
            </div>
            <div className="pl-4 col-start-1 col-end-3 row-start-3 row-end-4 w-full py-2 border-t border-outline">
               <p className="text-sm font-sans font-medium">{period}</p>
            </div>
         </div>
      </article>
   );
};
