import { StatusError } from "../../errors/StatusError";
import { getAccountData } from "../../pages/_services/account";

const account = {
   "idAccount": 1,
   "accountName": "user",
   "email": "user@names.com",
   "currentBalance": 22677.00
}

describe("Account test", () => {
   describe("getAccountData test", () => {
      it("Should be a function", () => {
         expect(typeof getAccountData).toBe("function");
      });

      it("Should throw an StatusError if there is no element", async () => {
         const exception = await getAccountData("notfound@names.com");

         expect(exception).toBeInstanceOf(StatusError);
         expect(exception.message).toStrictEqual("No account found");
         expect(exception.status).toStrictEqual(404);
      });

      it("Should give the right content", async () => {
         const content = await getAccountData("user@names.com");
         expect(content).toStrictEqual(account);
      });
   });
});