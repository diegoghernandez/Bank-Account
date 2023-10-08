const BASE_BUTTON_CLASSES =
   "flex flex-col justify-center items-center h-10 rounded-3xl w-full";

export const Outline = ({ 
      label,
      isDisable
   }) => {

   const hover = (isDisable) ? "" : "group-hover/outline:bg-primary/8";

   return (
      <span 
         disabled={isDisable}
         className={`${BASE_BUTTON_CLASSES} ${hover} text-primary border-onSurface group-focus/outline:bg-primary/12 
         group-focus/outline:border-primary px-3 text-sm font-medium border disabled:border-onSurface/12 disabled:text-onSurface/38`}>
         {label}
      </span>
   );
};