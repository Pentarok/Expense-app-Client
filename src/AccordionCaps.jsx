import { useState } from 'react';

const AccordionMenu = () => {
  const [isOpenExpense, setIsOpenExpense] = useState(false);
  const [isOpenBalance, setIsOpenBalance] = useState(false);

  return (
    <div className="space-y-4">
      {/* Expense Cap Accordion */}
      <div className="border border-gray-300 rounded-lg">
        <div
          className="flex justify-between items-center p-4 cursor-pointer bg-indigo-600 rounded-t-lg"
          onClick={() => setIsOpenExpense(!isOpenExpense)}
        >
          <span className="font-semibold text-white text-sm md:text-lg">Expense Cap</span>
          <span className="text-sm md:text-2xl text-white">{isOpenExpense ? '-' : '+'}</span>
        </div>
        <div
          className={`transition-all duration-300 ease-in-out overflow-hidden ${
            isOpenExpense ? 'max-h-[200px]' : 'max-h-0'
          }`}
        >
          <div className="p-4 bg-white text-black">
            <p>The **Expense Cap** is the maximum amount you can spend over a set period. If your total expenses exceed this limit, you'll receive an alert.</p>
          </div>
        </div>
      </div>

      {/* Balance Cap Accordion */}
      <div className="border border-gray-300 rounded-lg">
        <div
          className="flex justify-between items-center p-4 cursor-pointer bg-indigo-600 rounded-t-lg"
          onClick={() => setIsOpenBalance(!isOpenBalance)}
        >
          <span className="font-semibold text-sm md:text-lg text-white">Balance Cap</span>
          <span className="md:text-2xl text-sm text-white ">{isOpenBalance ? '-' : '+'}</span>
        </div>
        <div
          className={`transition-all duration-300 ease-in-out overflow-hidden ${
            isOpenBalance ? 'max-h-[200px]' : 'max-h-0'
          }`}
        >
          <div className="p-4 bg-gray-50 text-gray-700">
            <p> If your balance(Total income - total expenses) falls below this cap, you will be alerted to review your finances.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccordionMenu;
