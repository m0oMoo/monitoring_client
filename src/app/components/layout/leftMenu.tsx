"use client";

import { LayoutGrid, FileText, Database } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

const MENU = [
  { id: 1, title: "Dashboard", icon: LayoutGrid, link: "/dashboard2" },
  { id: 2, title: "Reports", icon: FileText, link: "/reports" },
  {
    id: 3,
    title: "Data Source",
    icon: Database,
    link: "/connection/dataSource",
  },
  {
    id: 4,
    title: "Create Dashboard",
    icon: LayoutGrid,
    link: "/d",
  },
];

const LeftMenu = () => {
  const router = useRouter();
  const pathname = usePathname();

  const handleMenuClick = (link: string) => {
    router.push(link);
  };

  return (
    <nav
      className="w-60 bg-ivory-bg_sub p-4 shadow-xl h-full flex flex-col space-y-4
    border-r border-0.5 border-navy-border"
    >
      <div className="flex items-center space-x-2">
        <span className="mb-6 text-title_sm text-navy-text">Menu</span>
      </div>
      <div className="flex flex-col space-y-4 text-base">
        {MENU.map((item) => (
          <div
            key={item.id}
            className={`flex items-center space-x-2 cursor-pointer pl-4 
              ${
                pathname === item.link
                  ? "text-primary border-l-2 border-navy-border text-bold_lg"
                  : "text-lg1 text-navy-text_disable"
              } 
              hover:text-navy-text`}
            onClick={() => handleMenuClick(item.link)}
          >
            <item.icon className="w-4 h-4" />
            <span>{item.title}</span>
          </div>
        ))}
      </div>
    </nav>
  );
};

export default LeftMenu;
