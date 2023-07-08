import { StatusError } from "../../errors/StatusError";

const API = "http://localhost:8090/transactions";

export const getTransactions = async (id, page) => {
   try {
      const response = await fetch(`${API}/account?id=${id}&page=${page}`, {
         method: "GET",
         mode: "no-cors",
         headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer {token}"
         },
      });
   
      if (response.ok) {
         const { content } = await response.json();

         return content;
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
            "Authorization": "Bearer {token}"
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