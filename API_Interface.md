## 📌Dashboard API 명세서
> 다양한 대시보드 생성, 조회, 수정, 삭제 기능을 제공하는 RESTful API입니다.

## 🔧**API 목록**

| 인터페이스명 | 인터페이스 ID | API 명 | API 설명 | Method | URI |
| --- | --- | --- | --- | --- | --- |
| **Dashboard List 조회** | DB0001 | Dashboard List 조회 | Dashboard 전체 List를 조회 | GET | `/api/v1.0/dashboards` |
| **Dashboard 생성** | DB0002 | Dashboard 생성 | Dashboard를 생성한다. | POST | `/api/v1.0/dashboards` |
| **Dashboard 수정** | DB0003 | Dashboard 수정 | Dashboard를 수정한다. | PUT | `/api/v1.0/dashboards/{dashboardId}` |
| **Dashboard 삭제** | DB0004 | Dashboard 삭제 | Dashboard를 삭제한다. | DELETE | `/api/v1.0/dashboards/{dashboardId}` |
| **Dashboard Chart List 조회** | DB0005 | Dashboard Chart List 조회 | Dashboard의 전체 Chart List를 조회한다. | GET | `/api/v1.0/dashboards/{dashboardId}/charts` |
| **Chart 상세 조회** | DB0006 | Chart 상세 조회 | Chart를 상세 조회한다. | GET | `/api/v1.0/charts/{chartId}` |
| **Chart 상세 수정** | DB0007 | Chart 상세 수정 | Chart 상세 정보를 수정한다. | PUT | `/api/v1.0/charts/{chartId}` |
| **Chart 생성** | DB0008 | Chart 생성 | Dashboard의 Chart를 생성한다. | POST | `/api/v1.0/dashboards/{dashboardId}/charts` |
| **Chart 삭제** | DB0009 | Chart 삭제 | Chart를 삭제한다. | DELETE | `/api/v1.0/charts/{chartId}` |
| **Chart 복제** | DB0010 | Chart 복제 | 특정 Chart를 복제한다. | POST | `/api/v1.0/dashboards/{dashboardId}/charts/{chartId}/duplicate` |
| **Dashboard 복제** | DB0011 | Dashboard 복제 | 특정 Dashboard를 복제한다. | POST | `/api/v1.0/dashboards/{dashboardId}/duplicate` |

---

## Dashboard List 조회

**API 설명**

- Dashboard 전체 List를 조회합니다.

**URI**

- `GET /api/v1.0/dashboards`

**요청 예시**

```json
GET /api/v1.0/dashboards
Header:
{
  "searchParam": "dashboard"
}
```

**응답 예시**

```json
{
  "dashboards": [
    {
      "dashboardId": "dashboard_123",
      "title": "매출 분석",
      "description": "매출과 사용자 분석을 위한 대시보드"
    }
  ]
}
```

**필수 파라미터**

| 파라미터명 | 설명 | 타입 | 필수 | 예시 |
| --- | --- | --- | --- | --- |
| `searchParam` | 대시보드 검색어 | String | No | "dashboard" |

**응답 파라미터**

| 파라미터명 | 설명 | 타입 | 필수 | 예시 |
| --- | --- | --- | --- | --- |
| `dashboardId` | 대시보드 ID | String | Yes | "dashboard_123" |
| `title` | 대시보드 제목 | String | Yes | "매출 분석" |
| `description` | 대시보드 설명 | String | Yes | "매출과 사용자 분석을 위한 대시보드" |

---

## Dashboard 생성

**API 설명**

- Dashboard를 생성합니다.

**URI**

- `POST /api/v1.0/dashboards`

**요청 예시**

```json
POST /api/v1.0/dashboards
Header:
{
  "title": "모니터링 대시보드",
  "description": "매출과 사용자 분석을 위한 대시보드"
}
```

**응답 예시**

```json
{
  "dashboardId": "dashboard_124",
  "title": "모니터링 대시보드",
  "description": "매출과 사용자 분석을 위한 대시보드"
}
```

**필수 파라미터**

| 파라미터명 | 설명 | 타입 | 필수 | 예시 |
| --- | --- | --- | --- | --- |
| `title` | 대시보드 제목 | String | Yes | "모니터링 대시보드" |
| `description` | 대시보드 설명 | String | No | "매출과 사용자 분석을 위한 대시보드" |

---

## Dashboard 수정

**API 설명**

- Dashboard를 수정합니다.

**URI**

- `PUT /api/v1.0/dashboards/{dashboardId}`

