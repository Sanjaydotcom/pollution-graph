import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { getDatesInRange } from "../utls/commonUtls";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default function Chart({
  dateFrom,
  dateTo,
  pollutionData,
  selectedParam,
  selectedCity,
}) {
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: `Pollution Data of ${selectedCity} based on ${selectedParam}`,
      },
    },
  };
  const pollutionValuesArr = pollutionData.map((t) => t.value);
  const d1 = new Date(dateFrom);
  const d2 = new Date(dateTo);
  const labels = [...getDatesInRange(d1, d2)];
  const data = {
    labels,
    datasets: [
      {
        label: "Pollution range",
        data: [...pollutionValuesArr],
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
    ],
  };

  return <Bar options={options} data={data} />;
}
