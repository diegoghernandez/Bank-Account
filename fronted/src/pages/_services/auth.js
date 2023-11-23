import { Traduction } from "../../constants/Traduction";
import { StatusError } from "../../errors/StatusError";
import { getTraduction } from "../../utils/getTraduction";
import { getAccountData } from "./account";

/** @type {string} */
const API = import.meta.env.VITE_API_URL +  "/auth";

/** @type {string} */
const TOKEN = localStorage.getItem("token");
/** @type {string} */
const LANGUAGE = localStorage.getItem("language") ?? navigator.language;
/** @type {{ idAccount: number, email: string }} */
const { idAccount, email } = JSON.parse(localStorage.getItem("account")) ?? "";

/**
 * Send the credentials to be authenticated, if resolve,
 * otherwise return a Status Error with the message
 * @param {string} email the email to log in
 * @param {string} password the password to log in
 * @returns {Promise<String>} 
 * return the success text if resolve, otherwise return a Status error
 */
export const login = async (email, password) => {
   const { login } = getTraduction(Traduction.LOGIN);

   const response = await fetch(`${API}/login`, {
      method: "POST",
      headers: {
         "Content-Type": "application/json"
      },
      body: JSON.stringify({email, password})
   });

   if (response.ok) {
      return await response.text();
   } else {
      throw new StatusError(login, response.status);
   }
};

/**
 * Send an accountDto object to be save, and return a message, if resolve,
 * otherwise return a Status Error with a json message
 * @param {object} accountData the accountDto to be save
 * @returns {Promise<String>} 
 * return the success text if resolve, otherwise return a Status error
 */
export const register = async (accountData) => {
   const response = await fetch(`${API}/register`, {
      method: "POST",
      headers: {
         "Content-Type": "application/json",
         "Accept-Language": LANGUAGE
      },
      body: JSON.stringify(accountData)
   });

   if (response.ok) {
      return await response.text();
   } else {
      throw new StatusError(JSON.stringify(await response.json()), response.status);
   }
};

/**
 * Send a token to be updated, and send the respective type email with the new token, if resolve,
 * otherwise return a Status Error with the message
 * @param {string} token the token to be updated
 * @param {string} type the token type to be resend
 * @returns {Promise<String>} 
 * return the success text if resolve, otherwise return a Status error
 */
export const resendToken = async (token, type) => {
   const response = await fetch(`${API}/resend-token?token=${token}&type=${type}`, {
      method: "GET",
      headers: {
         "Content-Type": "application/json",
         "Accept-Language": LANGUAGE
      }
   });

   const data = await response.text();

   if (response.ok) {
      return data;
   } else {
      throw new StatusError(data, response.status);
   }
};

/**
 * Send a token to verify the account, and return the success message if resolve,
 * otherwise return a Status Error with the message
 * @param {string} token the token to be verified
 * @returns {Promise<String>} 
 * return the success text if resolve, otherwise return a Status error
 */
export const verifyRegistration = async (token) => {
   const response = await fetch(`${API}/verify-registration?token=${token}`, {
      method: "GET",
      headers: {
         "Content-Type": "application/json",
         "Accept-Language": LANGUAGE
      }
   });

   const data = await response.text();

   if (response.ok) {
      return data;
   } else {
      throw new StatusError(data, response.status);
   }
};

/**
 * Send the email where the token will send
 * @param {string} email the email to be send
 */
export const resetPassword = (email) => {
   fetch(`${API}/reset-password/${email}`, {
      method: "GET",
      headers: {
         "Content-Type": "application/json",
         "Accept-Language": LANGUAGE
      },
   });
};

/**
 * Send a passwordDto to create a new password, and return the success message if resolve,
 * otherwise return a Status Error with the message
 * @param {string} token the token to be verified
 * @param {object} passwordDto the object to send the idAccount, oldPassword, newPassword
 * @returns {Promise<String>} 
 * return the success text if resolve, otherwise return a Status error
 */
