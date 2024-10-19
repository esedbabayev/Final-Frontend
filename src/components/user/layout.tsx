import { Outlet } from "react-router-dom";
import Header from "./Header";

const UserLayout = () => {
  return (
    <div className="flex flex-col overflow-hidden">
      {/* header */}
      <Header />
      <main className="flex flex-col w-full">
        <Outlet />
      </main>
    </div>
  );
};

export default UserLayout;
