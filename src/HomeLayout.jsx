import React, { createContext, useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom'
export const menuContext = createContext();
import { ToastContainer,toast } from 'react-toastify';
import Navabar from './Navabar';
import useAuth from './Auth';
const HomeLayout = () => {
    const [menuOpen,setMenuOpen]=useState(false);
    const [userId,setUserId]=useState('');
    const [userData,setUserData]=useState([])
    useEffect(()=>{
      setUserId(localStorage.getItem('userId'));
     },[userId])
     useEffect(()=>{
       console.log(userId);
     },[userId])

     const {loading, user}=useAuth();
     useEffect(()=>{
      if(!loading)
         setUserData(user);
     },[loading])
  return (
<>
<div className='homepage'>
<menuContext.Provider value={{menuOpen, setMenuOpen ,userId, userData}}>
<Navabar />

    <Outlet/>
</menuContext.Provider>

    </div>
</>
  )
}

export default HomeLayout