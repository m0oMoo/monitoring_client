import { TabsProps } from "./tabs";

const TabsList: React.FC<TabsProps> = ({ children }) => (
  <div className="flex space-x-2 border-b border-gray-7 pb-2">{children}</div>
);
export default TabsList;
