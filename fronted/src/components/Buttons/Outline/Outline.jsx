/* eslint-disable react/prop-types */
import "./Outline.css"

const BASE_BUTTON_CLASSES =
  "flex flex-col justify-center items-center cursor-pointer h-10 w-auto rounded-3xl min-w-full border-onSurface";

/**
* Primary UI component for user interaction
*/
export const Outline = ({ 
      label
   }) => {
   return (
      <button type="button" className={`${BASE_BUTTON_CLASSES} outline--state border focus:border-primary text-primary px-3 text-sm font-medium`}>
         {label}
      </button>
   );
};