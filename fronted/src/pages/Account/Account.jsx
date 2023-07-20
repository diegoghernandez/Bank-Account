import { DividerField } from "../../components/Divider/DividerField/DividerField";
import { Switch } from "../../components/Switch/Switch";

export const Account = () => {
   return (
      <main>
         <h1 className="ml-4 mt-8 text-4xl font-sans font-bold">Name</h1>
         <p className="ml-4 mt-3 text-base font-sans font-normal">Account Number</p>

         <div className="w-full px-4 py-2 mt-8 border-b border-outline-variant">
            <Switch 
               label="Dark Mode"
               status="default"
               selected={false}
            />
         </div>
         <DividerField label="Change password" />
         <DividerField label="Change email" />
         <DividerField label="Change name" />
         <DividerField label="Logout" />
      </main>
   );
}