import { StatusError } from "../../errors/StatusError";
import { getAccountData } from "./account";

const API = "http://localhost:8090/transactions";
const TOKEN = localStorage.getItem("token");

export const getTransactions = async (id, page) => {
   try {
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
   
   } catch (error) {
      return error;
   }
}

export const getTransactionsByYear = async (id, year) => {
   try {
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
   
   } catch (error) {
      return error;
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

   getAccountData(email);
   return await response.json();
}
