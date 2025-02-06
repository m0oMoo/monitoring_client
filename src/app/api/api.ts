import { generateFakeDashboard } from "../data/faker";

export const fetchDashboardData = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(generateFakeDashboard());
    }, 1000); // 1초 후 데이터 반환 (API 지연 효과)
  });
};
