import { Traduction } from "../../constants/Traduction";
import { StatusError } from "../../errors/StatusError";
import { getTraduction } from "../../utils/getTraduction";
import { getAccountData } from "./account";

const API = import.meta.env.VITE_API_URL +  "/auth";

const TOKEN = localStorage.getItem("token");
const { idAccount, email } = JSON.parse(localStorage.getItem("account")) ?? "";
const LANGUAGE = localStorage.getItem("language") ?? navigator.language;


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

export const resendVerificationToken = async (token) => {
   const response = await fetch(`${API}/resend-token?token=${token}`, {
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

export const savePassword = async (token, passwordDto) => {
   const response = await fetch(`${API}/save-password?token=${token}`, {
      method: "POST",
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

export const changeName = async (newName, password) => {
   const response = await fetch(`${API}/secure/change-name?name=${newName}`, {
      method: "POST",
      headers: {
         "Content-Type": "application/json",
         "Authorization": TOKEN,
         "Accept-Language": LANGUAGE
      },
      body: JSON.stringify({
         idAccount,
         email,
         "oldPassword": "", 
         newPassword: password
      })
   });

   const data = await response.json();

   if (response.ok) {
      getAccountData(email);
      return data.result;
   } else {
      throw new StatusError(JSON.stringify(data), response.status);
   }
};

export const changePassword = async (oldPassword, newPassword) => {
   const response = await fetch(`${API}/secure/change-password`, {
      method: "POST",
      headers: {
         "Content-Type": "application/json",
         "Authorization": TOKEN,
         "Accept-Language": LANGUAGE
      },
      body: JSON.stringify({
         idAccount,
         email,
         oldPassword, 
         newPassword
      })
   });

   const data = await response.json();

   if (response.ok) {
      getAccountData(email);
      return data.result;
   } else {
      throw new StatusError(JSON.stringify(data), response.status);
   }
};

export const changeEmail = async (newEmail, password) => {
   const response = await fetch(`${API}/secure/change-email`, {
      method: "POST",
      headers: {
         "Content-Type": "application/json",
         "Authorization": TOKEN,
         "Accept-Language": LANGUAGE
      },
      body: JSON.stringify({
         idAccount,
         email: newEmail,
         oldPassword: "", 
         newPassword: password
      })
   });

   const data = await response.json();

   if (response.ok) {
      return data.result;
   } else {
      throw new StatusError(JSON.stringify(data), response.status);
   }
};