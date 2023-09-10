import { cleanup, fireEvent, render, waitFor } from "@testing-library/react";
import { SignIn } from "../../pages/SignIn/SignIn";
import { AuthProvider } from "../../hooks/useAuth";
import { BrowserRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import { vi } from "vitest";
import { StatusError } from "../../errors/StatusError";
import * as auth from "../../pages/_services/auth";

const customRender = (ui) => {
   return render(<AuthProvider>{ui}</AuthProvider>, {wrapper: BrowserRouter})
};

/* vi.mock("../_services/auth", () => ({
   login: vi.fn((email, password) => {
      if (email == "error@user.com") {
         return Promise.reject(new StatusError("Incorrect authentication credentials"))
      }
   })
})); */

/* auth.login = vi.fn().mockRejectedValue(new StatusError("Incorrect authentication credentials")) */

describe("SignIn page tests", () => {
   it("Should render SignIn page correctly", () => {  
      const page = customRender(<SignIn />);

      page.getByRole("heading");
      page.getByLabelText("Email");
      page.getByLabelText("Password");
      page.getByRole("button");
   });

   describe("After clicking", () => {
      it("If some value is not passed, should show the following text", async () => { 
         const page = customRender(<SignIn />);
         const button = page.getByRole("button");

         fireEvent.click(button);
   
         await waitFor(() => {
            expect(page.getByLabelText("Password")).toHaveAccessibleErrorMessage("Must not be empty");
            expect(page.getByLabelText("Email")).toHaveAccessibleErrorMessage("Must not be empty");
         });
      });

      it("If the credentials are wrong, should show the following text", async () => {
         const page = customRender(<SignIn />);
         const user = userEvent.setup();
         const spyLogin = vi.spyOn(auth, "login");

         const button = page.getByRole("button");
         const emailInput = page.getByLabelText("Email");
         const passwordInput = page.getByLabelText("Password");

         await user.type(emailInput, "error@user.com");
         await user.type(passwordInput, "1234");

         await user.click(button);

         await waitFor(() => {
            expect(spyLogin).toHaveBeenCalledTimes(1);
         });

         await waitFor(() => {
            expect(passwordInput).toHaveAccessibleErrorMessage("Incorrect authentication credentials");
            expect(emailInput).toHaveAccessibleErrorMessage("Incorrect authentication credentials");
         });
      });

      /* it("If the credentials are good, should show the following text", async () => {
         const user = userEvent.setup();
         const emailInput = page.getByLabelText("Email");
         const passwordInput = page.getByLabelText("Password");

         await user.type(emailInput, "user@user.com");
         await user.type(passwordInput, "1234");

         await user.click(button);

         await waitFor(() => {
            expect(auth.login).toHaveBeenCalledTimes(1);
         });
         
         await waitFor(() => {
            page.getByText("Incorrect authentication credentials");
         });
         expect(page.getByText('Incorrect authentication credentials')).toBeInTheDocument();
      }); */
   });
});