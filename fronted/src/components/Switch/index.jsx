import { useState } from "react";

/**
 * Return the tailwind classes for the text depending on the state
 * @param {boolean} isDisable The value to represent which classes get for the elements
 * @returns {string}
 */
const getTextColor = (isDisable) => (isDisable) ? 
   "text-onSurface/38 dark:text-onSurface-dark/38" : "text-onSurface dark:text-onSurface-dark";

   /**
    * Return an array with tailwind classes for the following elements: track and thumb element
    * @param {object} requirement 
    * @param {boolean} requirement.isDisable The value to know if is disable
    * @param {boolean} requirement.checked The value to know if is checked
    * @returns 
    */
const getStyles = (requirement) => {
   if (!requirement.isDisable) {
      if (requirement.checked) {
         return ["justify-end p-1 bg-primary dark:bg-primary-dark", "w-6 h-6 bg-onPrimary dark:bg-onPrimary-dark"];
      } else {
         return ["justify-start p-2 border-2 bg-surface-container-highest border-outline dark:bg-surface-container-highest-dark dark:border-outline-dark", 
            "w-4 h-4 bg-outline dark:bg-outline-dark"];
      }
   } else {
      if (requirement.checked) {
         return ["cursor-not-allowed justify-end p-1 bg-onSurface/12 dark:bg-onSurface-dark/12", "w-6 h-6 bg-surface dark:bg-surface-dark"];
      } else {
         return ["cursor-not-allowed justify-start p-2 border-2 bg-surface-container-highest/12 border-onSurface/12 " +
            "dark:bg-surface-container-highest-dark/12 dark:border-onSurface-dark/12", "w-4 h-4 bg-onSurface/38 dark:bg-onSurface-dark/38"];
      }
   }
};

/**
 * Component to represent simple boolean values
 * @param {object} props
 * @param {string} props.label The text to be displayed by the component
 * @param {boolean} props.isDisable The value to use the disable styles
 * @param {boolean} props.checked The initial value to represent for the check input and styles
 * @param {(value: boolean) => void} props.set
 * @returns 
 */
export const Switch = ({ 
   label="",
   isDisable=false,
   checked=false,
   set
}) => {
   const [isChecked, setIsChecked] = useState(checked);

   const textColor = getTextColor(isDisable);
   const trackColor = getStyles({ isDisable, checked: isChecked })[0];
   const thumbColor = getStyles({ isDisable, checked: isChecked })[1];   

   return (
      <div className="flex flex-row w-full justify-between ">
         <label htmlFor="switch" className={`${textColor} text-base font-normal font-sans`}>{label}</label>
         <div>
            <input 
               id="switch"
               type="checkbox"
               defaultChecked={checked}
               disabled={isDisable}
               className="absolute w-[3.3rem] h-8 appearance-none hover:cursor-pointer"
               onClick={() => {
                  setIsChecked(!isChecked);
                  set?.(!isChecked);
               }}
            >
            </input>
            <span className={`${trackColor} w-[3.25rem] h-8 rounded-full inline-flex items-center`}>
               <figure className={`${thumbColor} rounded-full`}></figure>
            </span>
         </div>
      </div>
   );
};