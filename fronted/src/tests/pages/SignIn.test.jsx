import { fireEvent, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { expect, vi } from "vitest";
import { SignIn } from "../../pages/SignIn";
import * as auth from "../../pages/_services/auth";
import { customRender } from "../../utils/renderTest";

describe("SignIn page tests", () => {
   it("Should render SignIn page correctly", () => {  
      const page = customRender(<SignIn />);

      page.getByRole("heading");
      page.getByLabelText("Email");
      page.getByLabelText("Password");
      page.getByRole("button", { name: "Sign In" });
      page.getByRole("button", { name: "Use demo account" });
   });

   describe("After click in  use demo", () => {
      it("Should render the modal text correctly", () => {
         const page = customRender(<SignIn />);
   
         fireEvent.click(page.getByRole("button", { name: "Use demo account"}));

         const dialogElement = page.getByRole("dialog", { hidden: true });
   
         expect(within(dialogElement).getByText(/You will have certain limitations:./)).toBeInTheDocument();
         expect(within(dialogElement).getByRole("button", { name: "Cancel", hidden: true })).toBeInTheDocument();
         expect(within(dialogElement).getByRole("button", { name: "Accept", hidden: true })).toBeInTheDocument();
      });

      it("Should sign in one of the demo user", async () => {
         const page = customRender(<SignIn />);
         const spyLogin = vi.spyOn(auth, "login");
         
         fireEvent.click(page.getByRole("button", { name: "Use demo account"}));
         const dialogElement = page.getByRole("dialog", { hidden: true });
         fireEvent.click(within(dialogElement).getByRole("button", { name: "Accept", hidden: true }));

         await waitFor(() => {
            expect(spyLogin).toHaveBeenCalledTimes(1);
            expect(spyLogin).toHaveBeenCalledWith(expect.stringMatching(/demo[1-2]@example.names.example/), "123456");
         });
      });
   });

   describe("After click in sign in", () => {
      it("If the credentials are wrong, should show the following error", async () => {
         const page = customRender(<SignIn />);
         const user = userEvent.setup();
         const spyLogin = vi.spyOn(auth, "login");

         const emailInput = page.getByLabelText("Email");
         const passwordInput = page.getByLabelText("Password");
         const button = page.getByRole("button", { name: "Sign In" });

         await user.type(emailInput, "error@user.com");
         await user.type(passwordInput, "1234");

         await user.click(button);

         await waitFor(() => {
            expect(spyLogin).toHaveBeenCalledTimes(1);
            expect(spyLogin).toHaveBeenLastCalledWith("error@user.com", "1234");
         });

         await waitFor(() => {
            expect(passwordInput).toHaveAccessibleDescription("Incorrect authentication credentials");
            expect(emailInput).toHaveAccessibleDescription("Incorrect authentication credentials");
         });
      });

      it("If the credentials are good, shouldn't show the following error", async () => {
         const page = customRender(<SignIn />);
         const user = userEvent.setup();
         const spyLogin = vi.spyOn(auth, "login");

         const emailInput = page.getByLabelText("Email");
         const passwordInput = page.getByLabelText("Password");
         const button = page.getByRole("button", { name: "Sign In" });

         await user.type(emailInput, "user@user.com");
         await user.type(passwordInput, "1234");

         await user.click(button);

         setTimeout(async () => {
            await waitFor(() => {
               expect(spyLogin).toHaveBeenCalledTimes(1);
               expect(spyLogin).toHaveBeenCalledWith("user@user.com", "1234");
            });
         }, 900);

         await waitFor(() => {
            expect(passwordInput).not.toHaveAccessibleDescription("Incorrect authentication credentials");
            expect(emailInput).not.toHaveAccessibleDescription("Incorrect authentication credentials");
         });
      });
   });
});