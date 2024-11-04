import { Link } from "react-router-dom";
import { headerMenuItems } from "@/config/index.js";

// Hooks
import { useSelector } from "react-redux";

// Components
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

// Icons
import { House, Menu, ShoppingCart } from "lucide-react";
import { Avatar, AvatarFallback } from "../ui/avatar";

console.log(headerMenuItems[0]);

const HeaderItems = () => {
  return (
    <nav className="flex flex-col mb-3 lg:mb-0 lg:items-center gap-6 lg:flex-row">
      {headerMenuItems.map((item) => {
        return (
          <Link to={item.path} className="text-sm font-medium" key={item.id}>
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
};

const HeaderRightContent = () => {
  return (
    <div className="flex flex-col gap-4 lg:items-center lg:flex-row">
      <Button variant={"outline"} size={"icon"}>
        <ShoppingCart className="w-6 h-6" />
      </Button>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Avatar className="bg-black">
            <AvatarFallback className="bg-black text-white font-extrabold uppercase">
              AB
            </AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent side="right" className="w-56">
          <DropdownMenuLabel>Logged in as</DropdownMenuLabel>
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
          </SheetContent>
        </Sheet>
        <div className="hidden lg:block">
          <HeaderItems />
        </div>
        {isAuthenticated ? (
          <div>
            <HeaderRightContent />
          </div>
        ) : null}
      </div>
    </header>
  );
};

export default Header;
