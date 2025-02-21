import prometheus from "@/app/image/db/prometheus.svg";
import elasticsearch from "@/app/image/db/elasticsearch.svg";
import influxdb from "@/app/image/db/influxdb.svg";
import mysql from "@/app/image/db/mysql.svg";
import postgresql from "@/app/image/db/postgresql.svg";
import { StaticImageData } from "next/image";

interface DataSourceType {
  id: number;
  name: string;
  imageUrl: string | StaticImageData;
  link: string;
}

export const DATA_SOURCE: DataSourceType[] = [
  {
    id: 1,
    name: "Prometheus",
    imageUrl: prometheus,
    link: "/prometheus",
  },
  {
    id: 2,
    name: "Elasticsearch",
    imageUrl: elasticsearch,
    link: "/elasticsearch",
  },
  {
    id: 3,
    name: "InfluxDB",
    imageUrl: influxdb,
    link: "/influxdb",
  },
  { id: 4, name: "MySQL", imageUrl: mysql, link: "/mysql" },
  {
    id: 5,
    name: "PostgreSQL",
    imageUrl: postgresql,
    link: "/postgresql",
  },
];
