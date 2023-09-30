import { StatusError } from "../../errors/StatusError";
import { getAccountData } from "./account";

const API = "http://localhost:8090/transactions";
const TOKEN = localStorage.getItem("token");

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

export const getTransactionsByName = async (id, name, page, signal) => {
   const response = await fetch(`${API}/name?id=${id}&name=${name}&page=${page}`, {
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

export const getTransactionsByDateAndName = async (id, year, month, name, page, signal) => {
   const response = await fetch(`${API}/date?id=${id}&year=${year}&month=${month}&name=${name}&page=${page}`, {
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

export const saveTransaction = async (transaction, email) => {
   const response = await fetch(`${API}/save`, {
      method: "POST",
      headers: {
         "Content-Type": "application/json",
         "Authorization": TOKEN
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
