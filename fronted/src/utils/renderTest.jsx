import { render } from "@testing-library/react";
import { AuthProvider } from "../context/auth";
import { BrowserRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { vi } from "vitest";
import { ThemeProvider } from "../context/theme";

vi.mock("react-router-dom", async () => {
   const actual = await vi.importActual("react-router-dom");

   return {
      ...actual,
      useLocation: vi.fn().mockReturnValue({
         state: {
            automation: {
               idAutomation: 4234,
               name: "New automation",
               amount: 2000.00,
               idTransferAccount: 419670285,
               hoursToNextExecution: 6,
               executionTime: "2023-07-15T17:51:36.986827",
               status: true
            }
         }
      })
   };
});

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