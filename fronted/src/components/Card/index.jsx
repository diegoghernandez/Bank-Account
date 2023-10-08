import { AutomationIcon } from "../../assets/automation";

export const Card = ({
   name,
   money,
   period,
   isDisable = false,
   handleFunction
}) => {

   const figureColors = (isDisable) ? ["bg-surface-container-highest outline outline-2 outline-outline", "fill-outline"] : ["bg-primary-container", "fill-onPrimary-container"];
   return (
      <article 
         className={"w-full h-fit cursor-pointer group outline-none"} 
         tabIndex="0"
         onClick={handleFunction}
      >
         <div className="grid grid-cols-1 grid-rows-1 w-full outline outline-1 rounded-xl outline-outline hover:bg-onSurface/8 group-focus:bg-onSurface/12 group-hover:bg-onSurface/8">
            <div className="w-full h-[4.2rem] col-start-1 col-end-2 row-start-1 row-end-2 flex flex-col pl-4 pb-1 justify-between items-start">
               <h2 className="w-full pt-1 text-2xl font-sans font-bold overflow-hidden overflow-ellipsis whitespace-nowrap">{name}</h2>
               <p className="text-base font-sans font-semibold ">${money}</p>
            </div>
            <div className="w-auto h-auto col-start-2 col-end-3 row-start-1 row-end-3 flex justify-center items-center pr-4">
               <figure className={`flex justify-center items-center w-12 h-12  rounded-full ${figureColors[0]}`}>
                  <AutomationIcon fillClass={figureColors[1]} />
               </figure>
            </div>
            <div className="pl-4 col-start-1 col-end-3 row-start-3 row-end-4 w-full py-2 border-t border-outline">
               <p className="text-sm font-sans font-medium">{period}</p>
            </div>
         </div>
      </article>
   );
};
