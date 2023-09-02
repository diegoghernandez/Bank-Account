import { StatusError } from "../../errors/StatusError";
import { getAccountData } from "./account";

const API = "http://localhost:8090/auth";

const TOKEN = localStorage.getItem("token");
const { idAccount, email } = JSON.parse(localStorage.getItem("account")) ?? "";


export const login = async (email, password) => {
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
      throw new StatusError("Incorrect authentication credentials", response.status);
   }
};

export const changeName = async (newName, password) => {
   const response = await fetch(`${API}/secure/change-name?name=${newName}`, {
      method: "POST",
      headers: {
         "Content-Type": "application/json",
         "Authorization": TOKEN
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
}

export const changePassword = async (oldPassword, newPassword) => {
   const response = await fetch(`${API}/secure/change-password`, {
      method: "POST",
      headers: {
         "Content-Type": "application/json",
         "Authorization": TOKEN
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
}

export const changeEmail = async (newEmail, password) => {
   const response = await fetch(`${API}/secure/change-email`, {
      method: "POST",
      headers: {
         "Content-Type": "application/json",
         "Authorization": TOKEN
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
}