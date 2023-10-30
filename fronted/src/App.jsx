import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import { Home } from "./pages/Home";
import { Transactions } from "./pages/Transactions";
import { Automations } from "./pages/Automations";
import { Account } from "./pages/Account";
import { Automation } from "./pages/Automation";
import { Transaction } from "./pages/Transaction";
import { SignIn } from "./pages/SignIn";
import { SignUp } from "./pages/SignUp";
import { UpdateAutomation } from "./pages/UpdateAutomation";
import { useAuth } from "./hooks/useAuth";
import { useTheme } from "./hooks/useTheme";
import { Token } from "./pages/Token";
import { SavePassword } from "./pages/SavePassword";

const ProtectedRoute = ({ children }) => {
   const { isAuthenticated } = useAuth();
   const location = useLocation();
   useTheme();

   if (!isAuthenticated) {
      return <Navigate to="/sign-in" state={{ location }} />;
   }

   return children;
};

function App() {
   return (
      <>
         <Routes>
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
         </Routes>
      </>
   );
}

export default App;
