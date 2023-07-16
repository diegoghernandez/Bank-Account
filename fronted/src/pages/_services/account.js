import { StatusError } from "../../errors/StatusError";

const API = "http://localhost:8090/api/accounts";

export const getAccountData = async (email) => {
   try {
      const response = await fetch(`${API}/email/${email}`, {
         method: "GET",
         mode: "no-cors",
         headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer {token}"
         },
      });

      if (response.ok) {
         return await response.json();
      } else {
         throw new StatusError("No account found", 404);
      }
   
   } catch (error) {
      console.log(error);
      return error;
   }
}