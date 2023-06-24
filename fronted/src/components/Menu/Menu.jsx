/* eslint-disable react/prop-types */
import "./Menu.css"

export const Menu = ({ 
   text, 
   transactions, 
   setValue,
   handleClickOutside,
   setIsClicked,
   setHasText
}) => {
   if (transactions) {
      const buttons = transactions.filter((transaction) => 
         transaction.toLowerCase().includes(text.toLowerCase())).map((type) => 
            <button 
               key={type} 
               className="menu--state flex items-center w-full h-12 pl-3 text-onSurface text-sm font-sans font-medium"
               onClick={() => { 
                  setValue(type); 
               }}
               onFocus={() => setIsClicked(true)}
            >{type}</button>
      );

      return (
         <div 
            className="relative -bottom-[0.14rem] flex flex-col w-full bg-surface-container rounded"
            onClick={() => { 
               setIsClicked(false)
               setHasText(true);
               handleClickOutside(); 
            }}
            onFocus={() => setIsClicked(true)}
         >
            {buttons}
            <button className="h-0 text-xl text-onPrimary bg-onSurface focus:h-auto " onBlur={() => setIsClicked(false)}>Tab for exit</button>
         </div>
      );
   }
}
