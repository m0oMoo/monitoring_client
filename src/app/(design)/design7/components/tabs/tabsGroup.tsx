import { TabsList } from "./tabsList";
import { TabsTrigger } from "./tabsTrigger";

const TabsGroup = () => {
  return (
    <>
      <TabsList className="flex space-x-3">
        <TabsTrigger
          value="dashboard1"
          className="pb-3 px-4 border-b-4 transition-all duration-200 text-gray-300 hover:text-white hover:border-white 
            data-[state=active]:border-white data-[state=active]:text-white font-semibold"
        >
          📊 대시보드 1
        </TabsTrigger>
        <TabsTrigger
          value="dashboard2"
          className="pb-3 px-4 border-b-4 transition-all duration-200 text-gray-300 hover:text-white hover:border-white 
            data-[state=active]:border-white data-[state=active]:text-white font-semibold"
        >
          📈 대시보드 2
        </TabsTrigger>
        <TabsTrigger
          value="dashboard3"
          className="pb-3 px-4 border-b-4 transition-all duration-200 text-gray-300 hover:text-white hover:border-white 
            data-[state=active]:border-white data-[state=active]:text-white font-semibold"
        >
          🔍 대시보드 3
        </TabsTrigger>
        <TabsTrigger
          value="dashboard4"
          className="pb-3 px-4 border-b-4 transition-all duration-200 text-gray-300 hover:text-white hover:border-white 
            data-[state=active]:border-white data-[state=active]:text-white font-semibold"
        >
          📉 대시보드 4
        </TabsTrigger>
        <TabsTrigger
          value="dashboard5"
          className="pb-3 px-4 border-b-4 transition-all duration-200 text-gray-300 hover:text-white hover:border-white 
            data-[state=active]:border-white data-[state=active]:text-white font-semibold"
        >
          📑 대시보드 5
        </TabsTrigger>
      </TabsList>
    </>
  );
};

export default TabsGroup;
