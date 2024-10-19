import "./index.css";

import { Route, Routes } from "react-router-dom";

// Components
import AuthLayout from "./components/auth/layout";
import Login from "./pages/auth/SignIn";
import SignIn from "./pages/auth/SignUp";
import AdminLayout from "./components/admin/layout";
import Dashboard from "./pages/admin/Dashboard";
import Products from "./pages/admin/Products";
import Orders from "./pages/admin/Orders";
import Features from "./pages/admin/Features";

function App() {
  return (
    <div className="flex flex-col overflow-hidden bg-white">
      <h1 className="text-red-600">header</h1>

      <Routes>
        <Route path="/auth" element={<AuthLayout />}>
          <Route path="sign-in" element={<Login />} />
          <Route path="sign-up" element={<SignIn />} />
        </Route>
        <Route path="/admin" element={<AdminLayout />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="products" element={<Products />} />
          <Route path="orders" element={<Orders />} />
          <Route path="features" element={<Features />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
