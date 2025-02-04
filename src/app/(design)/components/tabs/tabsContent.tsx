import { ReactNode } from "react";

interface TabsContentProps {
  value: string;
  activeTab: string;
  children: ReactNode;
}

const TabsContent: React.FC<TabsContentProps> = ({
  value,
  activeTab,
  children,
}) => (activeTab === value ? <div className="mt-4">{children}</div> : null);

export default TabsContent;