**요청 예시**

```json
PUT /api/v1.0/dashboards/dashboard_001
Header:
{
  "title": "업데이트된 대시보드",
  "description": "새로운 설명"
}
```

**응답 예시**

```json
{
  "dashboardId": "dashboard_124",
  "title": "업데이트된 대시보드",
  "description": "매출과 사용자 분석을 위한 대시보드 업데이트"
}
```

**필수 파라미터**

| 파라미터명 | 설명 | 타입 | 필수 | 예시 |
| --- | --- | --- | --- | --- |
| `dashboardId` | 대시보드 ID (Path Parameter) | String | Yes | "dashboard_001" |
| `title` | 대시보드 제목 | String | Yes | "업데이트된 대시보드" |
| `description` | 대시보드 설명 | String | No | "새로운 설명" |

---

## Dashboard 삭제

**API 설명**

- Dashboard를 삭제합니다.

**URI**

- `DELETE /api/v1.0/dashboards/{dashboardId}`

**요청 예시**

```json
DELETE /api/v1.0/dashboards/dashboard_001
```

**응답 예시**

```json
{
  "message": "Dashboard deleted successfully"
}
```

**필수 파라미터**

| 파라미터명 | 설명 | 타입 | 필수 | 예시 |
| --- | --- | --- | --- | --- |
| `dashboardId` | 대시보드 ID (Path Parameter) | String | Yes | "dashboard_001" |

---

## Dashboard Chart List 조회

**API 설명**

- Dashboard의 전체 Chart List를 조회합니다.

**URI**

- `GET /api/v1.0/dashboards/{dashboardId}/charts`

**요청 예시**

```json
GET /api/v1.0/dashboards/dashboard_001/charts
```

**응답 예시**

```json
{
  "chartData": [
    {
      "chartId": "chart_001",
      "title": "매출 분석",
      "dataSourceType": "API",
      "dataSourceConfig": {
        "apiUrl": "https://api.example.com/users",
        "query": "SELECT date, revenue FROM sales WHERE date >= CURDATE() - INTERVAL 7 DAY"
      },
      "datasets": [
        {
          "name": "Dataset 1",
          "data": [
            { "label": "Jan", "value": 50 },
            { "label": "Feb", "value": 75 }
          ],
          "color": [
            "rgba(255, 99, 132, 0.5)",
            "rgba(255, 159, 64, 0.5)"
          ]
        }
      ],
      "options": {
        "chartType": "pie",
        "showLegend": true,
        "legendPosition": "top",
        "titleText": "Sales Data",
        "titleColor": "#00ff00"
      }
    }
  ]
}
```

**필수 파라미터**

| 파라미터명 | 설명 | 타입 | 필수 | 예시 |
| --- | --- | --- | --- | --- |
| `dashboardId` | 대시보드 ID (Path Parameter) | String | Yes | "dashboard_001" |

---

## Chart 상세 조회

**API 설명**

- Chart를 상세 조회합니다.

**URI**

- `GET /api/v1.0/charts/{chartId}`

**요청 예시**

```json
GET /api/v1.0/charts/chart_001
```

**응답 예시**

```json
{
  "chartId": "chart_002",
  "title": "사용자 증가율",
  "dataSourceType": "API",
  "dataSourceConfig": {
    "apiUrl": "https://api.example.com/users"
  },
  "datasets": [
    {
      "name": "가입자 수",
      "data": [
        { "label": "2024-02-01", "value": 100 },
        { "label": "2024-02-02", "value": 120 }
      ]
    }
  ]
}
```

**필수 파라미터**

| 파라미터명 | 설명 | 타입 | 필수 | 예시 |
| --- | --- | --- | --- | --- |
| `chartId` | 차트 ID (Path Parameter) | String | Yes | "chart_001" |

---

## Chart 상세 수정

**API 설명**

- Chart 상세를 수정합니다.

**URI**

- `PUT /api/v1.0/charts/{chartId}`

**요청 예시**

```json
PUT /api/v1.0/charts/chart_001
Header:
{
  "title": "업데이트된 차트",
  "dataSourceType": "API",
  "dataSourceConfig": {
    "apiUrl": "https://api.example.com/newdata"
  }
}
```

**응답 예시**

```json
{
  "chartId": "chart_001",
  "title": "업데이트된 차트"
}
```

**필수 파라미터**

| 파라미터명 | 설명 | 타입 | 필수 | 예시 |
| --- | --- | --- | --- | --- |
| `chartId` | 차트 ID (Path Parameter) | String | Yes | "chart_001" |
| `title` | 차트 제목 | String | Yes | "업데이트된 차트" |

