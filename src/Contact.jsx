import React from 'react'
import ContactMini from './ContactMini'

const Contact = () => {
  return (
    <div className='w-full flex gap-2 md:flex-row p-2 flex-col'>
    
        <div className='bg-black md:w-[500px] p-2 mt-2  rounded-xl shadow  text-white'>
        <h1 className='md:text-2xl font-bold text-center pb-2'>Contact Us</h1>
            <form action="">
                <div className='flex flex-col'>
<div>
    <input type="text" className='w-full p-2 rounded-xl border border-white mb-2 focus:border-green-600' placeholder='Enter name'/>
</div>
<div>
<input type="text" className='w-full p-2 rounded-xl border border-white mb-2  focus:border-green-600' placeholder='Enter Email'/>
</div>
<div>
    <textarea name="" placeholder='Enter Message' className='w-full p-2 rounded-xl border border-white mb-1 focus:border-green-600' id=""></textarea>
</div>
<div className='flex justify-center align-center'>
    <button className='rounded-xl p-2 cursor-pointer bg-orange-400 hover:bg-orange-500 w-[180px]'>Submit</button>
</div>
                </div>
            </form>
        </div>
        <div>
            <ContactMini/>
        </div>
    </div>
  )
}

export default Contact