/** @type {string} */
const BASE_BUTTON_CLASSES =
   "flex flex-col justify-center items-center h-10 w-auto rounded-3xl w-full";

/**
 * Primary button
 * @param {object} props
 * @param {string} props.label The text to be displayed by the component
 * @param {boolean} props.isDisable The value to disable the component
 * @returns 
 */
export const Filled = ({
      label,
      isDisable
   }) => {
   return (
      <div className={`${BASE_BUTTON_CLASSES} ${(isDisable) ? "bg-onSurface/12 dark:bg-onSurface-dark/12" : "bg-primary dark:bg-primary-dark"} `}>
         <button className={`${BASE_BUTTON_CLASSES} bg-primary px-3 text-sm font-medium text-onPrimary hover:bg-onPrimary/8 focus:bg-onPrimary/12 
            focus:outline-none disabled:bg-onSurface/12 disabled:text-onSurface/38 dark:bg-primary-dark dark:text-onPrimary-dark dark:hover:bg-onPrimary-dark/8 
            dark:focus:bg-onPrimary-dark/12 dark:focus:outline-none-dark dark:disabled:bg-onSurface-dark/12 dark:disabled:text-onSurface-dark/38`} disabled={isDisable}>
            {label}
         </button>
      </div>
   );
};