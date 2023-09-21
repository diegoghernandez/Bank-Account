export const Card = ({
   name,
   money,
   period,
   disable = false
}) => {
   return (
      <article className={`w-full h-full cursor-pointer group`} >
         {!disable && <div className="absolute w-[calc(100%-1.8rem)] h-[6.5rem] -translate-y-[0.11rem] -translate-x-[0.08rem] rounded-xl bg-surface-container/38"></div>}
         <div className="grid grid-cols-1 grid-rows-1 w-full pt-1 outline outline-1 rounded-xl outline-outline hover:bg-onSurface/8 focus:bg-onSurface/12 group-hover:bg-onSurface/8" tabIndex="1">
            <div className="w-full col-start-1 col-end-2 row-start-1 row-end-2 flex flex-col pl-4 pb-1 justify-end items-start">
               <h2 className="w-full text-2xl font-sans font-bold overflow-hidden overflow-ellipsis whitespace-nowrap">{name}</h2>
               <p className="text-base font-sans font-semibold mt-auto">${money}</p>
            </div>
            <div className="col-start-2 col-end-3 row-start-1 row-end-3 w-auto h-auto flex justify-end items-start mt-2 pr-4">
               <figure className="flex justify-center items-center w-12 h-12 bg-primary-container rounded-full">
                  <svg className="fill-onPrimary-container" width="20" height="19" viewBox="0 0 20 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                     <path d="M0 16V14H2.75L2.35 13.65C1.48333 12.8833 0.875 12.0083 0.525 11.025C0.175 10.0417 0 9.05 0 8.05C0 6.2 0.554167 4.55417 1.6625 3.1125C2.77083 1.67083 4.21667 0.716667 6 0.25V2.35C4.8 2.78333 3.83333 3.52083 3.1 4.5625C2.36667 5.60417 2 6.76667 2 8.05C2 8.8 2.14167 9.52917 2.425 10.2375C2.70833 10.9458 3.15 11.6 3.75 12.2L4 12.45V10H6V16H0ZM17.925 7H15.9C15.8167 6.41667 15.6375 5.85833 15.3625 5.325C15.0875 4.79167 14.7167 4.28333 14.25 3.8L14 3.55V6H12V0H18V2H15.25L15.65 2.35C16.3333 3.05 16.8583 3.79167 17.225 4.575C17.5917 5.35833 17.825 6.16667 17.925 7ZM14 19L13.7 17.5C13.5 17.4167 13.3125 17.3292 13.1375 17.2375C12.9625 17.1458 12.7833 17.0333 12.6 16.9L11.15 17.35L10.15 15.65L11.3 14.65C11.2667 14.4167 11.25 14.2 11.25 14C11.25 13.8 11.2667 13.5833 11.3 13.35L10.15 12.35L11.15 10.65L12.6 11.1C12.7833 10.9667 12.9625 10.8542 13.1375 10.7625C13.3125 10.6708 13.5 10.5833 13.7 10.5L14 9H16L16.3 10.5C16.5 10.5833 16.6875 10.675 16.8625 10.775C17.0375 10.875 17.2167 11 17.4 11.15L18.85 10.65L19.85 12.4L18.7 13.4C18.7333 13.6 18.75 13.8083 18.75 14.025C18.75 14.2417 18.7333 14.45 18.7 14.65L19.85 15.65L18.85 17.35L17.4 16.9C17.2167 17.0333 17.0375 17.1458 16.8625 17.2375C16.6875 17.3292 16.5 17.4167 16.3 17.5L16 19H14ZM15 16C15.55 16 16.0208 15.8042 16.4125 15.4125C16.8042 15.0208 17 14.55 17 14C17 13.45 16.8042 12.9792 16.4125 12.5875C16.0208 12.1958 15.55 12 15 12C14.45 12 13.9792 12.1958 13.5875 12.5875C13.1958 12.9792 13 13.45 13 14C13 14.55 13.1958 15.0208 13.5875 15.4125C13.9792 15.8042 14.45 16 15 16Z"/>
                  </svg>
               </figure>
            </div>
            <div className="pl-4 col-start-1 col-end-3 row-start-3 row-end-4 w-full py-2 border-t border-outline">
               <p className="text-sm font-sans font-medium">{period}</p>
            </div>
         </div>
      </article>
   );
};
