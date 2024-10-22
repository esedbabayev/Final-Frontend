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
import UserLayout from "./components/user/layout";
import NotFound from "./pages/not-found/NotFound";
import UnAuthPage from "./pages/unauth/UnAuthPage";
import Home from "./pages/user/Home";
import ProductListing from "./pages/user/ProductListing";
import Checkout from "./pages/user/Checkout";
import Account from "./pages/user/Account";

// Check Auth
import CheckAuth from "./components/common/CheckAuth";


function App() {
  const isAuthenticated = true;
  const user = {
    name: "asad",
    role: "user",
  };

  return (
    <div className="flex flex-col overflow-hidden bg-white">
      <Routes>
        {/* auth routes */}
        <Route
          path="/auth"
          element={
            <CheckAuth isAuthenticated={isAuthenticated} user={user}>
              <AuthLayout />
            </CheckAuth>
          }
        >
          <Route path="sign-in" element={<Login />} />
          <Route path="sign-up" element={<SignIn />} />
        </Route>
        {/* admin routes */}
        <Route
          path="/admin"
          element={
            <CheckAuth isAuthenticated={isAuthenticated} user={user}>
              <AdminLayout />
            </CheckAuth>
          }
        >
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="products" element={<Products />} />
          <Route path="orders" element={<Orders />} />
          <Route path="features" element={<Features />} />
        </Route>
        {/* shopping & user routes */}
        <Route
          path="/shop"
          element={
            <CheckAuth isAuthenticated={isAuthenticated} user={user}>
              <UserLayout />
            </CheckAuth>
          }
        >
          <Route path="home" element={<Home />} />
          <Route path="product-listing" element={<ProductListing />} />
          <Route path="checkout" element={<Checkout />} />
          <Route path="account" element={<Account />} />
        </Route>
        {/* not found route */}
        <Route path="*" element={<NotFound />} />
        <Route path="/unauth-page" element={<UnAuthPage />} />
      </Routes>
    </div>
  );
}

export default App;
