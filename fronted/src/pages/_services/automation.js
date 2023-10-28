import { StatusError } from "../../errors/StatusError";
import { getAccountData } from "./account";

const API = import.meta.env.VITE_API_URL + "/automations";
const TOKEN = localStorage.getItem("token");
const LANGUAGE = localStorage.getItem("language") ?? navigator.language;

export const getAutomations = async (id, email) => {
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
};

export const saveAutomation = async (automation) => {
   const response = await fetch(`${API}/save`, {
      method: "POST",
      headers: {
         "Content-Type": "application/json",
         "Authorization": TOKEN,
         "Accept-Language": LANGUAGE
      },
      body: JSON.stringify(automation)
   });

   if (response.ok) {
      return await response.text();
   } else {
      throw new StatusError(JSON.stringify(await response.json()), response.status);
   }
};

export const updateAutomation = async (automation) => {
   const response = await fetch(`${API}/update`, {
      method: "PUT",
      headers: {
         "Content-Type": "application/json",
         "Authorization": TOKEN,
         "Accept-Language": LANGUAGE
      },
      body: JSON.stringify(automation)
   });

   if (response.ok) {
      return await response.text();
   } else {
      throw new StatusError(JSON.stringify(await response.json()), 400);
   }
};

export const deleteAutomation = async (id) => {
   const response = await fetch(`${API}/delete?id=${id}`, {
      method: "DELETE",
      headers: {
         "Content-Type": "application/json",
         "Authorization": TOKEN,
         "Accept-Language": LANGUAGE
      },
   });

   if (response.ok) {
      return await response.text();
   } else {
      const data = await response.json();
      throw new StatusError(data.desc, 400);
   }
};