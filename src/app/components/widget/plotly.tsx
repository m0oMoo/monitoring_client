import { convertToPlotly } from "@/app/utils/convertToChart";
import Plot from "react-plotly.js";

const PlotlyWidget = ({ data }: { data: any }) => {
  const plotlyData = convertToPlotly(data);
  return <Plot data={plotlyData.data} layout={plotlyData.layout} />;
};

export default PlotlyWidget;
