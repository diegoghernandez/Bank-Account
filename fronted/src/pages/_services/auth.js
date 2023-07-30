import { StatusError } from "../../errors/StatusError";

const API = "http://localhost:8090/api/auth";

export const login = async (email, password) => {
   const response = await fetch(`${API}/login`, {
      method: "POST",
      headers: {
         "Content-Type": "application/json"
      },
      body: JSON.stringify({email, password})
   });

   console.log(response);

   if (response.ok) {
      return await response.text();
   } else {
      throw new StatusError("Incorrect authentication credentials", response.status);
   }
}