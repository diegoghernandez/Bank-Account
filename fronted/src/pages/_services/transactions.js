import { StatusError } from "../../errors/StatusError";
import { getAccountData } from "./account";

const API = import.meta.env.VITE_API_URL + "/transactions";
const TOKEN = localStorage.getItem("token");
const LANGUAGE = localStorage.getItem("language") ?? navigator.language;

export const getTransactions = async (id, page, signal) => {
   const response = await fetch(`${API}/account?id=${id}&page=${page}`, {
      method: "GET",
      headers: {
         "Content-Type": "application/json",
         "Authorization": TOKEN
      },
      signal
   });

   if (response.ok) {
      const { content, last } = await response.json();      
      return { content, last };
   } else {
      throw new StatusError("No transactions found", 404);
   }
};

export const getTransactionsByFilter = async ({ id, type = "", name, date = {}, page }) => {
   const response = await fetch(`${API}/filter?id=${id}&type=${type}&name=${name}&page=${page}`, {
      method: "POST",
      headers: {
         "Content-Type": "application/json",
         "Authorization": TOKEN
      },
      body: JSON.stringify(date)
   });

   if (response.ok) {
      const { content, last } = await response.json();
      return { content, last };
   } else {
      throw new StatusError("No transactions found", 404);
   }
};

export const saveTransaction = async (transaction, email) => {
   const response = await fetch(`${API}/save`, {
      method: "POST",
      headers: {
         "Content-Type": "application/json",
         "Authorization": TOKEN,
         "Accept-Language": LANGUAGE
      },
      body: JSON.stringify(transaction)
   });

   if (response.ok) {
      getAccountData(email);
      return await response.text();   
   } else {
      throw new StatusError(JSON.stringify(await response.json()), response.status);
   }
};
