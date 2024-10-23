import { useTheme } from "@mui/material";
import { ResponsiveLine } from "@nivo/line";
import { tokens } from "../theme";

const LineChart = ({ isDashboard = false }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  // Prepare the data for the line chart
  const lineData = [
    {
      id: "Value",
      data: [
        { x: "10/10/2024", y: 2 },
        { x: "11/10/2024", y: 4 },
        { x: "12/10/2024", y: 8 },
      ],
    },
  ];

  return (
    <ResponsiveLine
      data={lineData}
      theme={{
        axis: {
          domain: {
            line: {
              stroke: colors.grey[100],
            },
          },
          legend: {
            text: {
              fill: colors.grey[100],
            },
          },
          ticks: {
            line: {
              stroke: colors.grey[100],
              strokeWidth: 1,
            },
            text: {
              fill: colors.grey[100],
            },
          },
        },
        legends: {
          text: {
            fill: colors.grey[100],
          },
        },
        tooltip: {
          container: {
            background: "rgba(0,0,0,0.8)",
            color: "#fff",
            borderRadius: "4px",
            padding: "10px",
            fontSize: "13px",
            boxShadow: "0 0 6px rgba(0,0,0,0.3)",
          },
        },
      }}
      margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
      xScale={{ type: "point" }}
      yScale={{ type: "linear", min: 0, max: "auto", stacked: false, reverse: false }}
      axisTop={null}
      axisRight={null}
      axisBottom={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: isDashboard ? undefined : "Date",
        legendPosition: "middle",
        legendOffset: 32,
      }}
      axisLeft={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: isDashboard ? undefined : "Value",
        legendPosition: "middle",
        legendOffset: -40,
      }}
      enablePoints={true}
      pointColor={{ from: "color", modifiers: [["brighter", 0.5]] }}
      pointBorderWidth={2}
      pointBorderColor={{ from: "serieColor" }}
      useMesh={true}
      legends={[
        {
          anchor: "bottom",
          direction: "row",
          justify: false,
          translateX: 0,
          translateY: 40,
          itemsSpacing: 0,
          itemDirection: "left-to-right",
          itemWidth: 100,
          itemHeight: 20,
          itemOpacity: 0.85,
          symbolSize: 12,
          effects: [
            {
              on: "hover",
              style: {
                itemOpacity: 1,
              },
            },
          ],
        },
      ]}
      tooltip={({ point }) => (
        <div
          style={{
            padding: "10px",
            background: "rgba(0,0,0,0.8)",
            color: "#fff",
            borderRadius: "4px",
            fontSize: "13px",
            boxShadow: "0 0 6px rgba(0,0,0,0.3)",
          }}
        >
          <strong>Date:</strong> {point.data.x} <br />
          <strong>Value:</strong> {point.data.y}
        </div>
      )}
    />
  );
};

export default LineChart;