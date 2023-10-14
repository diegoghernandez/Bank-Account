import { createContext, useState } from "react";

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
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