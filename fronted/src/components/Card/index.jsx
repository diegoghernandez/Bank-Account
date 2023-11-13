import { AutomationIcon } from "../../assets/automation";

/**
 * The component to represent the automation values
 * @param {object} props
 * @param {string} props.name The automation name
 * @param {string} props.money The automation money
 * @param {string} props.period The automation time period
 * @param {boolean} props.isDisable The automation status
 * @param {() => void} props.handleFunction The function to execute on click
 * @returns 
 */
export const Card = ({
   name,
   money,
   period,
   isDisable = false,
   handleFunction
}) => {

   const spanColors = (isDisable) ? ["bg-surface-container-highest outline outline-2 outline-outline dark:bg-surface-container-highest dark:outline-outline-dark"
      , "fill-outline dark:fill-outline"] 
   : ["bg-primary-container dark:bg-primary-container-dark", "fill-onPrimary-container dark:fill-onPrimary-container-dark"];
   return (
      <article 
         className={"w-full h-fit cursor-pointer group outline-none bg-surface rounded-xl dark:bg-surface-dark"} 
         tabIndex={0}
         onClick={handleFunction}
      >
         <div className="transition grid grid-cols-1 grid-rows-1 w-full outline outline-1 rounded-xl outline-outline hover:bg-onSurface/8 group-focus:bg-onSurface/12 
         group-hover:bg-onSurface/8 dark:outline-outline-dark dark:hover:bg-onSurface-dark/8 dark:group-focus:bg-onSurface-dark/12 
         dark:group-hover:bg-onSurface-dark/8">
            <div className="w-full h-[4.2rem] col-start-1 col-end-2 row-start-1 row-end-2 flex flex-col pl-4 pb-1 justify-between items-start">
               <h2 className="w-full pt-1 text-2xl text-onSurface font-sans font-bold overflow-hidden overflow-ellipsis whitespace-nowrap dark:text-onSurface-dark">{name}</h2>
               <p className="text-base font-sans font-semibold text-onSurface dark:text-onSurface-dark">${money}</p>
            </div>
            <div className="w-auto h-auto col-start-2 col-end-3 row-start-1 row-end-3 flex justify-center items-center pr-4">
               <span className={`flex justify-center items-center w-12 h-12  rounded-full ${spanColors[0]}`}>
                  <AutomationIcon fillClass={spanColors[1]} />
               </span>
            </div>
            <div className="pl-4 col-start-1 col-end-3 row-start-3 row-end-4 w-full py-2 border-t border-outline dark:border-outline-dark">
               <p className="text-sm font-sans font-medium text-onSurface dark:text-onSurface-dark">{period}</p>
            </div>
         </div>
      </article>
   );
};
