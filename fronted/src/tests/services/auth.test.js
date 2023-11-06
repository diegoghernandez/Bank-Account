import { StatusError } from "../../errors/StatusError";
import { changeEmail, changeName, changePassword, login, register, resendToken, savePassword, verifyEmail, verifyRegistration } from "../../pages/_services/auth";

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

   describe("register test", () => {
      it("Should be a function", () => {
         expect(typeof register).toBe("function");
      });

      it("Should throw an StatusError if some value is wrong", async () => {
         await expect(register({
               name: "name",
               email: "error@user.com", 
               password: "1234",
               matchingPassword: "1234"
            })).rejects.toThrow(StatusError);
         await expect(register({
            name: "name",
            email: "error@user.com", 
            password: "1234",
            matchingPassword: "1234"
         })).rejects.toThrow('{"name":"Simple, wrong name,","email":"Wrong email","password":"Bad password","confirmation":"Bad confirmation"}');
      });

      it("Should save the right content", async () => {
         const content = await register({
            name: "name",
            email: "user@user.com", 
            password: "1234",
            matchingPassword: "1234"
         });
         expect(content).toStrictEqual("Account created successfully");
      });
   });

   describe("resend token", () => {
      it("Should be a function", () => {
         expect(typeof resendToken).toBe("function");
      });

      it("Should save the right content", async () => {
         const content = await resendToken("nu3v3-9b58-41ae-8723-29d7ff675a30", "verification");
         expect(content).toStrictEqual("Verification Link Sent");
      });
   });

   describe("verify registration tests", () => {
      it("Should be a function", () => {
         expect(typeof verifyRegistration).toBe("function");
      });

      it("Should throw an StatusError if some value is wrong", async () => {
         await expect(verifyRegistration("very wrong token")).rejects.toThrow(StatusError);
         await expect(verifyRegistration("very wrong token")).rejects.toThrow("expire");
      });

      it("Should save the right content", async () => {
         const content = await verifyRegistration("nu3v3-9b58-41ae-8723-29d7ff675a30");
         expect(content).toStrictEqual("valid");
      });
   });

   describe("save password tests", () => {
      it("Should be a function", () => {
         expect(typeof savePassword).toBe("function");
      });

      it("Should throw an StatusError if the value is invalid", async () => {
         await expect(savePassword("342gdfsh4", {
               idAccount: 3131312,
               oldPassword: "error",
               newPassword: "error"
            })).rejects.toThrow(StatusError);
         await expect(savePassword("342gdfsh4", {
            idAccount: 3131312,
            oldPassword: "error",
            newPassword: "error"
         })).rejects.toThrow("invalid");
      });

      it("Should throw an StatusError if the value is expired", async () => {
         await expect(savePassword("nu3v3-9b58-41ae-8723-29d7ff675a30", {
               idAccount: 3131312,
               oldPassword: "error",
               newPassword: "error"
            })).rejects.toThrow(StatusError);
         await expect(savePassword("nu3v3-9b58-41ae-8723-29d7ff675a30", {
            idAccount: 3131312,
            oldPassword: "error",
            newPassword: "error"
         })).rejects.toThrow("expired");
      });

      it("Should save the right content", async () => {
         const content = await savePassword("er143ge8-9b58-41ae-8723-29d7ff675a30", {
            idAccount: 121,
            oldPassword: "1234",
            newPassword: "1234"
         });
         expect(content).toStrictEqual("valid");
      });
   });

   describe("verify email tests", () => {
      it("Should be a function", () => {
         expect(typeof verifyEmail).toBe("function");
      });

      it("Should throw an StatusError if some value is wrong", async () => {
         await expect(verifyEmail("very wrong token")).rejects.toThrow(StatusError);
         await expect(verifyEmail("very wrong token")).rejects.toThrow("expire");
      });

      it("Should save the right content", async () => {
         const content = await verifyEmail("nu3v3-9b58-41ae-8723-29d7ff675a30");
         expect(content).toStrictEqual("valid");
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
   });

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