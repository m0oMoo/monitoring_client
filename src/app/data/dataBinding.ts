export const MOCK_DATA: { [key: string]: { [key: string]: number[] } } = {
  users: {
    id: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    age: [25, 32, 28, 40, 36, 50, 22, 30, 29, 41],
    login_count: [10, 15, 20, 25, 5, 12, 9, 18, 30, 22],
  },
  orders: {
    order_id: [101, 102, 103, 104, 105, 106, 107, 108, 109, 110],
    price: [1200, 800, 600, 300, 100, 500, 450, 750, 900, 650],
    quantity: [1, 2, 5, 3, 4, 6, 2, 3, 4, 5],
    discount: [10, 15, 5, 20, 25, 10, 30, 5, 15, 8],
  },
  products: {
    product_id: [201, 202, 203, 204, 205, 206, 207, 208, 209, 210],
    stock: [50, 100, 30, 70, 90, 20, 80, 60, 40, 110],
    rating: [4.5, 4.2, 3.8, 4.7, 4.0, 3.5, 4.9, 3.9, 4.1, 4.3],
  },
  sales: {
    month: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    revenue: [5000, 6000, 7000, 8000, 7500, 8500, 9000, 9500, 7200, 8800],
    profit: [1200, 1500, 1600, 1700, 1800, 2100, 2300, 2500, 2000, 2200],
    units_sold: [50, 60, 70, 80, 75, 85, 90, 95, 72, 88],
  },
  traffic: {
    day: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    visitors: [500, 600, 700, 800, 900, 1000, 750, 850, 920, 880],
    page_views: [1500, 1600, 1700, 1800, 1750, 1900, 2100, 2200, 1950, 2050],
    bounce_rate: [50, 45, 40, 42, 39, 38, 41, 43, 37, 36],
  },
  engagement: {
    post_id: [301, 302, 303, 304, 305, 306, 307, 308, 309, 310],
    likes: [100, 120, 140, 160, 180, 200, 220, 240, 260, 280],
    shares: [30, 25, 35, 40, 45, 50, 55, 60, 65, 70],
    comments: [20, 22, 24, 26, 28, 30, 32, 34, 36, 38],
  },
};

// ✅ 테이블 컬럼 매핑 (사용자가 선택할 수 있는 숫자 데이터만 포함)
export const COLUMNS: { [key: string]: string[] } = {
  users: ["id", "age", "login_count"],
  orders: ["order_id", "price", "quantity", "discount"],
  products: ["product_id", "stock", "rating"],
  sales: ["month", "revenue", "profit", "units_sold"],
  traffic: ["day", "visitors", "page_views", "bounce_rate"],
  engagement: ["post_id", "likes", "shares", "comments"],
};
