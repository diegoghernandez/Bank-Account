import { AddIcon } from "../../../assets/add";

const BASE_BUTTON_CLASSES = "flex flex-row justify-center items-center cursor-pointer w-fit h-14 rounded-2xl shadow md:w-14 md:shadow-none md:hover:shadow";

/**
 * ```text
 * Floating Action Button (FAB) to be used when you want to do an action to do something.
 * Have two styles depending on the viewport 
 * ```
 * @param {object} props
 * @param {string} props.label The text to be displayed by the component
 * @returns 
 */
export const Fab = ({ label }) => {
   return (
      <div className="flex flex-col gap-1 items-center">
         <div className={`fixed bottom-[6.5rem] right-4 md:static ${BASE_BUTTON_CLASSES} bg-primary-container dark:bg-primary-container-dark`}>
            <div className={`${BASE_BUTTON_CLASSES} gap-2 px-3 group-hover/fab:bg-onPrimary-container/8 group-focus/fab:bg-onPrimary-container/12
               group-hover/fab:dark:bg-onPrimary-container-dark/8 group-focus/fab:dark:bg-onPrimary-container-dark/12`}>
               <AddIcon fillClass={"fill-onPrimary-container dark:fill-onPrimary-container-dark"} />
               <span hidden={globalThis.matchMedia?.("(min-width: 768px)").matches} 
                  className="text-onPrimary-container dark:text-onPrimary-container-dark text-sm font-sans font-medium">{label}</span>
            </div>
         </div>
         <span hidden={!globalThis.matchMedia?.("(min-width: 768px)").matches} 
            className="w-14 text-onPrimary-container dark:text-onPrimary-container-dark text-xs font-sans font-medium text-center md:inline">{label}</span>
      </div>
   );
};