import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Dashboard from "./pages/Dashboard";
import TopUp from "./pages/Topup";
import Payment from "./pages/Payment";


const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/topup" element={<TopUp />} />
        <Route path="/payment" element={<Payment />} /> 
      </Routes>
    </Router>
  );
};

export default AppRoutes;
