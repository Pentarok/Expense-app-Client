import { Pie } from 'react-chartjs-2';
import { Chart as ChartJs, ArcElement, Tooltip, Legend } from 'chart.js';

// Register necessary components for Chart.js
ChartJs.register(ArcElement, Tooltip, Legend);

const PieChartComponent = ({IncomeAmount,expenseAmount}) => {

    const data = {
        labels: ['Income', 'Expense'],
        datasets: [
            {
                data: [IncomeAmount, expenseAmount],  // Example data
                backgroundColor: ['green', 'red'],
                borderColor: ['white', 'white'],  // Border color for slices
                borderWidth: 5,  // Change the border width here
            },
        ],
    };

    return (
        <div className='w-40 h-40  sm:h-60 sm:w-60 '>
            <Pie data={data} />
        </div>
    );
};

export default PieChartComponent;
