import { Outlet } from "react-router-dom";
import { useState } from "react";

// Components
import SideBar from "./sideBar";
import Header from "./header";

const AdminLayout = () => {
  const [openSidebar, setOpenSidebar] = useState(false);

  return (
    <div className="flex min-h-screen w-full">
      {/* sidebar */}
      <SideBar open={openSidebar} setOpen={setOpenSidebar} />
      <div className="flex flex-1 flex-col">
        {/* header */}
        <Header setOpen={setOpenSidebar} />
        <main className="flex flex-col flex-1 bg-amber-500 p-4 md:p-6 ">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
