import { getTraduction } from "../utils/getTraduction";
import { Traduction } from "./Traduction";

const t = getTraduction(Traduction.TRANSACTION_TYPE);

export const TransactionType = Object.freeze({
   DEPOSIT: Symbol(t.deposit),
   ONLINE_PAYMENT: Symbol(t.onlinePayment),
   WIRE_TRANSFER: Symbol(t.wireTransfer)
});