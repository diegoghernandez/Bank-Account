import { StatusError } from "../../errors/StatusError";
import { getAccountData } from "./account";

/** @type {string} */
const URL = import.meta.env.VITE_API_URL ?? "http://localhost:8090";
/** @type {string} */
const API = URL + "/automations";

/** @type {string} */
const TOKEN = localStorage.getItem("token");
/** @type {string} */
const LANGUAGE = localStorage.getItem("language") ?? navigator.language;
/** @type {{ idAccount: number }} */
const { idAccount } = JSON.parse(localStorage.getItem("account")) ?? "";

/**
 * Return all automation that the user has, if resolve,
 * otherwise return a Status Error with a json message
 * @param {number} id the id of account to get the automation list
 * @param {string} email the email to get the account data
 * @returns {Promise<Array<object>>} 
 * return the success text if resolve, otherwise return a Status error
 */
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

/**
 * Send an automationDto object to be save, and return a message if resolve,
 * otherwise return a Status Error with a json message
 * @param {object} automation the automationDto to be save
 * @returns {Promise<String>} 
 * return the success text if resolve, otherwise return a Status error
 */
export const saveAutomation = async (automation) => {
   const response = await fetch(`${API}/save`, {
      method: "POST",
      headers: {
         "Content-Type": "application/json",
         "Authorization": TOKEN,
         "Accept-Language": LANGUAGE,
         "ID": String(idAccount)
      },
      body: JSON.stringify(automation)
   });

   if (response.ok) {
      return await response.text();
   } else {
      if (response.status !== 403) {
         throw new StatusError(JSON.stringify(await response.json()), response.status);
      } else {
         throw new StatusError(null, response.status);
      }
   }
};

/**
 * Send an automation object to be update, and return a message if resolve,
 * otherwise return a Status Error with a json message
 * @param {object} automation the automation to be update
 * @returns {Promise<String>} 
 * return the success text if resolver, otherwise return a Status error
 */
export const updateAutomation = async (automation) => {
   const response = await fetch(`${API}/update`, {
      method: "PUT",
      headers: {
         "Content-Type": "application/json",
         "Authorization": TOKEN,
         "Accept-Language": LANGUAGE,
         "ID": String(idAccount)
      },
      body: JSON.stringify(automation)
   });

   if (response.ok) {
      return await response.text();
   } else {
      throw new StatusError(JSON.stringify(await response.json()), 400);
   }
};

/**
 * Send the id of the desire automation to be delete if resolve,
 * otherwise return a Status Error with the error message
 * @param {number} id the id of automation
 * @returns {Promise<String>} 
 * return the success text if resolve, otherwise return a Status error
 */
export const deleteAutomation = async (id) => {
   const response = await fetch(`${API}/delete?id=${id}`, {
      method: "DELETE",
      headers: {
         "Content-Type": "application/json",
         "Authorization": TOKEN,
         "Accept-Language": LANGUAGE,
         "ID": String(idAccount)
      },
   });

   if (response.ok) {
      return await response.text();
   } else {
      const data = await response.json();
      throw new StatusError(data.desc, 400);
   }
};