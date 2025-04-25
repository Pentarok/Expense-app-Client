import React, { useContext, useEffect } from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faTimes } from "@fortawesome/free-solid-svg-icons";
import useAuth from './Auth';
import { useNavigate } from 'react-router-dom';
import useIsMediumScreen from './mediumScreen';
import { menuContext } from './HomeLayout';
import { toast } from 'react-toastify';
const Navabar = () => {
  const serverUri = import.meta.env.VITE_BACKEND_URL;
  const navigate = useNavigate()
  const {loading, session}=useAuth()

  const isMd=useIsMediumScreen();
  const {menuOpen,setMenuOpen}=useContext(menuContext)
useEffect(()=>{
  console.log(isMd)
},[isMd])
useEffect(()=>{
   if(!loading && !session){
    navigate('/login')
  }  
},[session,loading])

const handleLogout = () => {
  fetch(`${serverUri}/logout`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.message === 'Logout successful') {
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
        toast.success('Logout successful! Redirecting...', { position: 'top-right', autoClose: 2000 });
        setTimeout(() => navigate('/login'), 2500);
      } else {
        toast.error('Logout failed', { position: 'top-right', autoClose: 2000 });
      }
    })
    .catch((error) => {
      toast.error('Error during logout', { position: 'top-right', autoClose: 2000 });
    });
};

  return (
    <div className='bg-indigo-600 md:z-30 w-full h-[40px] fixed flex justify-between' >

      <div className=''>
      <button className='md:hidden' >
      <FontAwesomeIcon
  icon={faBars}
  size="2x"
  className="text-white ml-2 cursor-pointer "
  onClick={() => setMenuOpen(!menuOpen)}
/>

        </button>
      </div>
      <div>
        <button onClick={handleLogout} className='sm:w-32 w-28 p-1 my-1 mr-2 hover:bg-amber-500 cursor-pointer rounded-xl bg-orange-600 text-white font-semibold'>
          Logout
        </button>
      </div>

    </div>
  )
}

export default Navabar