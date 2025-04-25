import React, { useContext, useState } from 'react'
import { menuContext } from './HomeLayout';
import { TabContext } from './AppWrappe';
import { useEffect } from 'react';

import axios from 'axios';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import AccordionCaps from './AccordionCaps';
export const SetLimits = () => {
  const globalData = useContext(TabContext);
  const {currencySymbol}=globalData;
  const {userId}=useContext(menuContext); 
  const [balance,setBalance]=useState(null);
  const [expense,setExpense]=useState(null);
  const [loadingexp,setLoadingExp]=useState(false);
  const [loadingBal,setLoadingBal]=useState(false);
  const queryClient = useQueryClient();
  var serverUrl = import.meta.env.VITE_BACKEND_URL;

 
  const fetchLimits = async ()=>{
    try {
      const res = await axios.get(`${serverUrl}/getlimits/${userId}`)
      return res.data;
    } catch (error) {
      console.log(error)
    }
  
  }
  

  const { data, isLoading } = useQuery({
    queryKey: ["limits"],
    queryFn: fetchLimits,
});

  const handleSetExpense = async(e)=>{
    e.preventDefault();
    try {
      setLoadingExp(true);
      const res = await axios.post(`${serverUrl}/expenseCap`,{expense,userId})
      console.log(res)
      setLoadingExp(false);
      queryClient.invalidateQueries(["limits"])
      setExpense("")
    } catch (error) {
      setLoadingExp(false);
      console.log(error)

    }
  }

  const handleSetBalance = async(e)=>{
    e.preventDefault();
    console.log(serverUrl)
    try {
      setLoadingBal(true);
      const res = await axios.post(`${serverUrl}/balanceCap`,{balance,userId})
      console.log(res)
      setLoadingBal(false);
      queryClient.invalidateQueries(["limits"])
      setBalance("")
    } catch (error) {
      setLoadingBal(false);
      console.log(error)
    }
  }
const ResetBalanceLimit = async ()=>{
  const res = await axios.post(`${serverUrl}/resetBalance`,{userId})
  console.log(res)
  queryClient.invalidateQueries(["limits"]);
}

const ResetExpenseLimit = async ()=>{
 
  try {
    const res = await axios.post(`${serverUrl}/resetExpense`,{userId})
    console.log(res)
    queryClient.invalidateQueries(["limits"]);
  } catch (error) {
    console.log(error)
  }
}
  useEffect(()=>{
    console.log(data)
  },[isLoading])
  return (
    <div className='bg-indigo-100 p-2 rounded-xl'>

<div className="bg-blue-50 p-3 rounded-md border border-blue-200 mb-4">
  <h2 className="text-blue-600 font-semibold text-lg mb-1">Set Your Financial Limits</h2>
  <p className="text-sm text-gray-700">
    Here you can set your <span className="font-medium">expense</span> and <span className="font-medium">balance</span> caps. 
    You’ll receive an <span className="font-medium">email alert</span> if you exceed your limits.
  </p>
<AccordionCaps/>
</div>

{data &&  data.Limits.balanceCap!==null && data.Limits.balance < data.Limits.balanceCap && 
  <div className='flex flex-col justify-center items-center bg-white shadow rounded-sm p-1 mb-1'>
  <span className='text-red-600 text-xl font-semibold'>
    ❗❗ Your Balance Cap Has Been Exceeded!
  </span>
</div>
}
{data &&  data.Limits.expenseCap!==null && data.Limits.totalExpenses  > data.Limits.expenseCap && 
  <div className='flex flex-col justify-center items-center bg-white shadow rounded-sm p-1 mb-1'>
  <span className='text-red-600 text-xl font-semibold'>
    ❗❗ Your Expense Cap Has Been Exceeded!
  </span>
</div>
}



<div className='flex w-full justify-center items-center'>


<div className='max-w-[500px] bg-indigo-50 p-2 rounded-sm '>


      <div className='flex flex-col justify-center items-center bg-white shadow rounded-sm p-1 mb-1'>
      {data && (data.Limits.balanceCap === null) ? (
  <span>You have no balance cap</span>
) : (
  <>
    <span className='font-bold'>Current Balance Cap:</span>   
    <div className='flex items-center justify-center'>
      <span className="text-lg sm:text-xl md:text-2xl text-green-500">{currencySymbol}</span>
      <span className='text-green-500 text-lg sm:text-xl md:text-2xl'>
        {data ? data.Limits.balanceCap : "0"}
      </span>
    </div>
  </>
)}

      
      </div>
    {data && data.Limits.balanceCap!==null && 
    <button onClick={ResetBalanceLimit} className='bg-orange-600 p-1 d-block w-full rounded-sm text-white hover:bg-orange-500 cursor-pointer'>Reset</button>}

        <form action="
        " onSubmit={handleSetBalance}>
             <div className='flex flex-col '>
            <h1 className='font-bold pt-2'>Set a balance cap</h1>
             <input type="number" className='p-1 mb-1 border border-indigo-400 outline-indigo-400 rounded-sm' onChange={(e)=>setBalance(e.target.value)} value={balance} placeholder='Enter amount' min={1} required/>

<button type='submit' className='bg-indigo-600 p-1 rounded-sm text-white hover:bg-indigo-500 cursor-pointer'>{loadingBal?"Loading...":"Submit"}</button>
        </div>
        <hr  className='mt-2 border-t-2 border-red-400'/>

        </form>
        <div className='flex flex-col justify-center items-center  bg-white shadow rounded-sm p-1 mt-2 mb-1'>

          {data && (data.Limits.expenseCap===null ) ?(
            <span>You have no expense cap</span>
          ):(
            <>
<span className='text-red-500 font-bold'>Current Expense Cap:</span> 
 <div className='flex items-center justify-center'>
 <span  className="text-lg sm:text-xl md:text-2xl text-red-500"   >{currencySymbol}</span>
 <span className='text-red-500 text-lg sm:text-xl md:text-2xl'>{data? data.Limits.expenseCap:"0"}</span>
 </div>
 </>
          )}

</div>
{data && data.Limits.expenseCap!==null && 
  <button onClick={ResetExpenseLimit} className='bg-orange-600 p-1 d-block w-full rounded-sm text-white hover:bg-orange-500 cursor-pointer'>Reset</button>     }

       <form action="
       " onSubmit={handleSetExpense}>
         <div className='flex flex-col'>
            <h1 className='font-bold pt-2'>Set an expense cap</h1>
            <input type="number" className='p-1 mb-1 border border-indigo-400 outline-indigo-400 rounded-sm' onChange={(e)=>setExpense(e.target.value)} value={expense}  placeholder='Enter amount' min={1} required/>
            <button type='submit' className='bg-indigo-600 p-1 rounded-sm text-white hover:bg-indigo-500 cursor-pointer'>{loadingexp?"Loading...":"Submit"}</button>
        </div>
        
       </form>
       
    </div>
    </div>
    </div>
  )
}
