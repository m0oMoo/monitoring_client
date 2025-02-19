import { LayoutGrid, FileText } from "lucide-react";

const LeftMenu = () => {
  return (
    <nav
      className="w-60 bg-[#fdfdf4] p-4 shadow-xl h-full flex flex-col space-y-4
    border-r border-0.5 border-navy-border"
    >
      <div className="flex items-center space-x-2">
        <span className="text-lg font-semibold text-navy-text">Menu</span>
      </div>
      <div className="flex flex-col space-y-3 mt-4 text-base">
        <div
          className="flex items-center space-x-2 cursor-pointer 
          text-navy-text_disable hover:text-navy-text"
        >
          <LayoutGrid className="w-4 h-4 " />
          <span>Dashboard</span>
        </div>
        <div
          className="flex items-center space-x-2 cursor-pointer 
        text-navy-text_disable hover:text-navy-text"
        >
          <FileText className="w-4 h-4 " />
          <span>Reports</span>
        </div>
      </div>
    </nav>
  );
};

export default LeftMenu;
