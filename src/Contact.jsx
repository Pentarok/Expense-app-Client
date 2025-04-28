import React from 'react'
import ContactMini from './ContactMini'
import { useState } from 'react';
import axios from "axios"
const Contact = () => {
    const contactEndpoint = import.meta.env.VITE_CONTACT_ENDPOINT;

    const [message, setMessage] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');

    const hideMessage = () => {
        setTimeout(() => {
            setAlertMessage("");
        }, 3000);
    };

    const RestoreDefault = () => {
        setName('');
        setMessage('');
        setEmail('');
    };

    const PostMessage = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            const serverUri = import.meta.env.VITE_BACKEND_URL;

            const res = await axios.post(`${contactEndpoint}`, { email, name, message }, { withCredentials: true });
             console.log(res);
            if (res.data.success == true) {
                setLoading(false);
                setAlertMessage('Message sent successfully');
           RestoreDefault();
               hideMessage();
            } else {
                setAlertMessage('An error occurred! Please try again');
                setLoading(false);
            }
        } catch (error) {
            console.log(error);
            setAlertMessage('An error occurred! Please try again');
            setLoading(false);
            
            hideMessage();
        }
    };

  return (
    <div className='w-full flex gap-2 h-full md:flex-row p-2 flex-col'>
    
        <div className='bg-black md:w-[500px] p-2 mt-2  rounded-xl shadow  text-white'>
        <h1 className='md:text-2xl font-bold text-center pb-2'>Contact Us</h1>
            <form action="" onSubmit={PostMessage}>
                <div className='flex flex-col'>
<div>
    <input type="text" className='w-full p-2 rounded-xl border border-white mb-2 focus:border-green-600' placeholder='Enter name' required value={name} onChange={(e)=>setName(e.target.value)}/>
</div>
<div>
<input type="text" className='w-full p-2 rounded-xl border border-white mb-2  focus:border-green-600' placeholder='Enter Email' required value={email} onChange={(e)=>setEmail(e.target.value)}/>
</div>
<div>
    <textarea name="" placeholder='Enter Message' className='w-full p-2 rounded-xl border border-white mb-1 focus:border-green-600' id="" value={message} required onChange={(e)=>setMessage(e.target.value)}></textarea>
</div>

{alertMessage && (
  <div className={`bg-white rounded-sm p-2 mb-2 ${alertMessage.includes('error') ? 'text-red-500' : 'text-green-500'}`}>
    {alertMessage}
  </div>
)}

<div className='flex justify-center align-center'>
 
    <button type='submit' disabled={loading}  className='rounded-xl p-2 disabled:bg-orange-300 cursor-pointer bg-orange-400 hover:bg-orange-500 w-[180px]'>{loading?"Loading...":"Submit"}</button>
</div>
                </div>
            </form>
        </div>
        <div className='h-full'>
            <ContactMini/>
        </div>
    </div>
  )
}

export default Contact