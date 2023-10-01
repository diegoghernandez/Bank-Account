const BASE_BUTTON_CLASSES = "flex flex-row justify-center items-center cursor-pointer w-fit h-14 rounded-2xl shadow md:shadow-none md:hover:shadow";

export const Fab = ({ label }) => {
   return (
      <div type="div" className={`fixed bottom-24 right-4 md:static md:mt-3  ${BASE_BUTTON_CLASSES} bg-primary-container`}>
         <div className={`${BASE_BUTTON_CLASSES} gap-2 px-3 group-hover/fab:bg-onPrimary-container/8 group-focus/fab:bg-onPrimary-container/12`}>
            <svg className="fill-onPrimary-container" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
               <rect width="24" height="24" fill="none"/>
               <path d="M11 19V13H5V11H11V5H13V11H19V13H13V19H11Z"/>
            </svg>
            <span className="text-onPrimary-container text-sm font-sans font-medium">{label}</span>
         </div>
      </div>
   );
};