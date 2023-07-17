/* eslint-disable react/prop-types */
import "./Filled.css";

const BASE_BUTTON_CLASSES =
  "flex flex-col justify-center items-center cursor-pointer bg-primary h-10 w-auto rounded-3xl w-full";

/**
* Primary UI component for user interaction
*/
export const Filled = ({
      label
   }) => {
   return (
      <div className={`${BASE_BUTTON_CLASSES}`}>
         <button className={`${BASE_BUTTON_CLASSES} filled--state px-3 text-onPrimary text-sm font-medium`} >
            {label}
         </button>
      </div>
   );
};