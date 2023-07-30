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

export const getTransactionsByYear = async (id, year) => {
   const response = await fetch(`${API}/year?id=${id}&year=${year}`, {
      method: "GET",
      mode: "no-cors",
      headers: {
         "Content-Type": "application/json",
         "Authorization": TOKEN
      },
   });

   if (response.ok) {
      return await response.json();
   } else {
      throw new StatusError(`No transactions found by ${year}`, 404);
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
