/* eslint-disable react/prop-types */
import "./FAB.css"

const BASE_BUTTON_CLASSES =
  "flex flex-row justify-center items-center cursor-pointer w-fit h-14 rounded-2xl shadow";

/**
* Primary UI component for user interaction
*/
export const Fab = ({ label }) => {
  return (
    <button type="button" className={`absolute bottom-24 right-4 ${BASE_BUTTON_CLASSES} bg-primary-container`}>
      <div className={`${BASE_BUTTON_CLASSES} gap-2 px-3 fab--state`}>
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="24" height="24" fill="none"/>
        <path d="M11 19V13H5V11H11V5H13V11H19V13H13V19H11Z" fill="#1E3A8A"/>
      </svg>
      <p className="text-onPrimary-container text-sm font-sans font-medium">{label}</p>
      </div>
    </button>
  );
};