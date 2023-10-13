import { useContext } from "react";
import { ThemeContext } from "../context/theme";

export const useTheme = () => {
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