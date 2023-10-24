import { useEffect, useRef, useState } from "react";
import { getTraduction } from "../../utils/getTraduction";
import { Link, useSearchParams } from "react-router-dom";
import { Traduction } from "../../constants/Traduction";
import { resendVerificationToken, verifyRegistration } from "../_services/auth";
import { Spin } from "../../components/Loader/Spin";
import { SEO } from "../../utils/SEO";
import { Modal } from "../../components/Modal";

export const Token = () => {
   const [message, setMessage] = useState("");
   const [searchParams] = useSearchParams();
   const dialogRef = useRef();
   const t = getTraduction(Traduction[searchParams.get("traduction")]);

   useEffect(() => {
      verifyRegistration(searchParams.get("token"))
         .then((response) => setMessage(response))
         .catch((text) => setMessage(text.message));
   }, []);

   return (
      <section className="flex justify-center items-center h-screen">
         <div className="flex flex-col justify-center items-center gap-2 w-full max-w-[75ch] h-full px-4 mx-auto border border-outline-variant
         bg-white md:rounded-2xl md:px-6 md:py-8 md:h-fit dark:border-outline-variant dark:bg-black">
            <SEO title={t.seo.title} />
            <h1 className="text-4xl font-bold font-sans text-onSurface dark:text-onSurface-dark">{t.title}</h1>
            {!message && <Spin />}
            <p className="text-xl font-sans font-normal text-onSurface-variant dark:text-onSurface-variant-dark">{t.description[message]}</p>
            {(message && message !== "invalid") &&
               <div className="text-lg font-normal font-sans text-primary dark:text-primary-dark cursor-pointer hover:underline">
                  {(message === "valid") && 
                     <Link to="/sign-in">
                        {t.button.valid}
                     </Link>
                  }
                  {(message === "expired") && 
                     <button onClick={() => {
                        resendVerificationToken(searchParams.get("token"));
                        dialogRef.current?.showModal?.();
                     }}>
                        {t.button.expired}
                     </button>
                  }
               </div>
            }

            <Modal 
               title={t.modal.title}
               dialogRef={dialogRef}
               messageUtils={{
                  message: t.modal.message,
               }}
            />
         </div>
      </section>
   );
};