import { describe, expect, it, vi } from "vitest";
import { customRender } from "../../utils/renderTest";
import { Account } from "../../pages/Account";
import userEvent from "@testing-library/user-event";
import { waitFor } from "@testing-library/dom";
import * as auth from "../../pages/_services/auth";

describe("Account page tests", () =>  {
   it("Should render Account page correctly", async () =>  {
      const page = customRender(<Account />);

      page.getByRole("heading", { level: 1 });
      page.getByText(/^Account Number:\s\d+$/);      
      page.getByText("Dark Mode");      
      page.getByRole("button", { name: "Change name" });
      page.getByRole("button", { name: "Change password" });
      page.getByRole("button", { name: "Change email" });
      page.getByRole("button", { name: "Logout" });
      page.getByRole("heading", { level: 2 });
   });

   describe("After click change language", () => {
      it("Should render correctly", async () => {
         const page = customRender(<Account />);
         const user = userEvent.setup();

         await user.click(page.getByRole("button", { name: "Change language" }));

         page.getByRole("heading", { name: "Logout", level: 2, hidden: true });
         page.getByText("Do you want to change to spanish?");
         page.getAllByRole("button", { name: "Cancel", hidden: true })[0];
         page.getAllByRole("button", { name: "Accept", hidden: true })[0];
      });

      it("Should render correctly", async () => {
         const page = customRender(<Account />);
         const user = userEvent.setup();
         const spyLocalStorage = vi.spyOn(globalThis.localStorage, "getItem");

         await user.click(page.getByRole("button", { name: "Logout" }));
         await user.click(page.getAllByRole("button", { name: "Accept", hidden: true })[0]);

         await waitFor(() => {
            expect(spyLocalStorage).toBeCalledTimes(1);
            expect(spyLocalStorage).toHaveBeenCalledWith("language");
            expect(localStorage.state).toContain({ language: "es" });
         });
      });
   });

   describe("After click change name", () => {
      it("Should show an error if the password is not correct", async () => {
         const page = customRender(<Account />);
         const user = userEvent.setup();
         const spyChangeName = vi.spyOn(auth, "changeName");
         
         await user.click(page.getByRole("button", { name: "Change name" }));
         const newNameInput = page.getByLabelText("New name");
         const passwordInput = page.getAllByLabelText("Password")[0];
   
         await user.type(newNameInput, "Hello");
         await user.type(passwordInput, "test");
   
         await user.click(page.getAllByRole("button", { name: "Accept", hidden: true })[1]);
   
         await waitFor(() => {
            expect(spyChangeName).toBeCalledTimes(1);
            expect(spyChangeName).toHaveBeenCalledWith("Hello", "test");
            expect(passwordInput).toHaveAccessibleDescription("Invalid password");
         });
      });

      it("Should accept the given values", async () => {
         const page = customRender(<Account />);
         const user = userEvent.setup();
         const spyChangeName = vi.spyOn(auth, "changeName");
         
         await user.click(page.getByRole("button", { name: "Change name" }));
   
         await user.type(page.getByLabelText("New name"), "Hello");
         await user.type(page.getAllByLabelText("Password")[0], "1234");
   
         await user.click(page.getAllByRole("button", { name: "Accept", hidden: true })[1]);
   
         await waitFor(() => {
            expect(spyChangeName).toBeCalledTimes(1);
            expect(spyChangeName).toHaveBeenCalledWith("Hello", "1234");
            page.getAllByText("Change name successfully");
         });
      });
   });

   describe("After click change password", () => {
      it("Should show an error if the old password is not correct", async () => {
         const page = customRender(<Account />);
         const user = userEvent.setup();
         const spyChangeName = vi.spyOn(auth, "changePassword");
         
         await user.click(page.getByRole("button", { name: "Change password" }));
         const oldPasswordInput = page.getByLabelText("Old password");
         const newPasswordInput = page.getByLabelText("New password");
   
         await user.type(oldPasswordInput, "Hello");
         await user.type(newPasswordInput, "test");
   
         await user.click(page.getAllByRole("button", { name: "Accept", hidden: true })[2]);
   
         await waitFor(() => {
            expect(spyChangeName).toBeCalledTimes(1);
            expect(spyChangeName).toHaveBeenCalledWith("Hello", "test");
            expect(oldPasswordInput).toHaveAccessibleDescription("Invalid old password");
         });
      });

      it("Should accept the given values", async () => {
         const page = customRender(<Account />);
         const user = userEvent.setup();
         const spyChangeName = vi.spyOn(auth, "changePassword");
         
         await user.click(page.getByRole("button", { name: "Change password" }));
   
         await user.type(page.getByLabelText("Old password"), "oldPass");
         await user.type(page.getByLabelText("New password"), "NEW1234");
   
         await user.click(page.getAllByRole("button", { name: "Accept", hidden: true })[2]);
   
         await waitFor(() => {
            expect(spyChangeName).toBeCalledTimes(1);
            expect(spyChangeName).toHaveBeenCalledWith("oldPass", "NEW1234");
            page.getAllByText("Change password successfully");
         });
      });
   });

   describe("After click change email", () => {
      it("Should show an error if the password is not correct", async () => {
         const page = customRender(<Account />);
         const user = userEvent.setup();
         const spyChangeName = vi.spyOn(auth, "changeEmail");
         
         await user.click(page.getByRole("button", { name: "Change email" }));
         const newNameInput = page.getByLabelText("New email");
         const passwordInput = page.getAllByLabelText("Password")[1];
   
         await user.type(newNameInput, "error@names.com");
         await user.type(passwordInput, "1234");
   
         await user.click(page.getAllByRole("button", { name: "Accept", hidden: true })[3]);
   
         await waitFor(() => {
            expect(spyChangeName).toBeCalledTimes(1);
            expect(spyChangeName).toHaveBeenCalledWith("error@names.com", "1234");
            expect(passwordInput).toHaveAccessibleDescription("Invalid password");
         });
      });

      it("Should accept the given values", async () => {
         const page = customRender(<Account />);
         const user = userEvent.setup();
         const spyChangeName = vi.spyOn(auth, "changeEmail");
         
         await user.click(page.getByRole("button", { name: "Change email" }));
   
         await user.type(page.getByLabelText("New email"), "test@names.com");
         await user.type(page.getAllByLabelText("Password")[1], "1234");
   
         await user.click(page.getAllByRole("button", { name: "Accept", hidden: true })[3]);
   
         await waitFor(() => {
            expect(spyChangeName).toBeCalledTimes(1);
            expect(spyChangeName).toHaveBeenCalledWith("test@names.com", "1234");
            page.getAllByText("Change email successfully");
         });
      });
   });

   describe("After click logout", () => {
      it("Should render correctly", async () => {
         const page = customRender(<Account />);
         const user = userEvent.setup();

         await user.click(page.getByRole("button", { name: "Logout" }));

         page.getByRole("heading", { name: "Logout", level: 2, hidden: true });
         page.getByText("Do you want to close session?");
         page.getAllByRole("button", { name: "Cancel", hidden: true })[4];
         page.getAllByRole("button", { name: "Accept", hidden: true })[4];
      });

      it("Should render correctly", async () => {
         const page = customRender(<Account />);
         const user = userEvent.setup();
         const spyLocalStorage = vi.spyOn(globalThis.localStorage, "removeItem");

         await user.click(page.getByRole("button", { name: "Logout" }));
         await user.click(page.getAllByRole("button", { name: "Accept", hidden: true })[4]);

         await waitFor(() => {
            expect(spyLocalStorage).toBeCalledTimes(2);
            expect(spyLocalStorage).toHaveBeenCalledWith("account");
            expect(spyLocalStorage).toHaveBeenCalledWith("token");
         });
      });
   });
});