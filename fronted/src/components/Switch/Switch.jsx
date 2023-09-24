import { useState } from "react";

const getTextColor = (isDisable) => (isDisable) ? 
   "text-onSurface" : "text-onSurface/38";

const getStyles = (requirement) => {
   if (!requirement.isDisable) {
      if (requirement.checked) {
         return ["justify-end p-1 bg-primary", "w-6 h-6 bg-onPrimary"];
      } else {
         return ["justify-start p-2 border-2 bg-surface-container-highest border-outline", "w-4 h-4 bg-outline"];
      }
   } else {
      if (requirement.checked) {
         return ["cursor-not-allowed justify-end p-1 bg-onSurface/12", "w-6 h-6 bg-surface"];
         
      } else {
         return ["cursor-not-allowed justify-start p-2 border-2 bg-surface-container-highest/12 border-onSurface/12", "w-4 h-4 bg-onSurface/38"];
      }
   }
};

export const Switch = ({ 
   label="",
   isDisable=false,
   checked=false
}) => {
   const [isChecked, setIsChecked] = useState(checked);

   const handleClick = () => {
      setIsChecked(!isChecked);
   };

   const textColor = getTextColor(isDisable);
   const trackColor = getStyles({ isDisable, checked: isChecked })[0];
   const thumbColor = getStyles({ isDisable, checked: isChecked })[1];

   return (
      <div className="flex flex-row w-full justify-between ">
         <label htmlFor="switch" className={`${textColor} text-base font-normal font-sans`}>{label}</label>
         <div>
            <input 
               type="checkbox"
               disabled={isDisable}
               checked={isChecked}
               className="absolute w-[3.3rem] h-8 appearance-none"
               onClick={handleClick}
            >
            </input>
            <span className={`${trackColor} w-[3.25rem] h-8 rounded-full inline-flex items-center`}>
               <figure className={`${thumbColor} rounded-full`}></figure>
            </span>
         </div>
      </div>
   );
};