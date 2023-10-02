const BASE_BUTTON_CLASSES =
   "flex flex-col justify-center items-center h-10 w-auto rounded-3xl min-w-full";

export const Outline = ({ 
      label,
      isDisable
   }) => {

   const hover = (isDisable) ? "" : "hover:bg-primary/8";

   return (
      <button type="button" className={`${BASE_BUTTON_CLASSES} ${hover} text-primary border-onSurface focus:outline-none 
         focus:bg-primary/12 focus:border-primary px-3 text-sm font-medium border disabled:border-onSurface/12 disabled:text-onSurface/38`} disabled={isDisable}>
         {label}
      </button>
   );
};