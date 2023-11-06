import { useEffect, useRef, useState } from "react";

/**
 * The component to show multiple elements to choose under the component
 * @param {object} props
 * @param {string} [props.menuClasses] The classes to adapt the menu styles
 * @param {Array<string>} props.parameters The array with all parameters
 * @param {import("react").Dispatch<import("react").SetStateAction<String>>} props.setValue
 * The value to set the value of Text Field component
 * @param {() => void} props.handleClickOutside The array with all parameters
 * @returns 
 */
export const Menu = ({ 
   menuClasses = "w-full",
   parameters,
   setValue,
   handleClickOutside

}) => {
   /** @type {[number, import("react").Dispatch<import("react").SetStateAction<Number>>]} */
   const [element, setElement] = useState(-1);
   /** @type {import("react").MutableRefObject<HTMLUListElement>} */
   const listRef = useRef(null);

   /** @type {HTMLCollectionOf<HTMLLIElement>} */
   const options = listRef?.current?.getElementsByTagName("li");
   options?.[element]?.focus();

   /**
    * Stop of show the menu element
    */
   const exit = () => {
      listRef?.current?.blur();
      handleClickOutside();

   };
   
   if (parameters.length - 1 < element || element === -2) {
      exit();
   }
   
   /**
    * Handle two key to increase or decrease the element value
    * @param {KeyboardEvent} e The key to handle
    */
   const handleKeys = (e) => {
      if (e.key == "ArrowDown") {
         setElement((prev) => prev + 1);
      } else if (e.key == "ArrowUp") {
         setElement((prev) => prev - 1);
      }
   };

   useEffect(() => {
      globalThis.addEventListener("keydown", handleKeys);
   
      return () => {
         globalThis.removeEventListener("keydown", handleKeys);
      };
   }, [setElement]);
   

   return (
      <ul
         ref={listRef}
         tabIndex={-1}
         role="menu" 
         className={`absolute ${menuClasses} z-20 translate-y-[3.7rem] flex flex-col bg-surface-container bg rounded dark:bg-surface-container-dark`}
      >
         {parameters.map((type, index) => (
            <li 
               key={type} 
               className="hover:bg-onSurface/8 focus:outline-none focus:bg-onSurface/12 flex items-center w-auto min-h-[3rem] px-3 text-onSurface 
                  text-sm font-sans font-medium dark:text-onSurface-dark dark:hover:bg-onSurface-dark/8 dark:focus:bg-onSurface-dark/12"
               tabIndex={(index === element) ? 0 : -1}
               role="menuitem"
               onClick={() => { 
                  setValue(type); 
                  handleClickOutside();
               }}
               onKeyDown={(e) => {
                  if (e.key === "Enter") {
                     setValue(type);
                     handleClickOutside();
                  }
                  if (e.key === "Tab") {
                     handleClickOutside();
                  }
               }}
            >
               {type}
            </li>
         ))}
      </ul>
   );
};
