import React from 'react'


import { MdEmail, MdCall } from "react-icons/md";
import { FaMapMarkerAlt } from 'react-icons/fa'; // FontAwesome
const ContactMini = () => {
    const contacts = [
        "+254705678934","+254734567890"
      ]
  return (
    <div className='bg-black text-white p-2 rounded-xl w-full mt-2'>
{/*          <h2 className="text-2xl font-bold  pb-2  text-left">Contact Us</h2> */}
              {contacts.map((contact,i)=>
              <div className="flex gap-1  items-center">
              <MdCall color='green' className='w-5 h-5 rounded-full border bg-white '/>
              <p className="pb-1">{contact}</p>
            </div>)}
            <div className="inline-flex items-center space-x-1 justify-center">
  <FaMapMarkerAlt className="text-lg" />
  <span className=''>Along Wembley road near Bravin barracks</span>
</div>

           <div className="flex gap-1 items-center ">
            <MdEmail />
            <p>info@gloryvine.co.ke</p>
           </div>
    </div>
  )
}

export default ContactMini