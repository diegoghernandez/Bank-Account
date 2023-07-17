import { StatusError } from "../../errors/StatusError";

const API = "http://localhost:8090/api/auth";

export const login = async (email, password) => {
   try {
      const response = await fetch(`${API}/login`, {
         method: "POST",
         headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
         },
         body: JSON.stringify({email, password})
      });

      if (response.ok) {
         return await response.text();
      } else {
         throw new StatusError("Unauthorized", 403);
      }
   
   } catch (error) {
      return error;
   }
}