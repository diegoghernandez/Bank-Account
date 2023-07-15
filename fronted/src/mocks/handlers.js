import { accountHandler } from "./domains/accountHandler";
import { automationHandler } from "./domains/automationHandler";
import { transactionHandler } from "./domains/transactionHandler";


export const handlers = [
   ...accountHandler,
   ...transactionHandler,
   ...automationHandler
];