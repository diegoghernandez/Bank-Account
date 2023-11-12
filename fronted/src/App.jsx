import { Navigate, Outlet, Route, Routes, useLocation } from "react-router-dom";
import { useAuth } from "./hooks/useAuth";
import { useTheme } from "./hooks/useTheme";
import { Suspense } from "react";
import { Bar } from "./components/Loader/Bar";
import { lazyLoad } from "./utils/lazyLoad";

const Home = lazyLoad("../pages/Home", "Home");
const Transaction = lazyLoad("../pages/Transaction", "Transaction");
const Transactions = lazyLoad("../pages/Transactions", "Transactions");
const Automation = lazyLoad("../pages/Automation", "Automation");
const Automations = lazyLoad("../pages/Automations", "Automations");
const UpdateAutomation = lazyLoad("../pages/UpdateAutomation", "UpdateAutomation");
const Account = lazyLoad("../pages/Account", "Account");
const SignIn = lazyLoad("../pages/SignIn", "SignIn");
const SignUp = lazyLoad("../pages/SignUp", "SignUp");
const Token = lazyLoad("../pages/Token", "Token");
const SavePassword = lazyLoad("../pages/SavePassword", "SavePassword");


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
