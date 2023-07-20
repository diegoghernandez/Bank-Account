import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import { Home } from "./pages/Home/Home";
import { Transactions } from "./pages/Transactions/Transactions";
import { Automations } from "./pages/Automations/Automations";
import { Account } from "./pages/Account/Account";
import { Automation } from "./pages/Automation/Automation";
import { Transaction } from "./pages/Transaction/Transaction";
import { useAuth } from "./hooks/useAuth";
import { SignIn } from "./pages/SignIn/SignIn";
import { SignUp } from "./pages/SignUp/SignUp";

const ProtectedRoute = ({ children }) => {
   const { isAuthenticated } = useAuth();
   const location = useLocation();

   if (!isAuthenticated) {
      return <Navigate to="/sign-in" state={{ location }} />
   }

   return children;
}

function App() {
   return (
      <>
         <Routes>
            <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>}/>
            <Route path="/transaction" element={<ProtectedRoute><Transaction /></ProtectedRoute>}/>
            <Route path="/transactions" element={<ProtectedRoute><Transactions /></ProtectedRoute>}/>
            <Route path="/automations" element={<ProtectedRoute><Automations /></ProtectedRoute>}/>
            <Route path="/automation" element={<ProtectedRoute><Automation /></ProtectedRoute>}/>
            <Route path="/account" element={<ProtectedRoute><Account /></ProtectedRoute>}/>
            <Route path="/sign-in" element={<SignIn />} />
            <Route path="/sign-up" element={<SignUp />} />
         </Routes>
      </>
   )
}

export default App
