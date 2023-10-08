import { AddIcon } from "../../../assets/add";

const BASE_BUTTON_CLASSES = "flex flex-row justify-center items-center cursor-pointer w-fit h-14 rounded-2xl shadow md:w-14 md:shadow-none md:hover:shadow";

export const Fab = ({ label }) => {
   return (
      <div className="flex flex-col gap-1 items-center">
         <div className={`fixed bottom-[6.5rem] right-4 md:static ${BASE_BUTTON_CLASSES} bg-primary-container`}>
            <div className={`${BASE_BUTTON_CLASSES} gap-2 px-3 group-hover/fab:bg-onPrimary-container/8 group-focus/fab:bg-onPrimary-container/12`}>
               <AddIcon fillClass={"fill-onPrimary-container"} />
               <span hidden={globalThis.matchMedia?.("(min-width: 768px)").matches} className="text-onPrimary-container text-sm font-sans font-medium">{label}</span>
            </div>
         </div>
         <span hidden={!globalThis.matchMedia?.("(min-width: 768px)").matches} className="w-14 text-onPrimary-container text-xs font-sans font-medium text-center md:inline">{label}</span>
      </div>
   );
};