export const savePassword = async (token, passwordDto) => {
   const response = await fetch(`${API}/save-password?token=${token}`, {
      method: "PUT",
      headers: {
         "Content-Type": "application/json",
         "Accept-Language": LANGUAGE
      },
      body: JSON.stringify(passwordDto)
   });

   const data = await response.text();

   if (response.ok) {
      return data;
   } else {
      throw new StatusError(data, response.status);
   }
};

/**
 * Send a token to be verify the email, and return the success message if resolve,
 * otherwise return a Status Error with the message
 * @param {string} token the token to be verified
 * @returns {Promise<String>} 
 * return the success text if resolve, otherwise return a Status error
 */
export const verifyEmail = async (token) => {
   const response = await fetch(`${API}/verify-email?token=${token}`, {
      method: "GET",
      headers: {
         "Content-Type": "application/json",
         "Accept-Language": LANGUAGE
      }
   });

   const data = await response.text();

   if (response.ok) {
      return data;
   } else {
      throw new StatusError(data, response.status);
   }
};

/**
 * Send the name to change, and return the success message if the password is correct,
 * otherwise return a Status Error a json message
 * @param {string} newName the desire name
 * @param {string} password the account password
 * @returns {Promise<String>} 
 * return the success text if resolve, otherwise return a Status error
 */
export const changeName = async (newName, password) => {
   const response = await fetch(`${API}/secure/change-name?name=${newName}`, {
      method: "PUT",
      headers: {
         "Content-Type": "application/json",
         "Authorization": TOKEN,
         "Accept-Language": LANGUAGE,
         "ID": String(idAccount)
      },
      body: JSON.stringify({
         idAccount,
         email,
         "oldPassword": "", 
         newPassword: password
      })
   });

   if (response.status === 403) {
      throw new StatusError(null, response.status);
   } else {
      const data = await response.json();
   
      if (response.ok) {
         getAccountData(email);
         return data.result;
      } else {
         throw new StatusError(JSON.stringify(data), response.status);
      }
   }

};

/**
 * Send the password to change, and return the success message if the password is correct,
 * otherwise return a Status Error a json message
 * @param {string} oldPassword the past password
 * @param {string} newPassword the desire password
 * @returns {Promise<String>} 
 * return the success text if resolve, otherwise return a Status error
 */
export const changePassword = async (oldPassword, newPassword) => {
   const response = await fetch(`${API}/secure/change-password`, {
      method: "PUT",
      headers: {
         "Content-Type": "application/json",
         "Authorization": TOKEN,
         "Accept-Language": LANGUAGE,
         "ID": String(idAccount)
      },
      body: JSON.stringify({
         idAccount,
         email,
         oldPassword, 
         newPassword
      })
   });

   if (response.status === 403) {
      throw new StatusError(null, response.status);
   } else {
      const data = await response.json();
   
      if (response.ok) {
         getAccountData(email);
         return data.result;
      } else {
         throw new StatusError(JSON.stringify(data), response.status);
      }
   }
};

/**
 * Send the email to change, and return the success message if the password is correct,
 * otherwise return a Status Error a json message
 * @param {string} newEmail the desire email
 * @param {string} password the account password
 * @returns {Promise<String>} 
 * return the success text if resolve, otherwise return a Status error
 */
export const changeEmail = async (newEmail, password) => {
   const response = await fetch(`${API}/secure/change-email`, {
      method: "PUT",
      headers: {
         "Content-Type": "application/json",
         "Authorization": TOKEN,
         "Accept-Language": LANGUAGE,
         "ID": String(idAccount)
      },
      body: JSON.stringify({
         idAccount,
         email: newEmail,
         oldPassword: "", 
         newPassword: password
      })
   });

   if (response.status === 403) {
      throw new StatusError(null, response.status);
   } else {
      const data = await response.json();
   
      if (response.ok) {
         return data.result;
      } else {
         throw new StatusError(JSON.stringify(data), response.status);
      }
   }
};