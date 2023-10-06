import { describe, it, vi } from "vitest";
import { customRender } from "../../utils/renderTest";
import { UpdateAutomation } from "../../pages/UpdateAutomation";
import userEvent from "@testing-library/user-event";
import * as automation from "../../pages/_services/automation";
import { Traduction } from "../../constants/Traduction";
import { getTraduction } from "../../utils/getTraduction";
import { waitFor } from "@testing-library/dom";

describe("Update Automation page tests", () => {
   it("Should render Automation page correctly", () => {
      const { 
         header,
         nameInput,
         amountInput,
         transferInput,
         supportiveTransfer,
         timeInput,
         statusSwitch,
         cancelButton,
         makeButton
      } = getElements();

      expect(header).toBeInTheDocument();
      expect(nameInput).toBeInTheDocument();
      expect(nameInput).toHaveValue("New automation");
      expect(amountInput).toBeInTheDocument();
      expect(amountInput).toHaveValue(2000);
      expect(transferInput).toBeInTheDocument();
      expect(transferInput).toHaveValue(419670285);
      expect(supportiveTransfer).toBeInTheDocument();
      expect(timeInput).toBeInTheDocument();
      expect(timeInput).toHaveValue("Each 6 hour(s)");
      expect(statusSwitch).toBeInTheDocument();
      expect(statusSwitch).toBeChecked();
      expect(makeButton).toBeInTheDocument();
      expect(cancelButton).toBeInTheDocument();
   });

   describe("After clicking", () => {
      it("Should show an error if there is a problem with a value", async () => {
         const { user, spyAutomation, makeButton, nameInput, amountInput, transferInput, timeInput, statusSwitch } = getElements();

         await user.clear(nameInput);
         await user.type(nameInput, "Name");

         await user.clear(amountInput, "124124");
         await user.type(amountInput, "124124");

         await user.clear(transferInput);
         await user.type(transferInput, "124124");

         await user.click(statusSwitch);

         await user.click(makeButton);

         await waitFor(() => {
            expect(spyAutomation).toHaveBeenCalledTimes(1);
            expect(spyAutomation).toHaveBeenLastCalledWith({
               "idAutomation": 4234,
               "idAccount": 238589851,
               "name": "Name",
               "amount": 124124,
               "idTransferAccount": 124124,
               "hoursToNextExecution": 6,
               "executionTime": "2023-07-15T17:51:36.986827",
               "status": false,
            });
         });

         await waitFor(() => {
            expect(nameInput).toHaveAccessibleDescription("Incorrect name");
            expect(amountInput).toHaveAccessibleDescription("Not enough balance");
            expect(transferInput).toHaveAccessibleDescription("Account not found");
            expect(timeInput).toHaveAccessibleDescription("So much hours");

            expect(statusSwitch).not.toBeChecked();
         });
      });

      it("Should accept the given values", async () => {
         const { page, user, spyAutomation, makeButton, nameInput, amountInput, transferInput, statusSwitch } = getElements(75648);

         await user.clear(nameInput);
         await user.type(nameInput, "Name");

         await user.clear(amountInput, "124124");
         await user.type(amountInput, "124124");

         await user.clear(transferInput);
         await user.type(transferInput, "534532");

         await user.click(statusSwitch);

         await user.click(makeButton);

         await waitFor(() => {
            expect(spyAutomation).toHaveBeenCalledTimes(1);
            expect(spyAutomation).toHaveBeenLastCalledWith({
               "idAutomation": 4234,
               "idAccount": 238589851,
               "name": "Name",
               "amount": 124124,
               "idTransferAccount": 534532,
               "hoursToNextExecution": 6,
               "executionTime": "2023-07-15T17:51:36.986827",
               "status": false,
            });
         });

         await waitFor(() => expect(page.getByText("Automation updated successfully")).toBeInTheDocument());
      });
   });
});

const getElements = () => {
   const page = customRender(<UpdateAutomation />);
   const user = userEvent.setup();
   const spyAutomation = vi.spyOn(automation, "updateAutomation");
   const t = getTraduction(Traduction.UPDATE_AUTOMATION_PAGE);

   const header = page.getByRole("heading");
   const nameInput = page.getByLabelText(t.labels[0]);
   const amountInput = page.getByLabelText(t.labels[1]);
   const transferInput = page.getByLabelText(t.labels[2]);
   const supportiveTransfer = page.getByText(t.description);
   const timeInput = page.getByLabelText(t.labels[3]);
   const statusSwitch = page.getByLabelText(t.labels[4]);
   const cancelButton = page.getByRole("button", { name: t.cancel });
   const makeButton = page.getByRole("button", { name: t.accept });

   return {
      page,
      user,
      spyAutomation,
      header, 
      nameInput,
      amountInput,
      transferInput,
      supportiveTransfer,
      timeInput,
      statusSwitch,
      cancelButton,
      makeButton
   };
};