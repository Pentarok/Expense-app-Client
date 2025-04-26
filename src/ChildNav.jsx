import React, { useContext, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle, faDollarSign, faMinusCircle,faPiggyBank, faPlusCircle, faTachometerAlt, faListAlt, faTimes, faCog, faCreditCard } from '@fortawesome/free-solid-svg-icons';
import useIsMediumScreen from './mediumScreen';
import { menuContext } from './HomeLayout';

const ChildNav = ({ tab, setOpenTab, isExpense, setIsExpense, setMenuOpen, menuOpen }) => {
  const isMd = useIsMediumScreen();
  const { user } = useContext(menuContext);
  const { userData } = useContext(menuContext);

  const handleIncomeClick = () => {
    setOpenTab(3);
    localStorage.setItem("openTab", 3);
    setIsExpense(false);
    if (!isMd) {
      setMenuOpen(false);
    }
  };
  
  const handleExpenseClick = () => {
    setOpenTab(2);
    localStorage.setItem("openTab", 2);
    setIsExpense(true);
    if (!isMd) {
      setMenuOpen(false);
    }
  };
  
  const handleTransactionClick = () => {
    setIsExpense(false);
    setOpenTab(1);
    localStorage.setItem("openTab", 1);
    if (!isMd) {
      setMenuOpen(false);
    }
    if (isMd) {
      setMenuOpen(true);
    }
  };

  const handleSavingsClick = () => {
    setIsExpense(false);
    setOpenTab(4);
    localStorage.setItem("openTab", 4);
    if (!isMd) {
      setMenuOpen(false);
    }
  };

  const handleSettingClick = () => {
    setOpenTab(5);
    localStorage.setItem("openTab", 5);
    setIsExpense(false);
    if (!isMd) {
      setMenuOpen(false);
    }
  };

  const handlePaymentClick = () => {
    setOpenTab(6);
    localStorage.setItem("openTab", 6);
    setIsExpense(false);
    if (!isMd) {
      setMenuOpen(false);
    }
  };

  const handleCapsClick = () => {
    setOpenTab(7);
    localStorage.setItem("openTab", 7);
    setIsExpense(false);
    if (!isMd) {
      setMenuOpen(false);
    }
  };


  return (
    <div
      className={`
        ${isMd ? 'relative min-w-[200px] h-[400px]' : ''} 
        ${!isMd && menuOpen ? ' h-[400px] w-[100px] min-w-[200px] z-40 top-10 left-0  ' : ''} 
        ${!isMd && !menuOpen ? 'hidden' : ''}  
        bg-slate-200 rounded-xl p-2 shadow-lg transition-transform duration-300 ease-in-out
        ${menuOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'} 
      `}
    >
      {!isMd && (
        <FontAwesomeIcon
          icon={faTimes}
          size="2x"
          className="text-black ml-2 float-right cursor-pointer"
          onClick={() => setMenuOpen(false)}
        />
      )}

      <div className="flex overflow-x-hidden gap-1 items-center justify-center">
        <FontAwesomeIcon icon={faUserCircle} size="2x" color="black" />
        <h1 className="md:text-lg font-semibold text-slate-800">{userData.username}</h1>
      </div>
{/* 
      <div className="pt-2.5 flex gap-1 items-center cursor-pointer rounded-sm pl-1 hover:bg-white">
        <FontAwesomeIcon icon={faTachometerAlt} size="1x" color="black" />
        <span className="text-sm md:text-base">Dashboard</span>
      </div> */}

      <div className="flex gap-1 items-center pt-2 cursor-pointer rounded-sm pl-1 hover:bg-white" onClick={handleTransactionClick}>
        <FontAwesomeIcon icon={faListAlt} size="1x" color="black" />
        <span className="text-sm md:text-base">View Transactions</span>
      </div>

      <div className="flex gap-1 items-center pt-2 rounded-sm pl-1 hover:bg-white cursor-pointer" onClick={handleExpenseClick}>
        <FontAwesomeIcon icon={faMinusCircle} size="1x" color="red" />
        <span className="text-sm md:text-base cursor-pointer">Expenses</span>
      </div>

      <div className="flex gap-1 items-center pt-2 rounded-sm pl-1 hover:bg-white cursor-pointer" onClick={handleIncomeClick}>
        <FontAwesomeIcon icon={faPlusCircle} size="1x" color="green" />
        <span className="text-sm md:text-base cursor-pointer">Income</span>
      </div>

      <div className="flex gap-1 items-center pt-2 rounded-sm pl-1 hover:bg-white cursor-pointer" onClick={handleCapsClick}>
        <FontAwesomeIcon icon={faCreditCard} size="1x" color="green" />
        <span className="text-sm md:text-base cursor-pointer">Caps</span>
      </div>

      <div className="flex gap-1 items-center pt-2 rounded-sm pl-1 hover:bg-white cursor-pointer" onClick={handleSavingsClick}>
        <FontAwesomeIcon icon={faPiggyBank} size="1x" color="blue" />
        <span className="text-sm md:text-base cursor-pointer">Savings</span>
      </div>

      {/* Settings Icon */}
      <div className="flex gap-1 items-center pt-2 rounded-sm pl-1 hover:bg-white cursor-pointer" onClick={handleSettingClick}>
        <FontAwesomeIcon icon={faCog} size="1x" color="black" />
        <span className="text-sm md:text-base cursor-pointer">Settings</span>
      </div>

      {/* Payment Icon */}
      <div className="flex gap-1 items-center pt-2 rounded-sm pl-1 hover:bg-white cursor-pointer" onClick={handlePaymentClick}>
        <FontAwesomeIcon icon={faCreditCard} size="1x" color="green" />
        <span className="text-sm md:text-base cursor-pointer">Payments</span>
      </div>
    </div>
  );
};

export default ChildNav;
