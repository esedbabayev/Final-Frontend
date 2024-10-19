import { Outlet } from "react-router-dom";

// Components
import SideBar from "./sideBar";
import Header from "./header";

const AdminLayout = () => {
  return (
    <div className="flex min-h-screen w-full">
      {/* sidebar */}
      <SideBar />
      <div className="flex flex-1 flex-col">
        {/* header */}
        <Header />
        <main className="flex flex-1 bg-amber-500 p-4 md:p-6 ">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
