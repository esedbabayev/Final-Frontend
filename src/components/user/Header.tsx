import { Link } from "react-router-dom";

// Hooks
import { useSelector } from "react-redux";

// Components
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import { Button } from "../ui/button";

// Icons
import { House, Menu } from "lucide-react";

const Header = () => {
  const { isAuthenticated } = useSelector((state) => state.auth);

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
          <SheetContent side="left" className="w-full max-w-xs"></SheetContent>
        </Sheet>
        <div className="hidden lg:block"></div>
        {isAuthenticated ? <div></div> : null}
      </div>
    </header>
  );
};

export default Header;
