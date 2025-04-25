import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import TransactionsTable from './TransactionTable';

const UserPayments = () => {
  const [userId, setUserId] = useState(null);
  const [transData, setTransData] = useState([]);
  const serverUri = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    const id = localStorage.getItem('userId');
    if (id) setUserId(id);
  }, []);

  const fetchUserTransactions = async (id) => {
    try {
      const res = await axios.get(`${serverUri}/user/transactions/${id}`);
      setTransData(res.data.userTransactions);
    } catch (error) {
      console.error("Fetch error", error);
    }
  };

  useEffect(() => {
    if (userId) fetchUserTransactions(userId);
  }, [userId]);

  return (
    <div className='flex max-w-[600px] flex-col'>
      <TransactionsTable
        transactions={transData}
        onRefetch={() => fetchUserTransactions(userId)}
      />
      <div className='p-2 mt-2 shadow-sm bg-gray-50 rounded-sm'>
      Our services operate on a prepaid basis, meaning that access is granted only while your account has an active balance. Once your prepaid credits are fully used, access to our services will be temporarily suspended until payment is made. At that point, you will receive a prompt with instructions on how to top up your account and resume uninterrupted service
      </div>

      <Link to="/finance/payment" className='text-blue-600 mt-2'>You can make your payment <span className='font-bold'>here</span></Link>
    </div>
  );
};

export default UserPayments;
