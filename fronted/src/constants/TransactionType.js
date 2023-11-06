import { getTraduction } from "../utils/getTraduction";
import { Traduction } from "./Traduction";

const t = getTraduction(Traduction.TRANSACTION_TYPE);

/**
 * Enum to indicate the which transaction type will be used
 * @enum {Object} 
 * @readonly
 */
export const TransactionType = Object.freeze({
   DEPOSIT: Symbol(t.deposit),
   ONLINE_PAYMENT: Symbol(t.onlinePayment),
   WIRE_TRANSFER: Symbol(t.wireTransfer)
});