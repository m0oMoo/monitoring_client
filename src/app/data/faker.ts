import { faker } from "@faker-js/faker";

export const generateFakeDashboard = () => {
  return {
    dashboardId: faker.string.uuid(),
    title: faker.commerce.productName(), // 랜덤 제목
    description: faker.lorem.sentence(), // 랜덤 설명
    createdAt: faker.date.past().toISOString(),
    updatedAt: faker.date.recent().toISOString(),
    charts: Array.from(
      { length: faker.number.int({ min: 3, max: 6 }) },
      () => ({
        chartId: faker.string.uuid(),
        title: faker.commerce.department(), // 차트 이름
        type: faker.helpers.arrayElement(["bar", "line", "pie", "doughnut"]),
        data: {
          labels: Array.from({ length: 6 }, () => faker.date.month()), // 6개월 데이터
          datasets: [
            {
              label: faker.commerce.productMaterial(),
              data: Array.from({ length: 6 }, () =>
                faker.number.int({ min: 10, max: 100 })
              ),
              backgroundColor: faker.color.rgb({ format: "css" }),
              borderColor: faker.color.rgb({ format: "css" }),
              borderWidth: 1,
            },
          ],
        },
      })
    ),
  };
};
