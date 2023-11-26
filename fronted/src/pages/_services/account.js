/** @type {string} */
const URL = import.meta.env.VITE_API_URL ?? "http://localhost:8090";
/** @type {string} */
const API = URL +  "/accounts";

/**
 * Recover the necessary account data and set in the local storage
 * @param {string} email the email to send
 */
export const getAccountData = async (email) => {
   const TOKEN = localStorage.getItem("token");

   const response = await fetch(`${API}/email/${email}`, {
      method: "GET",
      headers: {
         "Content-Type": "application/json",
         "Authorization": TOKEN
      },
   });

   if (response.ok) {
      const account = await response.json();
      localStorage.setItem("account", JSON.stringify(account));
   }
};