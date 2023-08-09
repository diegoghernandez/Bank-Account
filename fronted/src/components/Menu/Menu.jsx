import "./Menu.css"

export const Menu = ({ 
   text, 
   transactions, 
   setValue,
   handleClickOutside,
   setIsClicked,
   setHasText,
   isChange,
   setIsChange
}) => {
   if (transactions) {
      const buttons = transactions.filter((transaction) => 
         transaction?.toLowerCase?.().includes(text.toLowerCase())).map((type) => 
            <button 
               key={type} 
               className="menu--state flex items-center w-auto h-12 px-3 text-onSurface text-sm font-sans font-medium"
               onClick={() => { 
                  setValue(type); 
                  setIsChange(!isChange);
               }}
               onFocus={() => setIsClicked(true)}
            >{type}</button>
      );

      return (
         <div 
            className="absolute w-[calc(100%-2rem)] z-20 translate-y-[3.7rem] flex flex-col bg-surface-container bg rounded"
            onClick={() => { 
               setIsClicked(false)
               setHasText(true);
               handleClickOutside(); 
            }}
            onFocus={() => setIsClicked(true)}
         >
            {buttons}
            <button className="h-0 text-transparent focus:text-xl focus:text-onPrimary focus:bg-onSurface focus:h-auto" onBlur={() => setIsClicked(false)}>Tab for exit</button>
         </div>
      );
   }
}
