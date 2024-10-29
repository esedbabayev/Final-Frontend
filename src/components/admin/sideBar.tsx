import { useNavigate } from "react-router-dom";

// Icons
import {
  ChartNoAxesColumnIncreasing,
  ClipboardList,
  PackageSearch,
  Shield,
} from "lucide-react";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "../ui/sheet";

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

const SidebarItems = ({ setOpen }) => {
  const navigate = useNavigate();
  return (
    <nav className="mt-8 flex-col flex gap-2">
      {adminSidebarItems.map((sidebarItem) => (
        <div
          key={sidebarItem.id}
          onClick={() => {
            navigate(sidebarItem.path);
            setOpen ? setOpen(false) : null;
          }}
          className="flex text-xl items-center gap-2 rounded-md px-3 py-2 cursor-pointer hover:bg-amber-500"
        >
          {sidebarItem.icon}
          <span>{sidebarItem.label}</span>
        </div>
      ))}
    </nav>
  );
};

const SideBar = ({ open, setOpen }) => {
  const navigate = useNavigate();
  return (
    <>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent side="left" className="w-64">
          <div className="flex flex-col h-full">
            <SheetHeader className="border-b">
              <SheetTitle className="flex gap-2 mt-5 mb-5">
                <Shield size={30} />
                <h1 className="text-2xl font-extrabold">Admin Panel</h1>
              </SheetTitle>
            </SheetHeader>
            <SidebarItems setOpen={setOpen} />
          </div>
        </SheetContent>
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
