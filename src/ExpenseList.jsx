import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash} from "@fortawesome/free-solid-svg-icons";
import {  faDollarSign, faCalendar,faCircle, faComment, faMessage } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { QueryClient, useQueryClient } from '@tanstack/react-query';
import "react-toastify/dist/ReactToastify.css";
import { toast } from 'react-toastify';
import { useContext } from 'react';
import { TabContext } from './AppWrappe';
import { format } from 'date-fns';
const ExpenseList = ({amount,info,title,date,id}) => {

  const serverUri = import.meta.env.VITE_BACKEND_URL;
const queryClient = useQueryClient()
  const handleDelete = async(itemId)=>{
    try {
      const res = await axios.delete(`${serverUri}/delete-expense/${itemId}`);
      if (res.data.status == "Ok"){
        queryClient.invalidateQueries(['expenses']);
        toast.success(res.data.message);
      }else{
        toast.error(res.data.message)
      }
    } catch (error) {
      console.log(error)
    }

    
  }
  const globalData = useContext(TabContext);
    const {currencySymbol}=globalData;
  return (
    <div className='flex justify-between items-center bg-white rounded xl shadow-sm py-2 mt-2 px-1'>
    <div>
     
          <div>
              <FontAwesomeIcon icon={faCircle} className="text-red-500 text-[8px]" />
                  < span className='pl-2 text-slate-800 text-sm'>{title}</span>
           </div>
                   <div className='flex gap-1 sm:gap-2 flex-col sm:flex-row'>
          
                          <div className='flex items-center'>
                               <span className="text-sm  text-red-500"   >{currencySymbol}</span>
                                  <span className='text-sm font-semibold text-red-600'>{amount}</span>
       
                          </div>
         
                          <div className='flex items-center'>
                                  <FontAwesomeIcon icon={faCalendar} className="text-black text-sm " />
                                  <span className='text-sm pl-2 text-slate-800'>{format(new Date(date), 'dd/MM/yyyy')}</span>
                          </div>
{/* 
      infoerence */}
                          <div className='flex items-center'>
                                  <FontAwesomeIcon icon={faComment} className="text-black text-sm" />
                                    <span className='text-sm pl-1'>{info}</span>
                           </div>
                   </div>

       
  </div>
  <div className=''>
         {/* delete icon */}
         <FontAwesomeIcon icon={faTrash} className="text-white text-[10px] sm:text-sm cursor-pointer hover:bg-red-500 bg-black px-2 py-2 rounded-full  " onClick={()=>handleDelete(id)} />
       </div>
</div>
  )
}

export default ExpenseList