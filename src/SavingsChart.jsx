import React from 'react';
import { format } from 'date-fns';
import { Line } from 'react-chartjs-2';
import styled from 'styled-components';
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
import useIsMediumScreen from './mediumScreen';

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

const SavingsChart = ({ savings }) => {
    // Step 1: Group savings by date and sum the amounts
    const savingsByDate = savings.reduce((acc, entry) => {
        const date = format(new Date(entry.createdAt), 'dd/MM/yyyy');
        if (!acc[date]) {
            acc[date] = 0;
        }
        acc[date] += entry.amount;
        return acc;
    }, {});

    // Step 2: Extract sorted labels and values
    const sortedDates = Object.keys(savingsByDate).sort(
        (a, b) => new Date(a.split('/').reverse().join('/')) - new Date(b.split('/').reverse().join('/'))
    );

    const data = {
        labels: sortedDates,
        datasets: [
            {
                label: 'Saving',
                data: sortedDates.map((date) => savingsByDate[date]),
                backgroundColor: 'green',
                borderColor: 'green',
                borderWidth: 0.5,
                fill: false,
            }
        ]
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
    };

    const isMdScreen = useIsMediumScreen();

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
    border-radius: 5px;
    padding: 10px;
`;

export default SavingsChart;
