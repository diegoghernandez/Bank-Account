import { useEffect, useRef } from "react";

/**
 * Check when the click is outside of the referenced element 
 * @param {() => void} callback Function to be executed
 * @returns 
 */
export const useOutsideClick = (callback) => {
   /** @type {import("react").MutableRefObject} */
   const ref = useRef();
   
   useEffect(() => {
      /**
       * Check where the click happen
       * @param {Event} event 
       */
      const handleClick = (event) => {
         if (ref.current && !ref.current.contains(event.target)) {
            callback();
         }
      };
   
      document.addEventListener("click", handleClick, true);
      
      return () => {
         document.removeEventListener("click", handleClick, true);
      };
   }, [ref]);
   
   return ref;
};