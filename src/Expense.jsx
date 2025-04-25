import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import {  faDollarSign, faCalendar, faComment, faMessage } from '@fortawesome/free-solid-svg-icons';
import ExpenseList from './ExpenseList';
import { faCircle } from "@fortawesome/free-solid-svg-icons";
import TransactionForm from './TransactionForm';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useContext } from 'react';
import { TabContext } from './AppWrappe';
const Expenses = [
    { title: "Salary", amount: 3000, description: "Monthly paycheck from work" },
    { title: "Freelance Project", amount: 800, description: "Completed a client project" },
    { title: "Dividends", amount: 200, description: "Earnings from stock investments" },
    { title: "Rental Expense", amount: 1500, description: "Monthly rent from apartment" },
    { title: "Bonus", amount: 500, description: "Extra reward from company" }
];

  
const Expense = ({getTotalExpense,expenses}) => {

 
    
  const globalData = useContext(TabContext);
  const {currencySymbol}=globalData;
    
  
    
  return (
    <div className='bg-slate-50 w-full rounded-xl p-2'>
       
        <div className='bg-white py-2 rounded-xl shadow-sm flex justify-center items-center'>
          {/*   total amount */}
        <div>
        <div className='flex items-center'>
                           <p className=' text-base font-semibold pr-1 md:text-lg'>Total Expenses:</p> 
                                <span  className="text-lg sm:text-xl md:text-2xl text-red-500"   >{currencySymbol}</span>
                                <span className='md:text-2xl text-lg sm:text-xl font-semibold text-red-500'>{getTotalExpense()}</span>
                                </div>
        </div>
        </div>

        <div className='flex flex-col md:flex-row gap-2 w-full'>
            <div className='basis-1/3 bg-indigo-100 rounded-xl p-1 mt-1'>
             {/*    Add new Expense */}
             <h1 className='text-center text-slate-900 font-semibold'>Add Expense</h1>
<TransactionForm />
            </div>
                <div className='basis-2/3 '>
                {/*   List Expenses */}
                {expenses.length==0 && <div className='bg-slate-100 mt-2 text-center shadow rouded-xl text-gray-800 p-2'>
                  No data found!
                </div>
                }
                  {expenses && expenses.map((Expense,i)=><ExpenseList key={i} amount={Expense.amount} id={Expense._id} date={Expense.date} title={Expense.title} info={Expense.description}/>)}
                </div>
        </div>
        
    </div>
  )
}

export default Expense