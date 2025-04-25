import React from 'react';
import { format } from 'date-fns';
import {
  Chart as ChartJs,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import styled from 'styled-components';

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

const ChartComponent = ({ expenses, incomes }) => {
  const allDatesSet = new Set();

  incomes.forEach((inc) => allDatesSet.add(inc.date));
  expenses.forEach((exp) => allDatesSet.add(exp.date));

  const allDates = Array.from(allDatesSet).sort(
    (a, b) => new Date(a) - new Date(b)
  );

  const formattedLabels = allDates.map((date) =>
    format(new Date(date), 'dd/MM/yyyy')
  );

  const incomeData = allDates.map((date) => {
    const entry = incomes.find((inc) => inc.date === date);
    return entry ? entry.amount : null;
  });

  const expenseData = allDates.map((date) => {
    const entry = expenses.find((exp) => exp.date === date);
    return entry ? entry.amount : null;
  });

  const data = {
    labels: formattedLabels,
    datasets: [
      {
        label: 'Income',
        data: incomeData,
        backgroundColor: 'green',
        borderColor: 'green',
        borderWidth: 1,
        tension: 0.3,
        fill: false,
        spanGaps: true
      },
      {
        label: 'Expense',
        data: expenseData,
        backgroundColor: 'red',
        borderColor: 'red',
        borderWidth: 1,
        tension: 0.3,
        fill: false,
        spanGaps: true
      }
    ]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top'
      },
      title: {
        display: true,
        text: 'Income vs Expenses Over Time'
      }
    },
    scales: {
      y: {
        beginAtZero: true
      }
    }
  };

  return (
    <ChartStyled>
      <Line data={data} options={options} />
    </ChartStyled>
  );
};

const ChartStyled = styled.div`
  width: 90%;
  height: 320px;
  background: #eef2ff;
  padding: 1rem;
  border-radius: 12px;
`;

export default ChartComponent;
