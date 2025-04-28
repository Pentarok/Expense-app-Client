import React, { useEffect, useState } from 'react'

import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import Auth from './Auth';
import useAuth from './Auth';
const Login = () => {
    const navigate = useNavigate();
    const [message,setMessage]=useState('');
    const [email,setEmail]=useState('')
    const [password,setPassword]=useState('');
    const [loading1,setloading1]=useState(false);
    const [isSuccess,setIsSuccess]=useState(false)
    const [isVisible,setIsVisible]=useState(false);
    const serverUri = import.meta.env.VITE_BACKEND_URL;

    const {session, loading}=useAuth();

    const togglePasswordVisibility=()=>{
setIsVisible(!isVisible);
    }
    const clearMessage = ()=>{
      setTimeout(() => {
        setMessage('');
      }, 3000);
    }
    const handleLogin = async (e) => {
      e.preventDefault();
      if (loading1) return; // Prevent duplicate clicks
      setloading1(true);
      setMessage(''); // Clear any previous message
    
      try {
        const res = await axios.post(
          `${serverUri}/login`,
          { email, password },
          { withCredentials: true }
        );
    
        setloading1(false);
        console.log(res);
    
        if (res.data.message == 'Login success') {
          setMessage('Login successful!');
          setIsSuccess(true);
    
          // Store token and user data
          localStorage.setItem('token', res.data.token); // No need to `JSON.stringify` if it's just a string
          localStorage.setItem('userId', res.data.user._id);
    navigate('/user/page');
          // Navigate based on user role
        /*   if (res.data.user.role === 'admin') {
            navigate('/admin');
          } else {
            navigate('/userpage');
          } */
        } else {
          setMessage(res.data.message);
          setIsSuccess(false);
          clearMessage();
        }
      } catch (error) {
        setloading1(false);
    
        if (error.response) {
          setMessage('An error occurred. Please try again.');
         /*  console.error('Error response:', error.response);
          setMessage(error.response.data.message); */
        } else if (error.request) {
          setMessage('An error occurred. Please try again.');
          /* console.error('Error request:', error.request);
          setMessage('No response from the server. Please try again.'); */
        } else {
          console.error('Error:', error.message);
          setMessage('An error occurred. Please try again.');
        }
    
        setIsSuccess(false);
        clearMessage();
      }
    };
   useEffect(()=>{
    if(session && !loading){
        navigate('/user/page');
      }
   },[session,loading]) 
   
  return (
    <div className='w-full flex justify-center items-center p-4'>

    
    <div className='bg-slate-200 rounded-xl shadow flex flex-col w-[400px] max-w-[400px] p-2'>
<div className=" ">
<h4 className='text-center text-black'>Login</h4>

{message &&<div className={message.includes('successful')?'bg-white shadow-sm rounded-sm p-2 text-green-400':'bg-white shadow-sm p-2 rounded-sm text-red-600'}>
  {message}
</div> }
    <form action="" onSubmit={handleLogin}>
        <div>
            <label htmlFor="" className=' text-black'>Email:</label>
           <div>
           <input type="email" value={email}  className='rounded-xl border w-full border-black p-1 text-black' onChange={(e)=>setEmail(e.target.value)} required/>
            </div>
        </div>
        <div>
            <label htmlFor="" className=' text-black'>Password:</label>
            <div className='relative'>
            <input  type={isVisible?"text":"password"} className='text-black rounded-xl border w-full p-1 border-black' value={password} onChange={(e)=>setPassword(e.target.value)} required/>
           
            <div className="login-icon absolute right-2 bottom-1" onClick={togglePasswordVisibility}>
            <FontAwesomeIcon  icon={isVisible?faEye: faEyeSlash} className='cursor-pointer' color='black'/>
            </div>
            </div>

            <div className="w-full flex mt-1 justify-center items-center">
                <div>
                    <button className='w-32 rounded-xl p-2 hover:bg-amber-500 cursor-pointer bg-orange-400 text-white' disabled={loading1}>{loading1?"loading...":"Login"}</button>
                </div>
            </div>
<div>
<Link to='/reset-password' className='text-black'>Forgot Pasword?</Link>
</div>
            <div style={{marginTop:'8px'}}>
                <p className='text-black'>Don't have an account? <span><Link to='/register' className='font-bold text-orange-500'>Sign Up</Link></span></p>
            </div>
        </div>
    </form>
</div>
    </div>
    </div>
  )
}

export default Login