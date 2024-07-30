import { useState } from "react";
import { DividerField } from "../../components/Divider/DividerField";
import { Navbar } from "../../components/Navbar";
import { Switch } from "../../components/Switch";
import { Page } from "../../constants/Page";
import { changeEmail, changeName, changePassword } from "../_services/auth";
import { useNavigate } from "react-router-dom";
import { getTraduction } from "../../utils/getTraduction";
import { Traduction } from "../../constants/Traduction";
import { SEO } from "../../utils/SEO";
import { useTheme } from "../../hooks/useTheme";
import { TextFieldTypes } from "../../constants/TextFieldType";

/**
 * Page containing all account configuration
 * @returns 
 */
export const Account = () => {
   /** @type {[object, import("react").Dispatch<import("react").SetStateAction<object>>]} */
   const [error, setError] = useState({});
   /** @type {[string, import("react").Dispatch<import("react").SetStateAction<string>>]} */
   const [successMessage, setSuccessMessage] = useState("");
   /** @type {[boolean, import("react").Dispatch<import("react").SetStateAction<boolean>>]} */
   const [isLoading, setIsLoading] = useState(false);
   const { isDark, setIsDark } = useTheme();
   const navigate = useNavigate();

   const t = getTraduction(Traduction.ACCOUNT_PAGE);
   /** @type {{ accountName: string | null, idAccount: string | null }} */
   const { accountName, idAccount } = JSON.parse(localStorage.getItem("account"));
   
   /**
    * Execute the provided function after the timeout end with the given values, 
    * and either resolve the function with a success message or show an error
    * @param {any} firstParameter The first value of the function
    * @param {any} secondParameter The second value of the function
    * @param {(firstParameter: any, secondParameter: any) => Promise<String>} changeFunction 
    * The function to execute with the given values
    */
   const handleMethods = (firstParameter, secondParameter, changeFunction) => {
      setIsLoading(true);

      setTimeout(async () => {
         try {
            const data = await changeFunction(firstParameter, secondParameter);
            setSuccessMessage(data);
            setIsLoading(false);
         } catch (e) {
            const message = JSON.parse(e.message);
            setIsLoading(false);
            if (e.status === 403) {
               setError({
                  name: t.forbidden,
                  newPassword: t.forbidden,
                  oldPassword: t.forbidden,
                  email: t.forbidden
               });
            } else {
               setError(message);
            }
         }
      }, 1000);
   };

   const changeLanguage = () => {
      const languageToChange = localStorage.getItem("language") ?? navigator.language;

      if (languageToChange.includes("es")) {
         localStorage.setItem("language", "en");
      } else {
         localStorage.setItem("language", "es");
      }

      globalThis.location.reload();
   };

   /** @param {string} newName @param {string} password */
   const handleName = (newName, password) => {
      handleMethods(newName, password, changeName);
   };

   /** @param {string} oldPassword @param {string} newPassword */
   const handlePassword = (oldPassword, newPassword) => {
      handleMethods(oldPassword, newPassword, changePassword);
   };

   /** @param {string} newEmail @param {string} password */
   const handleEmail = (newEmail, password) => {
      handleMethods(newEmail, password, changeEmail);
   };

   const closeSession = () => {
      localStorage.removeItem("account");
      localStorage.removeItem("token");
      navigate("/sign-in");
   };

   const socialLinks = [
      { id: crypto.randomUUID(), name: t.social.web, link: "https://diego-g-hernandez.pages.dev" },
      { id: crypto.randomUUID(), name: "Github", link: "https://github.com/diegoghernandez" },
      { id: crypto.randomUUID(), name: "LinkedIn", link: "https://www.linkedin.com/in/diego-g-hernandez" }
   ];

   return (
      <section className="w-full h-full md:h-screen md:flex md:flex-row-reverse justify-end bg-surface dark:bg-surface-dark">
         <SEO title={t.seo.title} description={t.seo.description} />
         <div className="w-full min-h-[calc(100vh-5rem)] bg-white border border-outline-variant md:rounded-2xl  md:mx-6 md:my-4 dark:bg-black dark:border-outline-variant-dark">
            <h1 className="ml-4 md:ml-6 mt-8 text-4xl font-sans font-bold text-onSurface dark:text-onSurface-dark">{accountName}</h1>
            <p className="ml-4 md:ml-6 mt-3 text-base font-sans font-normal text-onSurface dark:text-onSurface-dark">{t.accountNumber}: {idAccount}</p>

            <div className="w-full px-4 py-2 mt-8 border-b border-outline-variant dark:border-outline-variant-dark">
               <Switch 
                  label={t.dark}
                  isDisable={false}
                  checked={isDark}
                  set={setIsDark}
               />
            </div>
            <DividerField 
               label= {t.change.language.label}
               modalUtils={{
                  messageUtils: {
                     message: t.change.language.message,
                     cancel: true,
                     accept: true,
                     function: changeLanguage
                  }
               }}
            />
            <DividerField 
               label={t.change.name.label}
               modalUtils={{
                  formUtils: {
                     types: [TextFieldTypes.DEFAULT, TextFieldTypes.PASSWORD],
                     inputs: t.change.name.inputs,
                     handle: handleName,
                     isLoading,
                     successMessage,
                     setSuccessMessage,
                     setError,
                     errorParameters: {
                        first: error?.name ?? "",
                        second: error?.newPassword ?? ""
                     }
                  }
               }}
            />
            <DividerField 
               label={t.change.password.label}
               modalUtils={{
                  formUtils: {
                     types: [TextFieldTypes.PASSWORD, TextFieldTypes.PASSWORD],
                     inputs: t.change.password.inputs,
                     handle: handlePassword,
                     isLoading,
                     successMessage,
                     setSuccessMessage,
                     setError,
                     errorParameters: {
                        first: error?.oldPassword ?? "",
                        second: error?.newPassword ?? ""
                     }
                  }
               }}
            />
            <DividerField 
               label={t.change.email.label}
               modalUtils={{
                  formUtils: {
                     types: [TextFieldTypes.DEFAULT, TextFieldTypes.PASSWORD],
                     inputs: t.change.email.inputs,
                     handle: handleEmail,
                     isLoading,
                     successMessage,
                     setSuccessMessage,
                     setError,
                     errorParameters: {
                        first: error?.email ?? "",
                        second: error?.newPassword ?? ""
                     },
                     closeSession
                  }
               }}
            />
            <DividerField 
               label= {t.logout.label}
               modalUtils={{
                  messageUtils: {
                     message: t.logout.message,
                     cancel: true,
                     accept: true,
                     function: closeSession
                  }
               }}
            />
            <footer className="flex flex-col m-4 gap-2">
               <h2 className="text-xl font-normal font-sans underline underline-offset-4 text-onSurface dark:text-onSurface-dark">
                  {t.social.title}
               </h2>
               <div className="flex gap-4">
                  {socialLinks.map((socialLink) => (
                     <a 
                        key={socialLink.id}
                        rel="noreferrer"
                        target="_blank"
                        className="text-base font-sans font-normal text-onSurface dark:text-onSurface-dark hover:underline" 
                        href={socialLink.link}>
                           {socialLink.name}
                     </a>
                  ))}
               </div>
            </footer>
         </div>
         <div className="w-full h-20 md:w-fit md:h-fit">
            <Navbar page={Page.ACCOUNT} />
         </div>
      </section>
   );
};