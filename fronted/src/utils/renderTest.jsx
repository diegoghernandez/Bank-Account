import { render } from "@testing-library/react";
import { AuthProvider } from "../hooks/useAuth";
import { BrowserRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";

export const customRender = (ui) => {
   return render(
      <HelmetProvider>
         <AuthProvider>{ui}</AuthProvider>
      </HelmetProvider>,
      {wrapper: BrowserRouter});
};