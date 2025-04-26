import React, {useState, useEffect } from 'react';
import useIsMediumScreen from './mediumScreen';
const TransactionsTable = ({ transactions, onRefetch }) => {
    const [viewportWidth, setViewportWidth] = useState(window.innerWidth)
  const formatDateTime = (isoString) => {
    const date = new Date(isoString);
    const optionsDate = { year: 'numeric', month: 'short', day: 'numeric' };
    const optionsTime = { hour: 'numeric', minute: '2-digit', hour12: true };

    const formattedDate = date.toLocaleDateString(undefined, optionsDate);
    const formattedTime = date.toLocaleTimeString(undefined, optionsTime);

    return { formattedDate, formattedTime };
  };
  const isMd= useIsMediumScreen();
 
  useEffect(() => {
    const handleResize = () => {
      const currentWidth = window.innerWidth;
      setViewportWidth(currentWidth);
console.log(viewportWidth)
    };

    window.addEventListener('resize', handleResize);

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
<div
className={` max-w-full px-2`}
>

      
      {/* Scrollable Table Container */}
      <div className="max-w-full p-2 overflow-x-auto bg-white shadow rounded-md border border-gray-200">
    
    <div className='flex flex-col'>
    <h1 className="text-center md:text-2xl font-bold mb-2">Payment Transactions</h1>

<p className="mb-4 px-2 text-gray-600 text-sm text-center md:text-left">
  Transactions marked as <span className="font-semibold">pending</span> may include those that were cancelled by the user.
</p>

<button className='bg-blue-500 hover:bg-blue-600 p-1 inline text-white rounded-sm static mb-2 cursor-pointer float-right max-w-[180px]' onClick={onRefetch}>Refresh</button>
    </div>
     

        <div className="inline-block min-w-full">
          <table className="min-w-[750px] w-full text-sm text-left">
            <thead className="bg-blue-100 text-gray-600 uppercase tracking-wider text-sm">
              <tr>
                <th className="py-3 px-4">Date</th>
                <th className="py-3 px-4">Time</th>
                <th className="py-3 px-4">Amount</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Phone</th>
              </tr>
            </thead>
            <tbody>
              {transactions.length === 0 ? (
                <tr>
                  <td colSpan="5" className="text-center py-4 text-gray-500">
                    No transactions found
                  </td>
                </tr>
              ) : (
                transactions.map((tx, index) => {
                  const { formattedDate, formattedTime } = formatDateTime(tx.transactionDate);
                  return (
                    <tr key={index} className="border-b hover:bg-gray-50 transition-colors">
                      <td className="py-2 px-4">{formattedDate}</td>
                      <td className="py-2 px-4">{formattedTime}</td>
                      <td className="py-2 px-4 font-medium text-green-600">
                        ${tx.amount.toFixed(2)}
                      </td>
                      <td className="py-2 px-4 capitalize">{tx.status}</td>
                      <td className="py-2 px-4">{tx.phoneNumber}</td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default TransactionsTable;
