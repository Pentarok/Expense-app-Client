import React, { useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import {  faDollarSign, faCalendar, faComment, faMessage } from '@fortawesome/free-solid-svg-icons';
import savingsList from './SavingsList';
import { faCircle } from "@fortawesome/free-solid-svg-icons";
import { useQuery } from '@tanstack/react-query';
import TransactionForm from './TransactionForm';
import axios from 'axios';
import { ToastContainer } from 'react-toastify';
import IncomeList from './IncomeList';
import SavingsChart from './SavingsChart';
import { useContext } from 'react';
import { TabContext } from './AppWrappe';
const savings = [
    { title: "Salary", amount: 3000, description: "Monthly paycheck from work" },
    { title: "Freelance Project", amount: 800, description: "Completed a client project" },
    { title: "Dividends", amount: 200, description: "Earnings from stock investments" },
    { title: "Rental savings", amount: 1500, description: "Monthly rent from apartment" },
    { title: "Bonus", amount: 500, description: "Extra reward from company" }
];



  
const Savings = ({savings,getTotalSavings}) => {

  const globalData = useContext(TabContext);
  const {currencySymbol}=globalData;

  return (
    <div className='bg-slate-50 w-full rounded-xl p-2'>
    
    
        <div className='bg-white py-2 rounded-xl shadow-sm flex justify-center items-center'>
          {/*   total amount */}
        <div>
        <div className='flex items-center'>
                           <p className=' text-base font-semibold pr-1 md:text-lg'>Total savings:</p> 
                                <span  className="text-lg sm:text-xl md:text-2xl text-green-500"   >{currencySymbol}</span>
                                <span className='md:text-2xl text-lg sm:text-xl font-semibold text-green-500'>{getTotalSavings()}</span>
                                </div>
        </div>
        </div>

        <div className='flex flex-col md:flex-row gap-2 w-full'>
            <div className='basis-1/3 bg-indigo-100 rounded-xl p-1 mt-1'>
             {/*    Add new savings */}
             <h1 className='text-center text-slate-900 font-semibold'>Add savings</h1>
<TransactionForm/>
            </div>
                <div className='basis-2/3 '>
                {/*   List savings */}
                {savings.length==0 && <div className='bg-slate-200 shadow rouded-xl text-gray-800 p-2'>
                  No data found!
                </div>
                }
                  {savings && savings.map((savings,i)=><IncomeList key={i} amount={savings.amount} date={savings.date} title={savings.title} info={savings.description} id={savings._id}/>)}
                </div>
        </div>
        <div className='mt-2 p-2'>
          <SavingsChart savings={savings}/>
        </div>
    </div>
  )
}

export default Savings