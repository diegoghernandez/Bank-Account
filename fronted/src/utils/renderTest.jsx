import { render } from "@testing-library/react";
import { AuthProvider } from "../context/auth";
import { BrowserRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { ThemeProvider } from "../context/theme";

export const customRender = (ui) => {
   return render(
      <HelmetProvider>
         <AuthProvider>
            <ThemeProvider>
               {ui}
            </ThemeProvider>
         </AuthProvider>
      </HelmetProvider>,
      {wrapper: BrowserRouter});
};