---

## Chart 생성

**API 설명**

- Dashboard의 Chart를 생성합니다.

**URI**

- `POST /api/v1.0/dashboards/{dashboardId}/charts`

**요청 예시**

```json
POST /api/v1.0/dashboards/dashboard_001/charts
Header:
{
  "title": "새로운 차트",
  "dataSourceType": "SQL",
  "dataSourceConfig": {
    "query": "SELECT * FROM sales"
  }
}
```

**응답 예시**

```json
{
  "message": "Chart created successfully"
}
```

**필수 파라미터**

| 파라미터명 | 설명 | 타입 | 필수 | 예시 |
| --- | --- | --- | --- | --- |
| `title` | 차트 제목 | String | Yes | "새로운 차트" |
| `dataSourceType` | 데이터 소스 타입 (API, SQL 등) | String | Yes | "SQL" |

---

## Chart 삭제

**API 설명**

- Chart를 삭제합니다.

**URI**

- `DELETE /api/v1.0/charts/{chartId}`

**요청 예시**

```json
DELETE /api/v1.0/charts/chart_001
```

**응답 예시**

```json
{
  "message": "Chart deleted successfully"
}
```

**필수 파라미터**

| 파라미터명 | 설명 | 타입 | 필수 | 예시 |
| --- | --- | --- | --- | --- |
| `chartId` | 차트 ID (Path Parameter) | String | Yes | "chart_001" |

---

## Chart 복제

**API 설명**

- 특정 Dashboard에 Chart를 복제합니다.

**URI**

- `POST /api/v1.0/dashboards/{dashboardId}/charts/{chartId}/duplicate`

**요청 예시**

```json
POST /api/v1.0/dashboards/dashboard_001/charts/chart_001/duplicate
```

**응답 예시**

```json
{
  "chartId": "chart_010",
  "title": "매출 분석_copy"
}
```

**필수 파라미터**

| 파라미터명 | 설명 | 타입 | 필수 | 예시 |
| --- | --- | --- | --- | --- |
| `chartId` | 차트 ID (Path Parameter) | String | Yes | "chart_001" |

---

## Dashboard 복제

**API 설명**

- Dashboard를 복제합니다.

**URI**

- `POST /api/v1.0/dashboards/{dashboardId}/duplicate`

**요청 예시**

```json
POST /api/v1.0/dashboards/dashboard_001/duplicate
```

**응답 예시**

```json
{
  "dashboardId": "dashboard_010",
  "title": "매출 분석_copy",
  "description": "매출과 사용자 분석을 위한 대시보드_copy"
}
```

**필수 파라미터**

| 파라미터명 | 설명 | 타입 | 필수 | 예시 |
| --- | --- | --- | --- | --- |
| `dashboardId` | 대시보드 ID (Path Parameter) | String | Yes | "dashboard_001" |

---

### chart options

→ `opion` 이 너무 많아서 명세서에 모두 정리하지 않았습니다.

```jsx
{
  datasets: [
    {
      name: "Dataset 1",
      data: [
        { label: "Jan", value: 50 },
        { label: "Feb", value: 75 },
        { label: "Mar", value: 100 },
        { label: "Apr", value: 125 },
        { label: "May", value: 150 },
      ],
      color: [
        "rgba(255, 99, 132, 0.5)",
        "rgba(255, 159, 64, 0.5)",
        "rgba(255, 205, 86, 0.5)",
        "rgba(75, 192, 192, 0.5)",
        "rgba(54, 162, 235, 0.5)",
      ],
    },
  ],
  options: {
    chartType: "pie",
    showLegend: true,
    legendPosition: "top",
    legendColor: "#ffffff",
    showTitle: true,
    titleText: "Sales Data",
    titleColor: "#00ff00",
    showTooltip: true,
    tooltipBgColor: "rgba(0,0,0,0.8)",
    tooltipMode: "index",
    layoutPadding: { top: 10, bottom: 20 },
    aspectRatio: 2,
    xAxisColor: "#ffffff",
    yAxisColor: "#ffffff",
    xGridDisplay: true,
    yGridColor: "rgba(255, 255, 255, 0.2)",
    ySuggestedMin: 0,
    ySuggestedMax: 200,
    interactionMode: "index",
    interactionIntersect: false,
    hoverMode: "nearest",
    animationDuration: 1000,
    animationEasing: "easeOutBounce",
  },
};
```
