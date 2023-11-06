import { useContext } from "react";
import { ThemeContext } from "../context/theme";

/**
 * Change the tailwind class dark to change the theme to use
 * @returns
 */
export const useTheme = () => {
   /** @type {{ isDark: boolean, setIsDark: import("react").Dispatch<import("react").SetStateAction<boolean>> }} */
   const { isDark, setIsDark } = useContext(ThemeContext);

   if (isDark) {
      localStorage.setItem("theme", "dark");
      document.documentElement.classList.add("dark");
   } else {
      localStorage.setItem("theme", "light");
      document.documentElement.classList.remove("dark");
   }

   return { isDark, setIsDark };
};