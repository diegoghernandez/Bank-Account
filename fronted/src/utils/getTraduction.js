import { Traduction } from "../constants/Traduction";
import modal from "../i18n/modal.json";
import navbar from "../i18n/navbar.json";
import loader from "../i18n/loader.json";
import transactionType from "../i18n/transaction-types.json";
import auth from "../i18n/auth.json";
import accountPage from "../i18n/account-page.json";
import automationPage from "../i18n/automation-page.json";
import automationsPage from "../i18n/automations-page.json";
import homePage from "../i18n/home-page.json";
import signInPage from "../i18n/sign-in-page.json";
import transactionPage from "../i18n/transaction-page.json";
import transactionsPage from "../i18n/transactions-page.json";

const language = localStorage.getItem("language") ?? navigator.language;

export const getTraduction = (wantedTranslation) => {
   const availableLanguage = language.includes("es") ? "es" : "en";
   
   switch (wantedTranslation) {
      case Traduction.MODAL:
         return modal[availableLanguage];
      case Traduction.NAVBAR:
         return navbar[availableLanguage];
      case Traduction.LOADER:
         return loader[availableLanguage];
      case Traduction.TRANSACTION_TYPE:
         return transactionType[availableLanguage];
      case Traduction.LOGIN:
         return auth[availableLanguage];
      case Traduction.ACCOUNT_PAGE: 
         return accountPage[availableLanguage];
      case Traduction.AUTOMATION_PAGE: 
         return automationPage[availableLanguage];
      case Traduction.AUTOMATIONS_PAGE: 
         return automationsPage[availableLanguage];
      case Traduction.HOME_PAGE: 
         return homePage[availableLanguage];
      case Traduction.SIGN_IN_PAGE: 
         return signInPage[availableLanguage];
      case Traduction.TRANSACTION_PAGE: 
         return transactionPage[availableLanguage];
      case Traduction.TRANSACTIONS_PAGE: 
         return transactionsPage[availableLanguage];
   }
};