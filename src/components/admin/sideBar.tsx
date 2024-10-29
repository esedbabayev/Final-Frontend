import { Fragment } from "react";
import { useNavigate } from "react-router-dom";

// Icons
import {
  ChartNoAxesColumnIncreasing,
  ClipboardList,
  PackageSearch,
  Sheet,
  Shield,
} from "lucide-react";

const adminSidebarItems = [
  {
    id: "dashboard",
    label: "Dashboard",
    path: "/admin/dashboard",
    icon: <ChartNoAxesColumnIncreasing />,
  },
  {
    id: "products",
    label: "Products",
    path: "/admin/products",
    icon: <PackageSearch />,
  },
  {
    id: "orders",
    label: "Orders",
    path: "/admin/orders",
    icon: <ClipboardList />,
  },
];

const SidebarItems = () => {
  const navigate = useNavigate();
  return (
    <nav className="mt-8 flex-col flex gap-2">
      {adminSidebarItems.map((sidebarItem) => (
        <div
          key={sidebarItem.id}
          onClick={() => navigate(sidebarItem.path)}
          className="flex text-xl items-center gap-2 rounded-md px-3 py-2 cursor-pointer hover:bg-amber-500"
        >
          {sidebarItem.icon}
          <span>{sidebarItem.label}</span>
        </div>
      ))}
    </nav>
  );
};

const SideBar = ({open, setOpen}) => {
  const navigate = useNavigate();
  return (
    <>
    <Sheet>

    </Sheet>
      <aside className="hidden w-64 flex-col border-r bg-background p-6 lg:flex">
        <div
          onClick={() => navigate("/admin/dashboard")}
          className="flex items-center gap-2 cursor-pointer"
        >
          <Shield size={30} />
          <h1 className="text-2xl font-extrabold">Admin Panel</h1>
        </div>
        <SidebarItems />
      </aside>
    </>
  );
};

export default SideBar;
