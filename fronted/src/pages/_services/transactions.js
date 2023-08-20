import { StatusError } from "../../errors/StatusError";
import { getAccountData } from "./account";

const API = "http://localhost:8090/transactions";
const TOKEN = localStorage.getItem("token");

export const getTransactions = async (id, page) => {
   const response = await fetch(`${API}/account?id=${id}&page=${page}`, {
      method: "GET",
      headers: {
         "Content-Type": "application/json",
         "Authorization": TOKEN
      },
   });

   if (response.ok) {
      const data = await response.json();
      return data;
   } else {
      throw new StatusError("No transactions found", 404);
   }
}

export const getTransactionsByName = async (id, name, page) => {
   const response = await fetch(`${API}/name?id=${id}&name=${name}&page=${page}`, {
      method: "GET",
      headers: {
         "Content-Type": "application/json",
         "Authorization": TOKEN
      },
   });

   if (response.ok) {
      const data = await response.json();
      return data;
   } else {
      throw new StatusError("No transactions found", 404);
   }
}

export const getTransactionsByDateAndName = async (id, year, month, name, page) => {
   const response = await fetch(`${API}/date?id=${id}&year=${year}&month=${month}&name=${name}&page=${page}`, {
      method: "GET",
      headers: {
         "Content-Type": "application/json",
         "Authorization": TOKEN
      },
   });

   if (response.ok) {
      return await response.json();
   } else {
      throw new StatusError("No transactions found", 404);
   }
}

export const saveTransaction = async (transaction, email) => {
   const response = await fetch(`${API}/save`, {
      method: "POST",
      headers: {
         "Content-Type": "application/json",
         "Authorization": TOKEN
      },
      body: JSON.stringify(transaction)
   });

   const data = await response.json();

   if (response.ok) {
      getAccountData(email);
      return data;   
   } else {
      throw new StatusError(JSON.stringify(data), response.status);
   }
}
