"use client";

import React, { Suspense } from "react";
import DetailDashboard from "../detail/content/detailDashboard";

const DashboardDetailPage = () => {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <DetailDashboard />
    </Suspense>
  );
};

export default DashboardDetailPage;
