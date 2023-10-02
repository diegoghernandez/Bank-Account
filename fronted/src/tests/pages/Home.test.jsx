import { expect, vi } from "vitest";
import { Home } from "../../pages/Home";
import { customRender } from "../../utils/renderTest";
import * as automation from "../../pages/_services/automation";
import { waitFor, waitForElementToBeRemoved } from "@testing-library/dom";
import { getTraduction } from "../../utils/getTraduction";
import { Traduction } from "../../constants/Traduction";

const t = getTraduction(Traduction.HOME_PAGE);

describe("Home page tests", () => {
   it("Should render Home page correctly with all active automations", async () => {  
      const spyAutomation = vi.spyOn(automation, "getAutomations");
      const page = customRender(<Home />);

      page.getByText(/^hello\s[A-Za-z]+$/i);
      page.getByText("Active balance:");
      page.getByText(/^\d+\.\d+$/);
      page.getByText(t.activeAutomation + ":");

      await waitForElementToBeRemoved(() => page.getByRole("progressbar"));

      await waitFor(() => {
         expect(spyAutomation).toHaveBeenCalledTimes(1);
         expect(spyAutomation).toHaveBeenLastCalledWith(238589851, "juan@names.com");
         expect(page.getAllByRole("article")).length(2);
      });
   });

   it("Should render Home page correctly without automations", async () => {  
      globalThis.localStorage = {
         state: {
            "account": '{"idAccount":42342,"accountName":"juan","email":"juan@names.com","currentBalance":54}'
         },
         setItem (key, item) {
            this.state[key] = item;
         },
         getItem (key) { 
            return this.state[key];
         }
      };
      const spyAutomation = vi.spyOn(automation, "getAutomations");
      const page = customRender(<Home />);

      page.getByText(/^hello\s[A-Za-z]+$/i);
      page.getByText("Active balance:");
      page.getByText(/^\d+\.\d+$/);
      page.getByText(t.activeAutomation + ":");

      await waitForElementToBeRemoved(() => page.getByRole("progressbar"));

      await waitFor(() => {
         expect(spyAutomation).toHaveBeenCalledTimes(1);
         expect(spyAutomation).toHaveBeenLastCalledWith(42342, "juan@names.com");
         page.getByText("No automations found");
      });
   });
});