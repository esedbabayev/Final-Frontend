import { AlignJustify, LogOut } from "lucide-react";
import { Button } from "../ui/button";

//Hooks
import { useDispatch } from "react-redux";

// Actions
import { logout } from "@/store/slices/auth-slice.js";

const Header = ({ setOpen }) => {
  const dispatch = useDispatch();

  const logoutHandler = () => {
    dispatch(logout());
  };

  return (
    <header className="flex items-center justify-between px-4 py-3 bg-background border-b">
      <Button onClick={() => setOpen(true)} className="lg:hidden sm:block">
        <AlignJustify />
        {/* <span className></span> */}
      </Button>
      <div className="flex flex-1 justify-end">
        <Button
          onClick={() => logoutHandler()}
          className="inline-flex gap-2 items-center rounded-md px-4 py-2 text-sm font-medium shadow"
        >
          <LogOut />
          Logout
        </Button>
      </div>
    </header>
  );
};

export default Header;
