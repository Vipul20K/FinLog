import React from "react";
import {
  Chart as ChartJs,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";
import { Line } from "react-chartjs-2";
import styled from "styled-components";
import { useGlobalContext } from "../../context/globalContext.jsx";
import { dateFormat } from "../../utils/dateFormat.jsx";

ChartJs.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

function Chart() {
  const { incomes, expenses } = useGlobalContext();

  // Collect all unique dates from incomes & expenses
  const allDates = [
    ...incomes.map((i) => i.date),
    ...expenses.map((e) => e.date),
  ];

  const uniqueSortedDates = [...new Set(allDates)].sort(
    (a, b) => new Date(a) - new Date(b)
  );

  const labels = uniqueSortedDates.map((date) => dateFormat(date));

  const incomeData = uniqueSortedDates.map((date) => {
    const found = incomes.find((i) => i.date === date);
    return found ? found.amount : 0;
  });

  const expenseData = uniqueSortedDates.map((date) => {
    const found = expenses.find((e) => e.date === date);
    return found ? found.amount : 0;
  });

  const data = {
    labels,
    datasets: [
      {
        label: "Income",
        data: incomeData,
        backgroundColor: "green",
        borderColor: "green",
        fill: false,
        tension: 0.2,
      },
      {
        label: "Expenses",
        data: expenseData,
        backgroundColor: "red",
        borderColor: "red",
        fill: false,
        tension: 0.2,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
    },
  };

  return (
    <ChartStyled>
      <Line data={data} options={options} />
    </ChartStyled>
  );
}

const ChartStyled = styled.div`
  background: #fcf6f9;
  border: 2px solid #ffffff;
  box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
  padding: 1rem;
  border-radius: 20px;
  height: 100%;
`;

export default Chart;
