import { accountHandler } from "./domains/accountHandler";
import { authHandler } from "./domains/authHandler";
import { automationHandler } from "./domains/automationHandler";
import { transactionHandler } from "./domains/transactionHandler";


export const handlers = [
   ...authHandler,
   ...accountHandler,
   ...transactionHandler,
   ...automationHandler
];