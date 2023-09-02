import { useState } from "react";
import { DividerField } from "../../components/Divider/DividerField/DividerField";
import { Navbar } from "../../components/Navbar/Navbar";
import { Switch } from "../../components/Switch/Switch";
import { Page } from "../../constants/Page";
import { changeEmail, changeName, changePassword } from "../_services/auth";
import { useNavigate } from "react-router-dom";

export const Account = () => {
   const [error, setError] = useState({});
   const [successMessage, setSuccessMessage] = useState("");
   const navigate = useNavigate();


   const { accountName, idAccount } = JSON.parse(localStorage.getItem("account"));

   const handleMethods = async (firstParameter, secondParameter, changeFunction) => {
      try {
         const data = await changeFunction(firstParameter, secondParameter);
         setSuccessMessage(data);
      } catch (e) {
         const message = JSON.parse(e.message);
         setError(message);
      }
   };

   const handleName =  (newName, password) => {
      handleMethods(newName, password, changeName);
   };

   const handlePassword =  (oldPassword, newPassword) => {
      handleMethods(oldPassword, newPassword, changePassword);
   };

   const handleEmail =  (newEmail, password) => {
      handleMethods(newEmail, password, changeEmail);
   }

   const closeSession = () => {
      localStorage.removeItem("account");
      localStorage.removeItem("token");
      navigate("/sign-in");
   }

   return (
      <main>
         <h1 className="ml-4 mt-8 text-4xl font-sans font-bold">{accountName}</h1>
         <p className="ml-4 mt-3 text-base font-sans font-normal">Account Number: {idAccount}</p>

         <div className="w-full px-4 py-2 mt-8 border-b border-outline-variant">
            <Switch 
               label="Dark Mode"
               status="default"
               selected={false}
            />
         </div>
         <DividerField 
            label="Change name"
            formUtils={{
               inputs: ["New name", "Password"],
               handle: handleName,
               successMessage,
               setSuccessMessage,
               setError,
               errorParameters: {
                  first: error?.name ?? "",
                  second: error?.newPassword ?? ""
               }
            }}
         />
         <DividerField 
            label="Change password" 
            formUtils={{
               inputs: ["Old password", "New password"],
               handle: handlePassword,
               successMessage,
               setSuccessMessage,
               setError,
               errorParameters: {
                  first: error?.oldPassword ?? "",
                  second: error?.newPassword ?? ""
               }
            }}
         />
         <DividerField 
            label="Change email" 
            formUtils={{
               inputs: ["New email", "Password"],
               handle: handleEmail,
               successMessage,
               setSuccessMessage,
               setError,
               errorParameters: {
                  first: error?.email ?? "",
                  second: error?.newPassword ?? ""
               },
               closeSession
            }}
         />
         <DividerField 
            label="Logout" 
            formUtils={{
               inputs: ["", ""],
               logout: true,
               closeSession
            }}
         />

         <Navbar page={Page.Account} />
      </main>
   );
}