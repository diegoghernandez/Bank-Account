import { vi } from "vitest";
import { StatusError } from "../../errors/StatusError";
import { changeEmail, changeName, changePassword, login } from "../../pages/_services/auth";

/* const localStorageMock = {
   getItem: vi.fn(),
   setItem: vi.fn(),
   clear: vi.fn()
};
const getItemMock = vi.spyOn(localStorageMock, "account");
getItemMock.mockReturnValue({account: '{"idAccount":238589851,"accountName":"juan","email":"juan@names.com","currentBalance":54}'});

globalThis.localStorage = localStorageMock; */


describe("Auth tests", () => {
   describe("login test", () => {
      it("Should be a function", () => {
         expect(typeof login).toBe("function");
      });

      it("Should throw an StatusError if the credentials are incorrect", async () => {
         await expect(login("error@user.com", "1234"))
            .rejects.toThrow(StatusError);
         await expect(login("error@user.com", "1234"))
            .rejects.toThrow("Incorrect authentication credentials");
      });

      it("Should save the right content", async () => {
         const content = await login("user@user.com", "1234");
         expect(content).toStrictEqual("Token");
      });
   });

   describe("change name test", () => {
      it("Should be a function", () => {
         expect(typeof changeName).toBe("function");
      });

      it("Should throw an StatusError if the credentials are incorrect", async () => {
         await expect(changeName("lopez", "3RR0R"))
            .rejects.toThrow(StatusError);
         await expect(changeName("lopez", "3RR0R"))
            .rejects.toThrow("Invalid password");
      });

      it("Should change the name correctly", async () => {
         const content = await changeName("lopez", "1234");
         expect(content).toStrictEqual("Change name successfully");
      });
   });

   describe("change password test", () => {
      it("Should be a function", () => {
         expect(typeof changePassword).toBe("function");
      });

      it("Should throw an StatusError if the credentials are incorrect", async () => {
         await expect(changePassword("3RR0R", "3RR0R"))
            .rejects.toThrow(StatusError);
         await expect(changePassword("3RR0R", "3RR0R"))
            .rejects.toThrow("Invalid old password");
      });

      it("Should change the password correctly", async () => {
         const content = await changePassword("oldPass", "1234");
         expect(content).toStrictEqual("Change password successfully");
      });
   })

   describe("change email test", () => {
      it("Should be a function", () => {
         expect(typeof changeEmail).toBe("function");
      });

      it("Should throw an StatusError if the credentials are incorrect", async () => {
         await expect(changeEmail("error@names.com", "3RR0R"))
            .rejects.toThrow(StatusError);
         await expect(changeEmail("error@names.com", "3RR0R"))
            .rejects.toThrow("Invalid password");
      });

      it("Should change the email correctly", async () => {
         const content = await changeEmail("test@names.com", "1234");
         expect(content).toStrictEqual("Change email successfully");
      });
   });
});