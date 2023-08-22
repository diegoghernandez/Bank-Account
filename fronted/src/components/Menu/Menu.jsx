import "./Menu.css"

export const Menu = ({ 
   parameters, 
   setValue,
   handleClickOutside,
   setIsClicked,
   isChange,
   setIsChange,
   setIsShowMenu
}) => {
   if (parameters) {
      const buttons = parameters.map((type) => 
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
               setIsShowMenu(false);
               handleClickOutside(); 
            }}
            onFocus={() => setIsClicked(true)}
         >
            {buttons}
            <button 
               className="h-0 text-transparent focus:text-xl focus:text-onPrimary focus:bg-onSurface focus:h-auto" 
               onBlur={() => {
                  setIsClicked(false);
                  setIsShowMenu(false);
               }
            }>Tab for exit</button>
         </div>
      );
   }
}
