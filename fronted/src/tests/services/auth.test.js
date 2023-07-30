import { StatusError } from "../../errors/StatusError";
import { login } from "../../pages/_services/auth";

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
});