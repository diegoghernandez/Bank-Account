import { render } from "@testing-library/react";
import { AuthProvider } from "../hooks/useAuth";
import { BrowserRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { vi } from "vitest";

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
         <AuthProvider>{ui}</AuthProvider>
      </HelmetProvider>,
      {wrapper: BrowserRouter});
};