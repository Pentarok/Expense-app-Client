import React, { createContext, useEffect, useLayoutEffect, useState } from 'react';
import ChildNav from './ChildNav';
import Transactions from './Transactions';
import Income from './Income';
import currencySymbolMap from 'currency-symbol-map';
import axios from 'axios';
import Expense from './Expense';
import { useQuery } from '@tanstack/react-query';
import Navabar from './Navabar';
import PieChartComponent from './PieChart';
import useIsMediumScreen from './mediumScreen';
import { useContext } from 'react';
import { menuContext } from './HomeLayout';
import Savings from './Savings'
import Settings from './Settings';
import useAuth from './Auth';
import { useNavigate } from 'react-router-dom';
import UserPayments from './UserPayments';
import {ColorRing} from "react-loader-spinner"
import { CirclesWithBar } from 'react-loader-spinner';
import { SetLimits } from './SetLimits';
export const TabContext = createContext();

const AppWrappe = () => {
    const oldTab = JSON.parse(localStorage.getItem("openTab"));
    const [tab, setOpenTab] = useState(oldTab);
    const [isExpense, setIsExpense] = useState(false);
    const [recentHistory, setRecentHistory] = useState([]);
    const [globalData, setGlobalData] = useState({});
  
    const [currencySymbol, setCurrencySymbol] = useState("$"); // Default to USD symbol
    const {menuOpen, setMenuOpen, userId}=useContext(menuContext);  
    // Fetch incomes
    const {isSuspended,loading,user}=useAuth();
    const navigate = useNavigate();
    const isMd= useIsMediumScreen();
const localCurrency = localStorage.getItem('currency')
    useEffect(() => {
        const storedCurrency = localStorage.getItem("currency") || "USD"; // Default to USD
        const symbol = currencySymbolMap(storedCurrency) || "$"; // Default symbol if not found
        setCurrencySymbol(symbol);
    }, [localCurrency]);
   

    const fetchSavings = async () => {
        const res = await axios.get(`http://localhost:5000/api/v1/get-savings/${userId}`);
        return res.data;
    };
    const { data: dataSavings, isLoading: isLoadingSavings } = useQuery({
        queryKey: ["savings"],
        queryFn: fetchSavings,
    });


    const fetchIncomes = async () => {
        const res = await axios.get(`http://localhost:5000/api/v1/get-incomes/${userId}`);
        return res.data;
    };
   
    const { data: dataIncomes, isLoading: isLoadingIncomes } = useQuery({
        queryKey: ["incomes"],
        queryFn: fetchIncomes,
    });

    // Fetch expenses
    const fetchExpenses = async () => {
        const res = await axios.get(`http://localhost:5000/api/v1/get-expenses/${userId}`);
        return res.data;
    };

    const { data: dataExpenses, isLoading: isLoadingExpenses } = useQuery({
        queryKey: ["expenses"],
        queryFn: fetchExpenses,
    });

    // Calculate total income
    const getTotalIncome = () => {
        return dataIncomes?.reduce((acc, income) => acc + income.amount, 0) || 0;
    };
    const getTotalSavings = () => {
        return dataSavings?.reduce((acc, income) => acc + income.amount, 0) || 0;
    };

    // Calculate total expense
    const getTotalExpense = () => {
        return dataExpenses?.reduce((acc, expense) => acc + expense.amount, 0) || 0;
    };

    // Calculate cash figures
    const cashFigures = () => ({
        balance: getTotalIncome() - getTotalExpense(),
        income: getTotalIncome(),
        expense: getTotalExpense(),
    });

    // Fetch recent history when data is ready
    useEffect(() => {
        if (!isLoadingExpenses && !isLoadingIncomes && dataExpenses && dataIncomes) {
            const allData = [...dataExpenses, ...dataIncomes];

            // Sort by createdAt in descending order
            allData.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

            // Take only the top 3
            setRecentHistory(allData.slice(0, 3));
        }
    }, [dataExpenses, dataIncomes, isLoadingExpenses, isLoadingIncomes]);

    // ✅ Ensure globalData updates correctly
    useEffect(() => {
        if (!isLoadingExpenses && !isLoadingIncomes) {
            let sortedIncomes = dataIncomes.sort((a, b) =>
                new Date(b.date || b.createdAt) - new Date(a.date || a.createdAt)
            );
            let sortedExpenses = dataExpenses.sort((a, b) =>
                new Date(b.date || b.createdAt) - new Date(a.date || a.createdAt)
            );
    
            setGlobalData({
                tab,
                currencySymbol, // Ensure it's included
                isExpense,
                incomes: sortedIncomes,
                expenses: sortedExpenses,
            });
        }
    }, [dataIncomes, dataExpenses, tab, isExpense, currencySymbol, isLoadingExpenses, isLoadingIncomes]);
    

    // ✅ Log globalData after it updates
    useEffect(() => {
        console.log("Updated Global Data:", globalData);
    }, [globalData]);
  
    const evaluateBudget = () => {
        const { balance, income, expense } = cashFigures();
    
        const savingsRate = (balance / income) * 100;
    
        let status = "";
        let recommendation = "";
        let bgColor = "";
        let textColor = "text-white"; // Default text color
    
        if (balance > 0 && savingsRate >= 20) {
            status = "Financially Secure";
            recommendation = "Excellent budget management! Your budget is well-balanced, and you have a strong financial cushion.";
            bgColor = "bg-green-500"; // Green for strong financial health
            textColor = "text-white"; // White contrasts well with green
        } else if (balance > 0 && savingsRate >= 10) {
            status = "Stable Budget";
            recommendation = "You're maintaining a healthy balance. Try increasing your savings for better security.";
            bgColor = "bg-blue-500"; // Blue for stability
            textColor = "text-white"; // White contrasts well with blue
        } else if (balance > 0 && savingsRate < 10) {
            status = "Caution Required";
            recommendation = "You have a positive balance, but there's little room for unexpected expenses. Consider optimizing spending.";
            bgColor = "bg-yellow-500"; // Yellow for caution
            textColor = "text-black"; // Black contrasts better with yellow
        } else if (balance === 0) {
            status = "Break-Even Point";
            recommendation = "Your income and expenses are equal. Aim to create a buffer for unexpected costs.";
            bgColor = "bg-gray-500"; // Gray for neutral balance
            textColor = "text-white"; // White contrasts well with gray
        } else if (balance < 0 && Math.abs(savingsRate) < 10) {
            status = "Mild Deficit";
            recommendation = "You're slightly overspending. Review non-essential expenses to regain control.";
            bgColor = "bg-orange-500"; // Orange for mild deficit
            textColor = "text-black"; // Black contrasts better with orange
        } else if (balance < 0 && Math.abs(savingsRate) < 20) {
            status = "Budget Strain";
            recommendation = "Your expenses exceed income by a concerning margin. Consider cutting discretionary spending.";
            bgColor = "bg-red-500"; // Red for significant deficit
            textColor = "text-white"; // White contrasts well with red
        } else {
            status = "Critical Deficit";
            recommendation = "Severe budget imbalance detected! Immediate action is required—reduce expenses or find additional income sources.";
            bgColor = "bg-red-700"; // Darker red for critical deficit
            textColor = "text-white"; // White contrasts well with dark red
        }
    
        return { status, recommendation, bgColor, textColor };
    };
const result = evaluateBudget();


/* if(!isSuspended){
    navigate('/finnace/payment')
} */


    const [key, setKey] = useState(0);

const remountSettings = () => {
  setKey(prev => prev + 1); // changing the key forces React to remount the child
};



useEffect(() => {
    if (!loading && !user?.active === true) {
      navigate('/finance/payment');
    }
  }, [loading, user, navigate]);
  if(isLoadingExpenses || isLoadingIncomes || isLoadingSavings){
    return <div className='bg-slate-50 flex justify-center items-center h-full w-full fixed bottom-0'>
<CirclesWithBar
  height="80"
  width="80"
  color="#4fa94d"
  outerCircleColor="#0000ff"
  innerCircleColor="#000000"
  barColor="#0000ff"
  ariaLabel="circles-with-bar-loading"
  wrapperStyle={{}}
  wrapperClass=""
  visible={true}
  />
    </div>
    }
 
   
    
    return (
      <div className='pt-15 px-1'>


        <div className='w-full min-h-full  flex gap-2'>



            <TabContext.Provider value={globalData}>
     {isMd &&     <ChildNav tab={tab} setOpenTab={setOpenTab}  SetMenuOpen={setMenuOpen} menuOpen={menuOpen} isExpense={isExpense} setIsExpense={setIsExpense} /> }
       {!isMd && menuOpen && <div className='basis-2'>    <ChildNav tab={tab} setOpenTab={setOpenTab}  setMenuOpen={setMenuOpen} menuOpen={menuOpen} isExpense={isExpense} setIsExpense={setIsExpense} /></div>}   
                {tab === 3 && (isLoadingIncomes ? <p>Loading...</p> : <Income incomes={dataIncomes} getTotalIncome={getTotalIncome} />)}
                {tab === 4 && (isLoadingSavings ? <p>Loading...</p> : <Savings savings={dataSavings} getTotalSavings={getTotalSavings} />)}
                {tab === 1 && <Transactions cashFigures={cashFigures} history={recentHistory} result={result} />}
               {tab === 5 && <Settings key={key} onRemount={remountSettings} globalData={globalData} setGlobalData={setGlobalData} />}
             {tab === 6 && <UserPayments key={key} onRemount={remountSettings} />} 
             {tab ===7 && <SetLimits key={key}/>}
                {tab === 2 && (isLoadingExpenses ? <p>Loading...</p> : <Expense expenses={dataExpenses} getTotalExpense={getTotalExpense} />)}
            </TabContext.Provider>
        </div>
        </div>
    );
};

export default AppWrappe;
