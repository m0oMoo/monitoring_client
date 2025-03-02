import { Suspense } from "react";
import DetailDashboard from "./content/detailDashboard";

const DashboardDetailPage = () => {
  return (
    <Suspense>
      <DetailDashboard />
    </Suspense>
  );
};

export default DashboardDetailPage;
