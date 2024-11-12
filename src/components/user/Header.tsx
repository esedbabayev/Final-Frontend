import { Link, useNavigate } from "react-router-dom";
import { headerMenuItems } from "@/config/index.js";

// Actions
import { logout } from "@/store/slices/auth-slice.js";
import { getCartItems } from "@/store/user/cart.slice.js";

// Hooks
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

// Components
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Label } from "../ui/label";
import CartHolder from "./CartHolder";

// Icons
import { House, LogOut, Menu, ShoppingCart, User } from "lucide-react";
import { Avatar, AvatarFallback } from "../ui/avatar";

// console.log(headerMenuItems[0]);

const HeaderItems = () => {
  const navigate = useNavigate();

  const navigateToListingPageHandler = (currentItem) => {
    localStorage.removeItem("filters");

    const currentFilter =
      currentItem.id !== "home"
        ? {
            category: [currentItem.id],
          }
        : null;
    localStorage.setItem("filters", JSON.stringify(currentFilter));
    navigate(currentItem.path);
  };

  return (
    <nav className="flex flex-col mb-3 lg:mb-0 lg:items-center gap-6 lg:flex-row">
      {headerMenuItems.map((item) => {
        return (
          <Label
            className="text-sm font-medium cursor-pointer"
            key={item.id}
            onClick={() => navigateToListingPageHandler(item)}
          >
            {item.label}
          </Label>
        );
      })}
    </nav>
  );
};

const HeaderRightContent = () => {
  const { user } = useSelector((state) => state.auth);

  const { cartItems } = useSelector((state) => state.cart);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const logoutHandler = () => {
    dispatch(logout());
  };

  useEffect(() => {
    dispatch(getCartItems(user?.id));
  }, [dispatch]);

  const [openCartSheet, setOpenCartSheet] = useState(false);

  return (
    <div className="flex flex-col gap-4 lg:items-center lg:flex-row">
      <Sheet open={openCartSheet} onOpenChange={() => setOpenCartSheet(false)}>
        <Button
          onClick={() => setOpenCartSheet(true)}
          variant={"outline"}
          size={"icon"}
        >
          <ShoppingCart className="w-6 h-6" />
        </Button>
        <CartHolder
          setOpenCartSheet={setOpenCartSheet}
          cartItems={
            cartItems && cartItems.items && cartItems.items.length > 0
              ? cartItems.items
              : []
          }
        />
      </Sheet>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Avatar className="bg-black">
            <AvatarFallback className="bg-black text-white font-extrabold uppercase">
              {user?.userName[0]}
            </AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent side="right" className="w-56">
          <DropdownMenuLabel>Logged in as {user?.userName}</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => navigate("/shop/account")}>
            <User className="mr-2 h-4 w-4" />
            Account
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={logoutHandler}>
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

const Header = () => {
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  console.log(isAuthenticated, user, "isAuthenticated, user");

  return (
    <header className="sticky top-0 z-40 border-b">
      <div className="flex h-16 items-center justify-between px-4 md:px-6">
        <Link to="/shop/home" className="flex items-center gap-2">
          <House className="h-6 w-6" />
          <span className="font-bold">AB</span>
        </Link>
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="lg:hidden">
              <Menu className="w-6 h-6" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-full max-w-xs">
            <HeaderItems />
            <HeaderRightContent />
          </SheetContent>
        </Sheet>
        <div className="hidden lg:block">
          <HeaderItems />
        </div>
        <div className="hidden lg:block">
          <HeaderRightContent />
        </div>
      </div>
    </header>
  );
};

export default Header;
