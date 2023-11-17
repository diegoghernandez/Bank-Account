import { Navigate, Outlet, Route, Routes, useLocation } from "react-router-dom";
import { useAuth } from "./hooks/useAuth";
import { useTheme } from "./hooks/useTheme";
import { Suspense, lazy } from "react";
import { Bar } from "./components/Loader/Bar";
import { Home } from "./pages/Home";
import { Transactions } from "./pages/Transactions";
import { Automations } from "./pages/Automations";
import { Account } from "./pages/Account";

/**
 * Wait a specific time to execute the resolve function
 * @param {Promise} promise the promise to executed in the period of time
 * @returns 
 */
const delay = async (promise) =>  {
   await new Promise(resolve => {
      setTimeout(resolve, 400);
   });
   return await promise;
};

// Change lazy load function to this for vite, to detect lazy load function in production build
const Transaction = lazy(async () => ({ default: (await delay((import("./pages/Transaction")))).Transaction }));
const Automation = lazy(async () => ({ default: (await delay((import("./pages/Automation")))).Automation }));
const UpdateAutomation = lazy(async () => ({ default: (await delay((import("./pages/UpdateAutomation")))).UpdateAutomation }));
const SignIn = lazy(async () => ({ default: (await delay((import("./pages/SignIn")))).SignIn }));
const SignUp = lazy(async () => ({ default: (await delay((import("./pages/SignUp")))).SignUp }));
const Token = lazy(async () => ({ default: (await delay((import("./pages/Token")))).Token }));
const SavePassword = lazy(async () => ({ default: (await delay((import("./pages/SavePassword")))).SavePassword }));

/**
 * Verify if the user is authenticated to send them to the desired page, 
 * otherwise is send to the sign in page
 * @param {object} props
 * @returns 
 */
const ProtectedRoute = ({ children }) => {
   const { isAuthenticated } = useAuth();
   const location = useLocation();
   useTheme();

   if (!isAuthenticated) {
      return <Navigate to="/sign-in" state={{ location }} />;
   }

   return children;
};

const LoadPage = () => {
   useTheme();

   return (
      <section className="flex justify-center items-center h-screen bg-white dark:bg-black">
         <div className="flex flex-col justify-center items-center max-w-prose">
            <h1 className="text-4xl font-bold font-sans text-onSurface dark:text-onSurface-dark">Loading ...</h1>
            <Bar />
         </div>
      </section>
   );
};

function App() {
   return (
      <>
         <Routes>
            <Route element={<Suspense fallback={<LoadPage />}><Outlet/></Suspense>}>
               <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>}/>
               <Route path="/transaction" element={<ProtectedRoute><Transaction /></ProtectedRoute>}/>
               <Route path="/transactions" element={<ProtectedRoute><Transactions /></ProtectedRoute>}/>
               <Route path="/automations" element={<ProtectedRoute><Automations /></ProtectedRoute>}/>
               <Route path="/automation" element={<ProtectedRoute><Automation /></ProtectedRoute>}/>
               <Route path="/update-automation" element={<ProtectedRoute><UpdateAutomation /></ProtectedRoute>}/>
               <Route path="/account" element={<ProtectedRoute><Account /></ProtectedRoute>}/>
               <Route path="/sign-in" element={<SignIn />} />
               <Route path="/sign-up" element={<SignUp />} />
               <Route path="/verify-registration" element={<Token />} />
               <Route path="/verify-email" element={<Token />} />
               <Route path="/save-password" element={<SavePassword />} />
            </Route>
         </Routes>
      </>
   );
}

export default App;
