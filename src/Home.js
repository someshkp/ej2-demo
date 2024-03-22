import {
  AccumulationChartComponent,
  AccumulationDataLabel,
  AccumulationLegend,
  AccumulationSeriesCollectionDirective,
  AccumulationSeriesDirective,
  AccumulationTooltip,
  Category,
  ChartComponent,
  Column,
  ColumnSeries,
  DataLabel,
  Inject,
  Legend,
  PieSeries,
  SeriesCollectionDirective,
  SeriesDirective,
  Tooltip,
} from "@syncfusion/ej2-react-charts";
import { sampleData } from "./data";
import { SideBar } from "./SideBar";
import DataGrid from "./_common/DataGrid";

const statusCounts = sampleData.reduce((acc, curr) => {
  acc[curr.status] = (acc[curr.status] || 0) + 1;
  return acc;
}, {});

// Convert statusCounts object to an array of objects suitable for the chart dataSource
const chartData = Object.keys(statusCounts).map((status) => ({
  status: status,
  count: statusCounts[status],
}));

const primaryxAxis = { valueType: "Category", title: "Months" };
const primaryyAxis = {
  minimum: 0,
  maximum: 20000,
  interval: 5000,
  title: "Revenue",
};

// Function to aggregate data based on months and sum up property values
// Function to aggregate data based on months and calculate 0.8% of total property value for each month
// Function to aggregate data based on months and calculate 0.8% of total property value for the last three months
function aggregateDataLastThreeMonths(data) {
  const currentDate = new Date();
  const lastThreeMonths = [];
  for (let i = 2; i >= 0; i--) {
    const month = currentDate.getMonth() - i;
    const year = currentDate.getFullYear();
    lastThreeMonths.push(
      new Date(year, month, 1).toLocaleDateString("en-US", {
        month: "long",
        year: "numeric",
      })
    );
  }

  const aggregatedData = {};
  data.forEach((entry) => {
    const date = new Date(entry.lead_creation_date);
    const monthYear = date.toLocaleDateString("en-US", {
      month: "long",
      year: "numeric",
    });
    if (lastThreeMonths.includes(monthYear)) {
      if (!aggregatedData[monthYear]) {
        aggregatedData[monthYear] = {
          totalPropertyValue: 0,
          pointEightPercent: 0,
        };
      }
      aggregatedData[monthYear].totalPropertyValue += entry.property_value;
    }
  });

  // Calculate 0.8% of total property value for each month
  Object.keys(aggregatedData).forEach((monthYear) => {
    aggregatedData[monthYear].pointEightPercent =
      0.008 * aggregatedData[monthYear].totalPropertyValue;
  });

  return aggregatedData;
}

// Aggregating data for the last three months
const aggregatedData = aggregateDataLastThreeMonths(sampleData);

// Creating series directive
const seriesDirective = {
  dataSource: Object.entries(aggregatedData).map(
    ([monthYear, { totalPropertyValue, pointEightPercent }]) => ({
      customer_name: monthYear,
      property_value: pointEightPercent,
    })
  ),
  xName: "customer_name",
  yName: "property_value",
  type: "Column",
};

// console.log(seriesDirective);

export const HomePage = () => {
  return (
    <SideBar>
      <div
        style={{ display: "flex", flexDirection: "row", marginTop: "100px" }}
      >
        <div style={{ marginLeft: "50px" }}>
          <AccumulationChartComponent
            title="Leads by Status(Last 3 Months)"
            legendSettings={{ position: "Bottom" }}
            tooltip={{ enable: true }}
          >
            <Inject
              services={[
                PieSeries,
                AccumulationDataLabel,
                AccumulationLegend,
                AccumulationTooltip,
              ]}
            ></Inject>
            <AccumulationSeriesCollectionDirective>
              <AccumulationSeriesDirective
                type="Pie"
                dataSource={chartData}
                xName="status"
                yName="count"
                dataLabel={{ visible: true, name: "text", position: "Inside" }}
              ></AccumulationSeriesDirective>
            </AccumulationSeriesCollectionDirective>
          </AccumulationChartComponent>
        </div>
        <div>
          <ChartComponent
            primaryXAxis={primaryxAxis}
            primaryYAxis={primaryyAxis}
            title="Revenue By Months(Last 3 Months)"
            tooltip={{ enable: true }}
          >
            <Inject
              services={[ColumnSeries, Legend, Tooltip, DataLabel, Category]}
            ></Inject>
            <SeriesCollectionDirective>
              <SeriesDirective
                dataSource={seriesDirective.dataSource}
                xName="customer_name"
                yName="property_value"
                type="Column"
                columnFacet="Cylinder"
              ></SeriesDirective>
            </SeriesCollectionDirective>
          </ChartComponent>
        </div>
      </div>
      <div className="content">
        <DataGrid />
      </div>
    </SideBar>
  );
};
