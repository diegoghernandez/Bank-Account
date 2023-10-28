import { StatusError } from "../../errors/StatusError";
import { deleteAutomation, getAutomations, saveAutomation, updateAutomation } from "../../pages/_services/automation";
import automations from "../../mocks/fixtures/automations.json";

describe("Automations tests", () => {

   describe("getAutomations tests", () => {
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

   describe("saveAutomation tests", () => {
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

   describe("updateAutomation tests", () => {
      it("Should be a function", () => {
         expect(typeof updateAutomation).toBe("function");
      });

      it("Should throw an StatusError if there is no element", async () => {
         await expect(updateAutomation({
            idAutomation: 4234,
            idAccount: 325423,
            name: "New automation",
            amount: 2000.00,
            idTransferAccount: 124124,
            hoursToNextExecution: 6,
            executionTime: "2023-07-15T17:51:36.986827",
            status: true
         })).rejects.toThrow(StatusError);

         await expect(updateAutomation({
            idAutomation: 4234,
            idAccount: 325423,
            name: "New automation",
            amount: 2000.00,
            idTransferAccount: 124124,
            hoursToNextExecution: 6,
            executionTime: "2023-07-15T17:51:36.986827",
            status: true
         })).rejects.toThrow('{"name":"Incorrect name","amount":"Not enough balance","desc":"Account not found","hoursToNextExecution":"So much hours"}');
      });

      it("Should give the right content", async () => {
         const content = await updateAutomation({
            idAutomation: 42342,
            idAccount: 325423,
            name: "New automation",
            amount: 2000.00,
            idTransferAccount: 534532,
            hoursToNextExecution: 6,
            executionTime: "2023-07-15T17:51:36.986827",
            status: true
         });
         expect(content).toStrictEqual("Automation updated successfully");
      });
   });

   describe("deleteAutomation tests", () => {
      it("Should be a function", () => {
         expect(typeof deleteAutomation).toBe("function");
      });

      it("Should throw an StatusError if there is no element", async () => {
         await expect(deleteAutomation(56268)).rejects.toThrow(StatusError);

         await expect(deleteAutomation(56268)).rejects.toThrow("Automation not found");
      });

      it("Should give the right content", async () => {
         const content = await deleteAutomation(42342);
         expect(content).toStrictEqual("Automation deleted successfully");
      });
   });
});