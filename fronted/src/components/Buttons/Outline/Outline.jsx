/* eslint-disable react/prop-types */
import "./Outline.css"

const BASE_BUTTON_CLASSES =
  "flex flex-col justify-center items-center cursor-pointer h-10 w-auto rounded-3xl min-w-full border-onSurface";

/**
* Primary UI component for user interaction
*/
export const Outline = ({ 
      label, 
      ...props 
   }) => {
   return (
      <button type="button" className={`${BASE_BUTTON_CLASSES} border focus:border-primary`} {...props}>
         <div className={`${BASE_BUTTON_CLASSES} outline--state text-primary px-3 text-sm font-medium`}>
            {label}
         </div>
      </button>
   );
};