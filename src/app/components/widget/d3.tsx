import { useEffect, useRef } from "react";
import * as d3 from "d3";

interface Dataset {
  name: string;
  data: { label: string; value: number }[];
  color: string[];
}

interface ChartData {
  datasets: Dataset[];
  options: {
    chartType: "bar" | "line" | "pie" | "doughnut";
    showLegend?: boolean;
    legendPosition?: "top" | "right" | "bottom";
    legendColor?: string;
    showTooltip?: boolean;
    showTitle?: boolean;
    titleText?: string;
    titleColor?: string;
    tooltipBgColor?: string;
  };
}

const D3Widget = ({ data }: { data: ChartData }) => {
  const ref = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!data || !data.datasets.length) return;

    const svg = d3.select(ref.current);
    const width = 450,
      height = 300,
      margin = {
        top: data.options.showTitle ? 40 : 20,
        right: 120,
        bottom: 40,
        left: 50,
      };

    svg.selectAll("*").remove();
    svg.attr("width", width).attr("height", height);

    /*** ✅ 타이틀 추가 ***/
    if (data.options.showTitle) {
      svg
        .append("text")
        .attr("x", width / 2)
        .attr("y", margin.top / 2)
        .attr("text-anchor", "middle")
        .attr("fill", data.options.titleColor || "#ffffff")
        .style("font-size", "16px")
        .style("font-weight", "bold")
        .text(data.options.titleText || "");
    }

    /*** ✅ 툴팁 추가 (모든 차트에서 작동) ***/
    const tooltip = d3
      .select("body")
      .append("div")
      .attr("class", "tooltip")
      .style("position", "absolute")
      .style("background", data.options.tooltipBgColor || "rgba(0,0,0,0.8)")
      .style("color", "#fff")
      .style("padding", "5px")
      .style("border-radius", "5px")
      .style("opacity", 0);

    /*** ✅ 파이 & 도넛 차트 렌더링 ***/
    if (
      data.options.chartType === "pie" ||
      data.options.chartType === "doughnut"
    ) {
      const dataset = data.datasets[0];
      if (!dataset || !dataset.data.length) return;

      const pieData = dataset.data.map((d) => ({
        label: d.label,
        value: Number(d.value),
      }));

      const radius = Math.min(width, height) / 2 - 10;
      const pieGroup = svg
        .append("g")
        .attr("transform", `translate(${width / 2},${height / 2})`);

      const pie = d3
        .pie<{ label: string; value: number }>()
        .value((d) => d.value);
      const arc = d3
        .arc<d3.PieArcDatum<{ label: string; value: number }>>()
        .innerRadius(data.options.chartType === "doughnut" ? radius * 0.5 : 0)
        .outerRadius(radius);

      const colorScale = d3
        .scaleOrdinal<string>()
        .domain(pieData.map((d) => d.label))
        .range(dataset.color);

      pieGroup
        .selectAll("path")
        .data(pie(pieData))
        .enter()
        .append("path")
        .attr("d", arc)
        .attr("fill", (d) => colorScale(d.data.label))
        .attr("stroke", "#fff")
        .style("stroke-width", "2px")
        .on("mouseenter", (event, d) => {
          if (data.options.showTooltip) {
            tooltip
              .style("opacity", 1)
              .html(`<strong>${d.data.label}</strong>: ${d.data.value}`)
              .style("left", `${event.pageX + 5}px`)
              .style("top", `${event.pageY - 28}px`);
          }
        })
        .on("mouseleave", () => tooltip.style("opacity", 0));

      return;
    }

    /*** ✅ 바 & 라인 차트 렌더링 ***/
    const xScale = d3
      .scaleBand<string>()
      .domain(data.datasets[0].data.map((d) => d.label))
      .range([margin.left, width - margin.right])
      .padding(0.1);
    const yMax =
      d3.max(
        data.datasets.flatMap((dataset) =>
          dataset.data.map((d) => Number(d.value))
        )
      ) || 100;
    const yScale = d3
      .scaleLinear()
      .domain([0, yMax])
      .range([height - margin.bottom, margin.top]);

    svg
      .append("g")
      .attr("transform", `translate(0,${height - margin.bottom})`)
      .call(d3.axisBottom(xScale))
      .selectAll("text")
      .attr("fill", "#ffffff");

    svg
      .append("g")
      .attr("transform", `translate(${margin.left},0)`)
      .call(d3.axisLeft(yScale))
      .selectAll("text")
      .attr("fill", "#ffffff");

    /*** ✅ 바 차트 ***/
    if (data.options.chartType === "bar") {
      svg
        .selectAll(".bar")
        .data(data.datasets[0].data)
        .enter()
        .append("rect")
        .attr("x", (d) => xScale(d.label) ?? 0)
        .attr("y", (d) => yScale(Number(d.value)))
        .attr("width", xScale.bandwidth())
        .attr("height", (d) => height - margin.bottom - yScale(Number(d.value)))
        .attr("fill", data.datasets[0].color[0])
        .on("mouseover", (event, d) => {
          if (data.options.showTooltip) {
            tooltip
              .style("opacity", 1)
              .html(`<strong>${d.label}</strong>: ${d.value}`)
              .style("left", `${event.pageX + 5}px`)
              .style("top", `${event.pageY - 28}px`);
          }
        })
        .on("mouseout", () => tooltip.style("opacity", 0));
    } else {
      /*** ✅ 라인 차트 ***/
      const line = d3
        .line<{ label: string; value: number }>()
        .x((d) => (xScale(d.label) ?? 0) + xScale.bandwidth() / 2)
        .y((d) => yScale(Number(d.value)))
        .curve(d3.curveMonotoneX);

      svg
        .append("path")
        .datum(data.datasets[0].data)
        .attr("fill", "none")
        .attr("stroke", data.datasets[0].color[0])
        .attr("stroke-width", 2)
        .attr("d", line);

      /*** ✅ 데이터 포인트 (원) 추가 ***/
      svg
        .selectAll(".dot")
        .data(data.datasets[0].data)
        .enter()
        .append("circle")
        .attr("cx", (d) => (xScale(d.label) ?? 0) + xScale.bandwidth() / 2)
        .attr("cy", (d) => yScale(Number(d.value)))
        .attr("r", 4)
        .attr("fill", data.datasets[0].color[0])
        .on("mouseover", (event, d) => {
          if (data.options.showTooltip) {
            tooltip
              .style("opacity", 1)
              .html(`<strong>${d.label}</strong>: ${d.value}`)
              .style("left", `${event.pageX + 5}px`)
              .style("top", `${event.pageY - 28}px`);
          }
        })
        .on("mouseout", () => tooltip.style("opacity", 0));
    }
  }, [data]);

  return <svg ref={ref} />;
};

export default D3Widget;
