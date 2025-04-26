import React, { useContext, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDollarSign } from '@fortawesome/free-solid-svg-icons';
import ChartComponent from './Chart.jsx';
import { TabContext } from './AppWrappe';
import PieChartComponent from './PieChart.jsx';
import CurrencySelector from './Currency.jsx';
import currencySymbolMap from 'currency-symbol-map';
const Transactions = ({ incomeAmount, cashFigures, history, result }) => {
  const [chart, setChart] = useState(1); // Default to Pie Chart
  const handleChange = (e) => {
    setChart(parseInt(e.target.value)); // Ensure it's a number
  };

  const cash = cashFigures() || {}; // Prevents errors if undefined
  const globalData = useContext(TabContext);
  const {currencySymbol}=globalData;
  const { incomes = [], expenses = [] } = globalData || {}; // Fallback to empty arrays

  return (
    <div className="w-full max-w-7xl mx-auto px-4">
      <h1 className="text-center text-2xl sm:text-3xl font-semibold mb-0">All Transactions</h1>
      <div className="relative w-full max-w-xs">
      

</div>
      {/* Chart Selection */}
      <div className="w-3/4 flex items-center justify-center ml-8">
        <select onChange={handleChange} className="border border-black rounded-xl">
          <option value={1}>Visualize with pie chart</option>
          <option value={2}>Visualize with graph</option>
        </select>
      </div>

      {/* Chart & Totals Section */}
      <div className="flex flex-col md:flex-row w-full gap-4">
        {(!incomes.length && !expenses.length) ? (
          <div className="rounded-xl shadow bg-slate-100 mt-2 p-2 w-full text-center">
            No data found!
          </div>
        ) : (
          <div className="md:basis-2/3 flex justify-center items-center bg-indigo-50 rounded-xl md:h-[320px] p-4">
            {chart === 2 ? (
              incomes.length > 0 && expenses.length > 0 && (
                <ChartComponent incomes={incomes} expenses={expenses} />
              )
            ) : (
              cash && <PieChartComponent IncomeAmount={cash?.income} expenseAmount={cash?.expense} />
            )}
          </div>
        )}
        
        {/* Summary Boxes */}
        <div className="md:basis-1/3 space-y-4">
          {/* Total Income */}
          <div className="bg-indigo-100 rounded-xl p-4">
            <h2 className="font-semibold text-sm md:text-xl  text-slate-800">Total Income</h2>
            <div className="flex items-center">
            <span className='text-base sm:text-2xl mt-0 text-green-700'>{currencySymbol}</span>
             
              <span className="text-base sm:text-2xl text-green-700 font-semibold">{cash?.income || 0}</span>
            </div>
          </div>

          {/* Total Expenses */}
          <div className="bg-indigo-100 rounded-xl p-4">
            <h2 className="font-semibold text-sm md:text-xl  text-slate-800">Total Expenses</h2>
            <div className="flex items-center">
            <span className=' text-base sm:text-2xl mt-0 text-red-700'>{currencySymbol}</span>
              <span className=" text-base sm:text-2xl text-red-700 font-semibold">{cash?.expense || 0}</span>
            </div>
          </div>

          {/* Total Balance */}
          <div className="bg-indigo-50 rounded-xl p-4">
            <h2 className="font-semibold text-sm md:text-xl  text-center text-slate-800">Total Balance</h2>
            <div className="flex items-center justify-center">
              <span
                icon={faDollarSign}
                className={`${cash?.balance < 0 ? 'text-base sm:text-2xl  text-red-500' : ' text-base sm:text-2xl text-green-500'}  text-sm md:text-2xl`}
              >{currencySymbol}</span>
              <span className={`${ cash?.balance < 0 ? ' text-base sm:text-2xl text-red-500' : 'sm:text-2xl text-base text-green-500'} text-2xl font-semibold`}>
                {cash?.balance || 0}
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-2">
      <h4 className="text-center font-bold text-sm md:text-xl  text-blue-600">Insights</h4>
      {/* Insights / Recommendations */}
      {(incomes.length>0 && expenses.length>0)?(
           
          
            <div className={`${result?.bgColor} ${result?.textColor} rounded-xl p-2 shadow`}>
              {result?.recommendation || "No insights available"}
            </div>
         
      ):(
        <div className='bg-slate-100 shadow p-2 text-center mt-2 rounded-xl text-gray-800'>
           No significant data found to generate insights!
        </div>
      )}
      </div>

      {/* Recent History */}
      <div className="w-full p-2 bg-indigo-600 mb-2 rounded-2xl mt-4">
        <h2 className="text-sm md:text-xl font-semibold text-center text-white mb-1">Recent History</h2>
        <div className="flex justify-center items-center w-full">
          <div className="space-y-2 md:w-[400px] w-full">
            {history.length > 0 ? (
              history.map((item, i) => (
                <div
                  key={i}
                  className="bg-white py-3 rounded-xl px-3 flex justify-between mb-2 shadow-sm "
                >
                  <p className="text-sm font-medium">{item.title}</p>
                  <span className="text-sm flex items-center">
                    <span className="text-sm text-gray-700" >{currencySymbol}</span>
                    {item.amount}
                  </span>
                </div>
              ))
            ) : (
              <div className="text-center text-white">No recent history available.</div>
            )}
          </div>
        </div>
      </div>
     
    </div>
  );
};

export default Transactions;
