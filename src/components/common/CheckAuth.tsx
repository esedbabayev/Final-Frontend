import { ReactNode } from "react";

// react-router-dom
import { Navigate, useLocation } from "react-router-dom";

interface IProps {
  isAuthenticated: boolean;
  user: any;
  children: ReactNode;
}

const CheckAuth: React.FC<IProps> = ({ isAuthenticated, user, children }) => {
  const location = useLocation();

  //   isAuthenticated
  if (
    !isAuthenticated &&
    !(
      location.pathname.includes("/sign-in") ||
      location.pathname.includes("/sign-up")
    )
  ) {
    return <Navigate to="/auth/sign-in" />;
  }

  //   admin or user
  if (
    isAuthenticated &&
    (location.pathname.includes("/sign-in") ||
      location.pathname.includes("/sign-up"))
  ) {
    if (user?.role === "admin") {
      return <Navigate to="/admin/dashboard" />;
    } else {
      return <Navigate to="/shop/home" />;
    }
  }

  //   if not admin but tries to access admin page
  if (
    isAuthenticated &&
    user?.role !== "admin" &&
    location.pathname.includes("/admin")
  ) {
    return <Navigate to="/unauth-page" />;
  }

  //   if admin but tries to access user/shop page
  if (
    isAuthenticated &&
    user?.role === "admin" &&
    location.pathname.includes("/shop")
  ) {
    return <Navigate to="/admin/dashboard" />;
  }

  return <>{children}</>;
};

export default CheckAuth;
