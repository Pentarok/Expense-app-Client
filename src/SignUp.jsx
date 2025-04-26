import React, { useState } from 'react'

import { Link, useNavigate } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';

import { toast } from 'react-toastify';


const SignUp = () => {
    const [isVisible,setIsVisible]=useState(false);

    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');
    const [message,setMessage]=useState('');
    const[loading,setLoading]=useState(false);
    const [username,setUserName]=useState('');
    const serverUri = import.meta.env.VITE_BACKEND_URL;
    const togglePasswordVisibility=()=>{
setIsVisible(!isVisible);
    }
    const clearMessage = ()=>{
        setTimeout(() => {
          setMessage('');
        }, 5000);
      }

const navigate = useNavigate();
    const handleFormSubmit = async (e)=>{
        e.preventDefault();
        try {
            setLoading(true)
            const res = await axios.post(`${serverUri}/signup`,{username,email,password},{withCredentials:true})
            console.log(res)
            if(res.data=="Ok"){
                setEmail('');
                setPassword('');
                setUserName('');
                setLoading(false)
                toast.success("Account registered successfully. Redirecting...");
                setTimeout(() => {
                    navigate('/login')
                }, 2000);
            }else{
                toast.error("An error occured!")
                setLoading(false);
            }  
        } catch (error) {
            if(error.response){
                console.log(error.response)
                setMessage((error.response.data.error));
                clearMessage();
            }
            setLoading(false);
        }

    }
  return (
    <div className='w-full p-2 flex justify-center items-center mt-2'>
<div className="flex flex-col rounded-xl shadow  bg-slate-200 w-[400px] max-w-[400px] p-2">
<h4 className='text-center text-dark text-xl font-bold'>Sign Up</h4>
{message && <div className={message.includes('Ok')?"":'error'}>{message}</div>}
    <form action="" onSubmit={handleFormSubmit}>


    <div>
            <label htmlFor="" className=' text-black'>Username:</label>
           <div>
           <input type="text" value={username} className='w-full border p-2 md:p-1 border-black rounded-xl text-black' onChange={(e)=>setUserName(e.target.value)} required/>
            </div>
        </div>

        <div>
            <label htmlFor="" className=' text-black'>Email:</label>
           <div>
           <input type="email" value={email} className='w-full border p-2 md:p-1 border-black rounded-xl text-black' onChange={(e)=>setEmail(e.target.value)} required/>
            </div>
        </div>

        <div>
            <label htmlFor="" className=' text-black'>Password:</label>
            <div className=' relative'>
            <input  type={isVisible?"text":"password"} className='w-full p-2 md:p-1 border border-black rounded-xl text-black' value={password} onChange={(e)=>setPassword(e.target.value)} required/>
           
            <div className="absolute right-2 bottom-1" onClick={togglePasswordVisibility}>
            <FontAwesomeIcon  icon={isVisible?faEye: faEyeSlash} color='black' className='cursor-pointer'/>
            </div>
            </div>

            <div className="w-full flex justify-center items-center">
                <div>
                    <button className='bg-orange-400 cursor-pointer hover:bg-amber-500 p-2 rounded-xl w-32 mt-2' disabled={loading}>{loading?"Loading..":"Submit"}</button>
                </div>
            </div>

            <div style={{marginTop:'8px'}}>
                <p className='text-black'>Already have an account? <span><Link to='/login' className='text-orange-400 font-bold'>Login</Link></span></p>
            </div>
        </div>
    </form>
</div>
    </div>
  )
}

export default SignUp