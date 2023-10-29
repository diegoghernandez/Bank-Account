import userEvent from "@testing-library/user-event";
import { Traduction } from "../../constants/Traduction";
import { SavePassword } from "../../pages/SavePassword";
import { getTraduction } from "../../utils/getTraduction";
import { customRender } from "../../utils/renderTest";
import { waitFor, within } from "@testing-library/dom";
import { vi } from "vitest";
import * as auth from "../../pages/_services/auth";

const t = getTraduction(Traduction.SAVE_PASSWORD);

const mocks = vi.hoisted(() => {
   return {
      useSearchParams: vi.fn(),
   };
});

vi.mock("react-router-dom", async () => {
   const actual = await vi.importActual("react-router-dom");
   return {
      ...actual,
      useSearchParams: mocks.useSearchParams,
   };
});

describe("Save password page tests", () => {
   it("Should render SignIn page correctly", () => {  
      mocks.useSearchParams.mockReturnValue([new URLSearchParams({ 
         id: 45325324,
         token: "er143ge8-9b58-41ae-8723-29d7ff675a30",
         traduction: "TOKEN_REGISTER"
      })]);
      const page = customRender(<SavePassword />);

      page.getByRole("heading");
      page.getByLabelText(t.labels[0]);
      page.getByLabelText(t.labels[1]);
      page.getByRole("button");
   });

   describe("After clicking", () => {
      it("If the credentials are wrong, should show the following error", async () => {
         mocks.useSearchParams.mockReturnValue([new URLSearchParams({ 
            id: 45325324,
            token: "er143ge8-9b58-41ae-8723-29d7ff675a30",
            traduction: "TOKEN_REGISTER"
         })]);
         const page = customRender(<SavePassword />);
         const user = userEvent.setup();

         const button = page.getByRole("button");
         const passwordInput = page.getByLabelText(t.labels[0]);
         const confirmationInput = page.getByLabelText(t.labels[1]);

         await user.type(passwordInput, "1234");
         await user.type(confirmationInput, "23542");

         await user.click(button);

         await waitFor(() => {
            expect(passwordInput).toHaveAccessibleDescription(t.error);
            expect(confirmationInput).toHaveAccessibleDescription(t.error);
         });
      });

      it("should show the following message if the credentials are good and the token is invalid", async () => {
         mocks.useSearchParams.mockReturnValue([new URLSearchParams({ 
            id: 45325324,
            token: "grs34262",
            traduction: "TOKEN_REGISTER"
         })]);
         const page = customRender(<SavePassword />);
         const user = userEvent.setup();
         const spySavePassword = vi.spyOn(auth, "savePassword");

         const button = page.getByRole("button");
         const passwordInput = page.getByLabelText(t.labels[0]);
         const confirmationInput = page.getByLabelText(t.labels[1]);

         await user.type(passwordInput, "1234");
         await user.type(confirmationInput, "1234");

         await user.click(button);

         await waitFor(() => {
            expect(spySavePassword).toHaveBeenCalledTimes(1);
            expect(spySavePassword).toHaveBeenLastCalledWith("grs34262", {
               idAccount: "45325324",
               newPassword: "1234",
               oldPassword: "1234"
            });
         });

         const messageDialog = page.getByRole("dialog", { hidden: true });

         await waitFor(() => {
            expect(within(messageDialog).getByRole("heading", { name: t.modal.title[1], hidden: true })).toBeInTheDocument();
            expect(within(messageDialog).getByText(t.modal.description.invalid)).toBeInTheDocument();
         });
      });

      it("should show the following message if the credentials are good and the token is expired", async () => {
         mocks.useSearchParams.mockReturnValue([new URLSearchParams({ 
            id: 45325324,
            token: "nu3v3-9b58-41ae-8723-29d7ff675a30",
            traduction: "TOKEN_REGISTER"
         })]);
         const page = customRender(<SavePassword />);
         const user = userEvent.setup();
         const spySavePassword = vi.spyOn(auth, "savePassword");

         const button = page.getByRole("button");
         const passwordInput = page.getByLabelText(t.labels[0]);
         const confirmationInput = page.getByLabelText(t.labels[1]);

         await user.type(passwordInput, "1234");
         await user.type(confirmationInput, "1234");

         await user.click(button);

         await waitFor(() => {
            expect(spySavePassword).toHaveBeenCalledTimes(1);
            expect(spySavePassword).toHaveBeenLastCalledWith("nu3v3-9b58-41ae-8723-29d7ff675a30", {
               idAccount: "45325324",
               newPassword: "1234",
               oldPassword: "1234"
            });
         });

         const messageDialog = page.getByRole("dialog", { hidden: true });

         await waitFor(() => {
            expect(within(messageDialog).getByRole("heading", { name: t.modal.title[1], hidden: true })).toBeInTheDocument();
            expect(within(messageDialog).getByText(/Expire token.*Click the accept button to resend the token/)).toBeInTheDocument();
            expect(within(messageDialog).getByRole("button", { name: "Accept", hidden: true })).toBeInTheDocument();
         });
      });

      it("should show the following message if the credentials are good and the token is valid", async () => {
         mocks.useSearchParams.mockReturnValue([new URLSearchParams({ 
            id: 45325324,
            token: "er143ge8-9b58-41ae-8723-29d7ff675a30",
            traduction: "TOKEN_REGISTER"
         })]);
         const page = customRender(<SavePassword />);
         const user = userEvent.setup();
         const spySavePassword = vi.spyOn(auth, "savePassword");

         const button = page.getByRole("button");
         const passwordInput = page.getByLabelText(t.labels[0]);
         const confirmationInput = page.getByLabelText(t.labels[1]);

         await user.type(passwordInput, "1234");
         await user.type(confirmationInput, "1234");

         await user.click(button);

         await waitFor(() => {
            expect(spySavePassword).toHaveBeenCalledTimes(1);
            expect(spySavePassword).toHaveBeenLastCalledWith("er143ge8-9b58-41ae-8723-29d7ff675a30", {
               idAccount: "45325324",
               newPassword: "1234",
               oldPassword: "1234"
            });
         });

         const messageDialog = page.getByRole("dialog", { hidden: true });

         await waitFor(() => {
            expect(within(messageDialog).getByRole("heading", { name: t.modal.title[0], hidden: true })).toBeInTheDocument();
            expect(within(messageDialog).getByText(t.modal.description.valid)).toBeInTheDocument();
            expect(within(messageDialog).getByRole("button", { name: "Accept", hidden: true })).toBeInTheDocument();
         });
      });
   });
});