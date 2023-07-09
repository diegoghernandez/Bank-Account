import { accountHandler } from "./domains/accountHandler";
import { transactionHandler } from "./domains/transactionHandler";


export const handlers = [
   ...transactionHandler,
   ...accountHandler
];