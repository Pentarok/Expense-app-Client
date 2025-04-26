import React, { useContext, useEffect, useState } from 'react'
import axios from "axios"
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { TabContext } from './AppWrappe';
import { useQueryClient } from '@tanstack/react-query';
import { menuContext } from './HomeLayout';
const TransactionForm = () => {
  const queryClient = useQueryClient();
  const serverUri = import.meta.env.VITE_BACKEND_URL;
  const [Url,setUrl]=useState(`${serverUri}/add-income`)
  const [title,setTitle]=useState("");
  const [amount,setAmount]=useState("");
  const [date,setDate]=useState("");
  const [description,setDescription]=useState("");
  const [reqLoading,setReqLoading]=useState(false);
 
  const {userId}=useContext(menuContext);
  const globalData=useContext(TabContext);
  const {tab,isExpense}=globalData;

  const ClearForm = ()=>{
    setTitle("");
    setAmount("");
    setDescription("");
    setDate("");
  }
 useEffect(()=>{

  if(tab == 2){
    setUrl(`${serverUri}/add-expense`);
   }else if(tab == 3){
     setUrl(`${serverUri}/add-income`)
   }else{
    setUrl(`${serverUri}/add-saving`)
   }
   
 },[tab])
 
 useEffect(()=>{
  console.log(isExpense)
 },[isExpense])
  const handleFormSubmit = async (e)=>{
    e.preventDefault();
    try {
      setReqLoading(true)
      const res =  await axios.post(Url,{title,amount,date,description,userId});
    console.log(res);
    if(res.data.message == "Ok"){
      ClearForm();
      setReqLoading(false);
      if(tab == 2){
        
        toast.success("Expense added successfully");
        queryClient.invalidateQueries(['expenses']);
      }else if(tab == 3){
        queryClient.invalidateQueries(['incomes']);
        toast.success('Income added successfully')
      }else{
        queryClient.invalidateQueries(['savings'])
        toast.success('Saving added successfully')
      }

     
    }else{
      setReqLoading(false);
      toast.error("An error occured!!")
    }
    } catch (error) {
      setReqLoading(false)
    }
    finally{
      ClearForm();
      setReqLoading(false)
    }
  }
useEffect(()=>{
  console.log(tab)
},[tab])
  return (

 
    <div className='flex flex-col'>
        <form onSubmit={handleFormSubmit}>
            <div>
            <input type="text" className='w-full mt-2 border  border-indigo-400 bg-white rounded-xl shadow-sm py-1 px-1' value={title} onChange={(e)=>setTitle(e.target.value)} placeholder='title' required />
            </div>

            <div>
            <input type="number" className='w-full mt-2 border border-indigo-400  bg-white rounded-xl shadow-sm py-1 px-1' value={amount} min={1} onChange={(e)=>setAmount(e.target.value)} placeholder='Amount' required />
            </div>
          <div>
            <input type="date" className='w-full mt-2 border border-indigo-400 bg-white rounded-xl shadow-sm py-1 px-1' value={date} onChange={(e)=>setDate(e.target.value)} placeholder='Date' />
          </div>
         
          <div>
            <textarea name="" id="" className='w-full mt-2   bg-white border border-indigo-400 rounded-xl shadow-sm py-1 px-1' value={description} onChange={(e)=>setDescription(e.target.value)}  placeholder='Add reference'></textarea>
          </div>
          <div>
            <button  disabled={reqLoading}  className={`${
        tab == 2 ? 'bg-red-700 hover:bg-red-600' : 'bg-green-700 hover:bg-green-600'
      } text-white py-1 px-2 rounded-xl shadow cursor-pointer`}
     >
          {reqLoading ? (
    "Loading"
  ) : tab == 2 ? (
    "Add Expense"
  ) : tab == 3 ? (
    "Add Income"
  ) : tab == 4 ? (
    "Add Saving"
  ) : (
    "Submit"
  )}
          
            </button>
          </div>
        </form>
    </div>
  )
}

export default TransactionForm