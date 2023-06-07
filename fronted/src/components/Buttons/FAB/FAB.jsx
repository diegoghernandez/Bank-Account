/* eslint-disable react/prop-types */
import "./FAB.css"

const BASE_BUTTON_CLASSES =
  "flex flex-col justify-center items-center cursor-pointer w-14 h-14 rounded-2xl shadow";

/**
* Primary UI component for user interaction
*/
export const Fab = ({
    label, 
    ...props 
  }) => {
  return (
    <button type="button" className={`${BASE_BUTTON_CLASSES} bg-primary-container`} {...props}>
      <div className={`${BASE_BUTTON_CLASSES} fab--state`}>
        {label}
      </div>
    </button>
  );
};