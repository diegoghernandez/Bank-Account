import userEvent from "@testing-library/user-event";
import { Traduction } from "../../constants/Traduction";
import { SavePassword } from "../../pages/SavePassword";
import { getTraduction } from "../../utils/getTraduction";
import { customRender } from "../../utils/renderTest";
import { waitFor } from "@testing-library/dom";
import { vi } from "vitest";
import * as auth from "../../pages/_services/auth";

const t = getTraduction(Traduction.SAVE_PASSWORD);

vi.mock("react-router-dom", async () => {
   const actual = await vi.importActual("react-router-dom");
   return {
      ...actual,
      useSearchParams: () => [new URLSearchParams({ 
         id: 45325324 ,
         token: "er143ge8-9b58-41ae-8723-29d7ff675a30"
      })],
   };
});

describe("Save password page tests", () => {
   it("Should render SignIn page correctly", () => {  
      const page = customRender(<SavePassword />);

      page.getByRole("heading");
      page.getByLabelText(t.labels[0]);
      page.getByLabelText(t.labels[1]);
      page.getByRole("button");
   });

   describe("After clicking", () => {
      it("If the credentials are wrong, should show the following error", async () => {
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

      it("If the credentials are good, shouldn't show the following error", async () => {
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

         await waitFor(() => {
            expect(page.getByRole("heading", { name: "Success", hidden: true })).toBeInTheDocument();
            expect(page.getByText("Message to show")).toBeInTheDocument();
         });
      });
   });
});