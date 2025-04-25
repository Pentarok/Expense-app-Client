import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash} from "@fortawesome/free-solid-svg-icons";
import {  faDollarSign, faCalendar,faCircle, faComment, faMessage } from '@fortawesome/free-solid-svg-icons';
import "react-toastify/dist/ReactToastify.css";
import {  toast } from 'react-toastify';
import axios from 'axios';
import { useQueryClient } from '@tanstack/react-query';

const IncomeList = ({amount,info,title,id}) => {
  const queryClient = useQueryClient()
  const handleDelete = async(itemId)=>{
    try {
      const res = await axios.delete(`http://localhost:5000/api/v1/delete-income/${itemId}`);
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
                                  <span className='text-sm pl-2 text-slate-800'>27/2/2024</span>
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
         <FontAwesomeIcon icon={faTrash} className="text-white text-[10px] sm:text-sm cursor-pointer hover:bg-red-500 bg-black px-2 py-2 rounded-full " onClick={()=>handleDelete(id)}/>
       </div>
</div>
  )
}

export default IncomeList