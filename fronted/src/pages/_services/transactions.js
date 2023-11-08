import { StatusError } from "../../errors/StatusError";
import { getAccountData } from "./account";

/** @type {string} */
const API = import.meta.env.VITE_API_URL + "/transactions";
/** @type {string} */
const TOKEN = localStorage.getItem("token");
/** @type {string} */
const LANGUAGE = localStorage.getItem("language") ?? navigator.language;
/** @type {{ idAccount: number }} */
const { idAccount } = JSON.parse(localStorage.getItem("account")) ?? "";

/**
 * Return a transaction list of max ten elements, and if is the last page, if resolve,
 * otherwise return a Status Error with the error message
 * @param {number} id the id of account to get the transaction list
 * @param {number} page the value to access to certain page
 * @returns {Promise<{ content: Array<object>, last: boolean }>} 
 * return the transaction list, and the last indicator if resolve, otherwise return a Status error
 */
export const getTransactions = async (id, page) => {
   const response = await fetch(`${API}/account?id=${id}&page=${page}`, {
      method: "GET",
      headers: {
         "Content-Type": "application/json",
         "Authorization": TOKEN
      }
   });

   if (response.ok) {
      const { content, last } = await response.json();      
      return { content, last };
   } else {
      throw new StatusError("No transactions found", 404);
   }
};

/**
 * Return a transaction list of max ten elements, and if is the last page,
 * according to the desire elements if resolve,
 * otherwise return a Status Error with the error message
 * @param {object} filter
 * @param {number} filter.id the id of account to get the transaction list
 * @param {string} [filter.type] the desire type
 * @param {string} [filter.name] the desire name of receiver
 * @param {object} [filter.date] the desire date
 * @param {number} filter.page the value to access to certain page
 * @returns {Promise<{ content: Array<object>, last: boolean }>}
 * return the transaction list, and the last indicator if resolve, otherwise return a Status error
 */
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

/**
 * Send an transactionDto object to be save, and return a message if resolve,
 * otherwise return a Status Error with a json message
 * @param {object} transaction the transactionDto to be save
 * @param {string} email the email to get the account data
 * @returns {Promise<String>} 
 * return the success text if resolve, otherwise return a Status error
 */
export const saveTransaction = async (transaction, email) => {
   const response = await fetch(`${API}/save`, {
      method: "POST",
      headers: {
         "Content-Type": "application/json",
         "Authorization": TOKEN,
         "Accept-Language": LANGUAGE,
         "ID": String(idAccount)
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
