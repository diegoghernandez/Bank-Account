import { StatusError } from "../../errors/StatusError";

const API = "http://localhost:8090/automations";

export const getAutomations = async (id) => {
   try {
      const response = await fetch(`${API}/account?id=${id}`, {
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
         throw new StatusError("No automations found", 404);
      }
   
   } catch (error) {
      return error;
   }
}

export const updateStatus = async (id, status) => {
   try {
      const response = await fetch(`${API}/status?id=${id}&status=${status}`, {
         method: "PUT",
         headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer {token}"
         },
      });
   
      if (response.ok) {
         return "Update correctly";
      } else {
         throw new StatusError("No automations found", 404);
      }
   
   } catch (error) {
      return error;
   }
}

export const saveAutomation = async (automation) => {
   const response = await fetch(`${API}/save`, {
      method: "POST",
      headers: {
         "Content-Type": "application/json",
         "Authorization": "Bearer {token}"
      },
      body: JSON.stringify(automation)
   });
   return await response.json();
}
