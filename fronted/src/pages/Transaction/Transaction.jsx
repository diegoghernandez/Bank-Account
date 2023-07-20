import { Link } from "react-router-dom";
import { Filled } from "../../components/Buttons/Filled/Filled";
import { Outline } from "../../components/Buttons/Outline/Outline";
import { TextField } from "../../components/TextField/TextField";
import { InputTypes } from "../../constants/InputType";
import { TextFieldTypes } from "../../constants/TextFieldType";

export const Transaction = () => {
   return (
      <section className="flex flex-col gap-4 w-full h-screen px-4 justify-center items-center">
         <h1 className="text-4xl font-bold font-sans">Transaction</h1>
         <div className="flex flex-col items-center gap-3 w-full">
            <TextField
               label="Transaction Type"
               type={TextFieldTypes.Menu}
               inputType={InputTypes.Text}
               needSupportive={false}
            />
            <TextField
               label="Amount"
               type={TextFieldTypes.Default}
               inputType={InputTypes.Number}
               needSupportive={false}
            />
            <TextField
               label="Account to transfer"
               type={TextFieldTypes.Default}
               inputType={InputTypes.Number}
               needSupportive={true}
               supportiveText="Add the nine account numbers"
            />
         </div>
         <Filled label="Make transaction" />

         <Link className="w-full" to="/">
            <Outline label="Cancel" />
         </Link>
      </section>
   );
}