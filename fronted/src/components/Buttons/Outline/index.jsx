const BASE_BUTTON_CLASSES =
   "flex flex-col justify-center items-center h-10 rounded-3xl w-full";

/**
 * Secondary button
 * @param {object} props
 * @param {string} props.label The text to be displayed by the component
 * @param {boolean} [props.isDisable] The value to disable the component
 * @param {() => void} [props.handleClick] The function to be executed
 * @returns 
 */
export const Outline = ({ 
      label,
      isDisable,
      handleClick
   }) => {

   const colorStyles = (isDisable) ? "border-onSurface/12 text-onSurface/38 dark:border-onSurface-dark/12 dark:text-onSurface-dark/38" : 
   "hover:bg-primary/8 text-primary border-onSurface focus:bg-primary/12 focus:border-primary" + 
      "dark:hover:bg-primary-dark/8 dark:text-primary-dark dark:border-onSurface-dark dark:focus:bg-primary-dark/12 dark:focus:border-primary-dark";

   return (
      <button 
         disabled={isDisable}
         className={`${BASE_BUTTON_CLASSES} ${colorStyles} transition px-3 text-sm text-center font-medium border`}
         onClick={handleClick}
      >
         {label}
      </button>
   );
};