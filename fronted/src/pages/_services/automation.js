import { StatusError } from "../../errors/StatusError";
import { getAccountData } from "./account";

const API = "http://localhost:8090/automations";
const TOKEN = localStorage.getItem("token");

export const getAutomations = async (id, email) => {
   try {
      const response = await fetch(`${API}/account?id=${id}`, {
         method: "GET",
         headers: {
            "Content-Type": "application/json",
            "Authorization": TOKEN
         }
      });
   
      if (response.ok) {
         getAccountData(email);
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
            "Authorization": TOKEN
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
         "Authorization": TOKEN
      },
      body: JSON.stringify(automation)
   });
   return await response.json();
}
