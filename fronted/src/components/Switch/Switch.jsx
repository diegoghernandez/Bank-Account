import { useState } from "react";

const getTextColor = (textType) => (textType === "default") ? 
   "text-onSurface" : "text-onSurface/38";

const getStyles = (requirement) => {
   if (requirement.status === "default") {
      if (requirement.selected) {
         return ["justify-end p-1 bg-primary", "w-6 h-6 bg-onPrimary"];
      } else {
         return ["justify-start p-2 border-2 bg-surface-container-highest border-outline", "w-4 h-4 bg-outline"];
      }
   } else {
      if (requirement.selected) {
         return ["cursor-not-allowed justify-end p-1 bg-onSurface/12", "w-6 h-6 bg-surface"];
         
      } else {
         return ["cursor-not-allowed justify-start p-2 border-2 bg-surface-container-highest/12 border-onSurface/12", "w-4 h-4 bg-onSurface/38"];
      }
   }
};

export const Switch = ({ 
   label="",
   status="default",
   selected=false
}) => {
   const [isSelected, setIsSelected] = useState(selected);

   const handleClick = () => {
      if (status !== "disabled") {
         setIsSelected(!isSelected);
      }
   };

   const textColor = getTextColor(status);
   const trackColor = getStyles({ status, selected: isSelected })[0];
   const thumbColor = getStyles({ status, selected: isSelected })[1];

   return (
      <div className="flex flex-row w-full justify-between ">
         <p className={`${textColor} text-base font-normal font-sans`}>{label}</p>
         <button 
            type="button"
            onClick={handleClick}
            className={`${trackColor} w-[3.25rem] h-8 rounded-full inline-flex items-center`}
         >
            <figure className={`${thumbColor} rounded-full`}></figure>
         </button>
      </div>
   );
};