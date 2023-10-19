import { describe, expect, it, vi } from "vitest";
import { customRender } from "../../utils/renderTest";
import userEvent from "@testing-library/user-event";
import { waitFor } from "@testing-library/dom";
import { Traduction } from "../../constants/Traduction";
import { getTraduction } from "../../utils/getTraduction";
import * as auth from "../../pages/_services/auth";
import { SignUp } from "../../pages/SignUp";

describe("Sign Up page tests", () => {
   it("Should render Automation page correctly", () => {  
      const { 
         header,
         nameInput,
         emailInput,
         passwordInput,
         confirmationInput,
         acceptButton 
      } = getElements();

      expect(header).toBeInTheDocument();
      expect(nameInput).toBeInTheDocument();
      expect(emailInput).toBeInTheDocument();
      expect(passwordInput).toBeInTheDocument();
      expect(confirmationInput).toBeInTheDocument();
      expect(acceptButton).toBeInTheDocument();
   });

   describe("After clicking", () => {
      it("Should show an error if there is a problem with a value", async () => {
         const { user, spyRegister, nameInput, emailInput, passwordInput, confirmationInput, acceptButton } = getElements();

         await user.type(nameInput, "Name");
         await user.type(emailInput, "wrong@email.com");
         await user.type(passwordInput, "W0rng PAsswrOd");
         await user.type(confirmationInput, "W0rng PAsswrOd");

         await user.click(acceptButton);

         await waitFor(() => {
            expect(spyRegister).toHaveBeenCalledTimes(1);
            expect(spyRegister).toHaveBeenLastCalledWith({
               name: "Name",
               email: "wrong@email.com",
               matchingPassword: "W0rng PAsswrOd",
               password: "W0rng PAsswrOd",
            });
         });

         await waitFor(() => {
            expect(nameInput).toBeInvalid();
            expect(nameInput).toHaveAccessibleDescription("Simple, wrong name,");
            expect(emailInput).toBeInvalid();
            expect(emailInput).toHaveAccessibleDescription("Wrong email");
            expect(passwordInput).toBeInvalid();
            expect(passwordInput).toHaveAccessibleDescription("Bad password");
            expect(confirmationInput).toBeInvalid();
            expect(confirmationInput).toHaveAccessibleDescription("Bad confirmation");
         });
      });

      it("Should accept the given values", async () => {
         const { page, user, spyRegister, nameInput, emailInput, passwordInput, confirmationInput, acceptButton } = getElements();

         await user.type(nameInput, "Success");
         await user.type(emailInput, "user@user.com");
         await user.type(passwordInput, "1234");
         await user.type(confirmationInput, "1234");

         await user.click(acceptButton);

         await waitFor(() => {
            expect(spyRegister).toHaveBeenCalledTimes(1);
            expect(spyRegister).toHaveBeenLastCalledWith({
               name: "Success",
               email: "user@user.com",
               matchingPassword: "1234",
               password: "1234",
            });
         });

         await waitFor(() => expect(page.getByText("Account created successfully")).toBeInTheDocument());
      });
   });
});

const getElements = () => {
   const page = customRender(<SignUp />);
   const user = userEvent.setup();
   const spyRegister = vi.spyOn(auth, "register");
   const t = getTraduction(Traduction.SIGN_UP_PAGE);

   const header = page.getByRole("heading");
   const nameInput = page.getByLabelText(t.labels[0]);
   const emailInput = page.getByLabelText(t.labels[1]);
   const passwordInput = page.getByLabelText(t.labels[2]);
   const confirmationInput = page.getByLabelText(t.labels[3]);
   const acceptButton = page.getByRole("button", { name: t.accept });

   return {
      page,
      user,
      spyRegister,
      header, 
      nameInput,
      emailInput,
      passwordInput,
      confirmationInput,
      acceptButton
   };
};