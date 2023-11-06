import { createContext, useState } from "react";

/** @type {import("react").Context} */
export const ThemeContext = createContext({});

/**
 * Provider in charge of choose the them to use
 * @param {object} props 
 * @param {import("react").ReactElement} props.children 
 * @returns
 */
export const ThemeProvider = ({ children }) => {
   /** @type {[boolean, import("react").Dispatch<import("react").SetStateAction<boolean>>]} */
   const [isDark, setIsDark] = useState(localStorage.getItem("theme") === "dark" || 
      (!("theme" in localStorage) && globalThis.matchMedia?.("(prefers-color-scheme: dark)").matches));

   return (
      <ThemeContext.Provider value={{
         isDark,
         setIsDark
      }}>
         {children}
      </ThemeContext.Provider>
   );
};