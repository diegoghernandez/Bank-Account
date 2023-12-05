import { AddIcon } from "../../../assets/add";

const BASE_BUTTON_CLASSES = "flex flex-row justify-center items-center cursor-pointer w-fit h-14 rounded-2xl shadow transition md:w-14 md:shadow-none md:hover:shadow";

/**
 * ```text
 * Floating Action Button (FAB) to be used when you want to do an action to do something.
 * Have two styles depending on the viewport 
 * ```
 * @param {object} props
 * @param {string} props.label The text to be displayed by the component
 * @param {() => void} [props.handleClick] The function to be executed on click
 * @returns 
 */
export const Fab = ({ label, handleClick }) => {
   return (
      <div className="flex flex-col gap-1 items-center">
         <div className={`fixed bottom-[6.5rem] right-4 md:static ${BASE_BUTTON_CLASSES} bg-primary-container dark:bg-primary-container-dark`}>
            <button 
               onClick={handleClick}
               className={`${BASE_BUTTON_CLASSES} gap-2 px-3 hover:bg-onPrimary-container/8 focus:bg-onPrimary-container/12
                  hover:dark:bg-onPrimary-container-dark/8 focus:dark:bg-onPrimary-container-dark/12 focus:outline-none`}
            >
               <AddIcon fillClass={"fill-onPrimary-container dark:fill-onPrimary-container-dark"} />
               <span className="text-onPrimary-container dark:text-onPrimary-container-dark text-sm font-sans font-medium md:hidden">{label}</span>
            </button>
         </div>
         <span className="hidden w-14 text-onPrimary-container dark:text-onPrimary-container-dark text-xs font-sans font-medium text-center md:inline"
         >{label}</span>
      </div>
   );
};