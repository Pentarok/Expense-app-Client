import React, { useContext, useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash} from "@fortawesome/free-solid-svg-icons";
import {  faDollarSign, faCalendar,faCircle, faComment, faMessage } from '@fortawesome/free-solid-svg-icons';
import "react-toastify/dist/ReactToastify.css";
import {  toast } from 'react-toastify';
import axios from 'axios';
import { useQueryClient } from '@tanstack/react-query';
import { TabContext } from './AppWrappe';
import { format } from 'date-fns';
const IncomeList = ({amount,info,title,id,date}) => {
  const globalData = useContext(TabContext);

  const {tab}=globalData;
  const [BaseUrl,setBaseUrl]=useState("");
  const queryClient = useQueryClient()
  const [deleteLoad,setDeleteLoad]=useState(false);
const serverUri = import.meta.env.VITE_BACKEND_URL;
  useEffect(()=>{
if(tab == 3){
  setBaseUrl(`${serverUri}/delete-income`)
}else if(tab == 4){
 setBaseUrl(`${serverUri}/delete-saving`)
}
  },[tab])
  const handleDelete = async(itemId)=>{
    try {
      setDeleteLoad(true);
      const res = await axios.delete(`${BaseUrl}/${itemId}`);
      if (res.data.status == "Ok"){
        setDeleteLoad(false);
        if(tab == 3){
          queryClient.invalidateQueries(['incomes']);
          
        }else if(tab === 4){
          queryClient.invalidateQueries(['savings']);
        }
        
        toast.success(res.data.message);
      }else{
        setDeleteLoad(false);
        toast.error(res.data.message)
      }
    } catch (error) {
      setDeleteLoad(false);
      console.log(error)
    }
}


const {currencySymbol}=globalData;
  return (
    <div className='flex justify-between items-center bg-white rounded xl shadow-sm py-2 mt-2 px-1'>
    <div>
      
          <div >
              <FontAwesomeIcon icon={faCircle} className="text-green-500 text-[8px]" />
                  < span className='pl-2 text-slate-800 text-sm'>{title}</span>
           </div>
                   <div className='flex gap-1 sm:gap-2 flex-col sm:flex-row'>
          
                          <div className='flex items-center'>
                          <span  className="text-sm  text-green-500"   >{currencySymbol}</span>
                          <span className='text-sm font-semibold text-green-500'>{amount}</span>
       
                          </div>
         
                          <div className='flex items-center'>
                                  <FontAwesomeIcon icon={faCalendar} className="text-black text-sm " />
                                  <span className='text-sm pl-2 text-slate-800'>{format(new Date(date), 'dd/MM/yyyy')}</span>
                          </div>
{/* 
      infoerence */}
                          <div className='flex items-center'>
                                  <FontAwesomeIcon icon={faComment} className="text-green-500 text-sm" />
                                    <span className='text-sm pl-1'>{info}</span>
                           </div>
                   </div>

       
  </div>
  <div className=''>
         {/* delete icon */}
         {deleteLoad?
                 "Loading..."
                  : <FontAwesomeIcon icon={faTrash} className="text-white text-[10px] sm:text-sm cursor-pointer hover:bg-red-500 bg-black px-2 py-2 rounded-full " onClick={()=>handleDelete(id)}/>
         }

       </div>
</div>
  )
}

export default IncomeList