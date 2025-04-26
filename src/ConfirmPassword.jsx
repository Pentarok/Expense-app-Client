import React from 'react'

const ConfirmPassword = ({setdBoxOpen,password,setPassword,action,message,reqLoding}) => {
  return (
    <div className='relative bg-white mb-2 border border-blue-300 p-2'>
        <span onClick={(e)=>setdBoxOpen(false)} className=' cursor-pointer absolute right-0 top-0 hover:bg-red-600 hover:text-black bg-black w-[20px] mb-5  flex items-center justify-center text-red-500'>X</span>
        <form action="
          ">
        <div className='flex flex-col'>
          
              <label htmlFor="">{message}</label>
        <input type="password" placeholder='Enter password to proceed' className='p-2 rounded-sm mb-2 border outline-blue-400 outline:border-2 border-blue-400 ' value={password} onChange={(e)=>setPassword(e.target.value)} required/>
        <button type='submit' onClick={action} className='bg-green-400 p-1 rounded-sm w-full md:min-w-[180px] cursor-pointer hover:bg-green-500 '>{reqLoding?"Loading...":"Confirm"}</button>   
         
      
        </div>
        </form>
    </div>
  )
}

export default ConfirmPassword