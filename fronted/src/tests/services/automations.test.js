import { StatusError } from "../../errors/StatusError";
import { getAutomations, saveAutomation, updateStatus } from "../../pages/_services/automation";
import automations from "../../mocks/fixtures/automations.json";

describe("Automations tests", () => {

   describe("getAutomations test", () => {
      it("Should be a function", () => {
         expect(typeof getAutomations).toBe("function");
      });

      it("Should throw an StatusError if there is no element", async () => {         
         await expect(getAutomations(21))
            .rejects.toThrow(StatusError);
         await expect(getAutomations(21))
            .rejects.toThrow("No automations found");
      });

      it("Should give the right content", async () => {
         const content = await getAutomations(238589851);
         expect(content).toStrictEqual(automations);
      });
   });

   describe("updateStatus test", () => {
      it("Should be a function", () => {
         expect(typeof updateStatus).toBe("function");
      });

      it("Should throw an StatusError if there is no element", async () => {
         await expect(updateStatus(21, true))
            .rejects.toThrow(StatusError);
         await expect(updateStatus(21, true))
            .rejects.toThrow("No automations found");
      });

      it("Should give the right content", async () => {
         const content = await updateStatus(1, false);
         expect(content).toStrictEqual("Update correctly");
      });
   });

   describe("saveAutomation test", () => {
      it("Should be a function", () => {
         expect(typeof saveAutomation).toBe("function");
      });

      it("Should save the right content", async () => {
         const content = await saveAutomation({
            "idAccount": 4432,
            "name": "New automation",
            "amount": 2000.00,
            "idTransferAccount": 321,
            "hoursToNextExecution": 3
         });
         
         expect(content).toStrictEqual("Automation created successfully");
      });
   });
});