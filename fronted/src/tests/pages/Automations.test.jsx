import { describe, expect, it, vi } from "vitest";
import { Automations } from "../../pages/Automations/Automations";
import * as automation from "../../pages/_services/automation";
import { customRender } from "../../utils/renderTest";
import { waitFor } from "@testing-library/dom";
import userEvent from "@testing-library/user-event";

describe("Automations page tests", () => {
   it("Should render Home page correctly with all automations", async () => {
      const { spyAutomation, page, statusInput, nameInput, automationLink } = getElements();

      expect(statusInput).toBeInTheDocument();
      expect(nameInput).toBeInTheDocument();
      expect(automationLink).toBeInTheDocument();

      await waitFor(() => {
         expect(spyAutomation).toHaveBeenCalledTimes(1);
         expect(spyAutomation).toHaveBeenLastCalledWith(238589851, "juan@names.com");
         expect(page.getAllByText("New automation")).length(3);
      });
   });

   describe("User search interaction", () => {
      describe("Status type interaction", () => {
         it("Should show only the active automations if the status is active", async () => {
            const { page, user, statusInput } = getElements();

            await user.click(statusInput);
            await user.click(page.getByText("Active"));

            await waitFor(() => {
               expect(page.getAllByText("New automation")).length(2);
            });
         });

         it("Should show only the active automations if the status is disable", async () => {
            const { page, user, statusInput } = getElements();

            await user.click(statusInput);
            await user.click(page.getByText("Disable"));

            await waitFor(() => {
               expect(page.getAllByText("New automation")).length(1);
            });
         });
      });

      describe("Name type interaction", () => {
         it("Should show only the automations with a similar name", async () =>{
            const { page, user, nameInput } = getElements();

            await user.type(nameInput, "auto");

            await waitFor(() => {
               expect(page.getAllByText("New automation")).length(3);
            });

         });
      });
   });

   it("Should render Home page correctly without automations", async () => {
      globalThis.localStorage = {
         state: {
            "account": '{"idAccount":42342,"accountName":"juan","email":"juan@names.com","currentBalance":54}'
         },
         getItem (key) { 
            return this.state[key];
         }
      };
      const { spyAutomation, page, statusInput, nameInput, automationLink } = getElements();

      expect(statusInput).toBeInTheDocument();
      expect(nameInput).toBeInTheDocument();
      expect(automationLink).toBeInTheDocument();

      await waitFor(() => {
         expect(spyAutomation).toHaveBeenCalledTimes(1);
         expect(spyAutomation).toHaveBeenLastCalledWith(42342, "juan@names.com");
         page.getByText("No automations found");
      });
   });
});

const getElements = () => {
   const spyAutomation = vi.spyOn(automation, "getAutomations");
   const page = customRender(<Automations />);
   const user = userEvent.setup();

   const statusInput = page.getByLabelText("Automation Status");
   const nameInput = page.getByLabelText("Name");
   const automationLink = page.getByRole("link", { name: "Automation"});

   return {
      spyAutomation,
      page,
      user,
      statusInput,
      nameInput,
      automationLink
   };
};