import { vi } from "vitest";
import { getAccountData } from "../../pages/_services/account";

const account = {
   "idAccount": 1,
   "accountName": "user",
   "email": "user@names.com",
   "currentBalance": 22677.00
};

const localStorageMock = {
   getItem: vi.fn(),
   setItem: vi.fn(),
   clear: vi.fn()
};
globalThis.localStorage = localStorageMock;

describe("Account test", () => {
   describe("getAccountData test", () => {
      it("Should be a function", () => {
         expect(typeof getAccountData).toBe("function");
      });

      it("Should save the right content in local storage", async () => {
         await getAccountData("user@names.com");
         expect(localStorageMock.setItem).toHaveBeenCalledWith("account", JSON.stringify(account));
      });
   });
});