const BASE_BUTTON_CLASSES =
   "flex flex-col justify-center items-center h-10 w-auto rounded-3xl w-full";

export const Filled = ({
      label,
      isDisable
   }) => {
   return (
      <div className={`${BASE_BUTTON_CLASSES} ${(isDisable) ? "bg-onSurface/12" : "bg-primary"} `}>
         <button className={`${BASE_BUTTON_CLASSES} bg-primary px-3 text-sm font-medium text-onPrimary hover:bg-onPrimary/8 focus:bg-onPrimary/12 focus:outline-none 
            disabled:bg-onSurface/12 disabled:text-onSurface/38`} disabled={isDisable}>
            {label}
         </button>
      </div>
   );
};