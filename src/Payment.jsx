import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';
import useAuth from './Auth';
import Inactive from './Inactive';
const Payment = () => {
    const [phonNumber, setPhonNumber] = useState('');
    const [userId, setUserId] = useState(null);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [loading2, setLoading] = useState(false);
    const serverUrl = import.meta.env.VITE_BACKEND_URL;

    useEffect(() => {
        setUserId(localStorage.getItem('userId'));
    }, []);

    const isValidKenyanPhone = (number) => {
        const regex = /^(07|01)\d{8}$/;
        return regex.test(number);
    }

    const formatToInternational = (number) => {
        return `254${number.slice(1)}`;
    }

    const handleFormSubmit = async (e) => {
        e.preventDefault();

        if (!isValidKenyanPhone(phonNumber)) {
            setError('Please enter a valid Kenyan phone number (starting with 07 or 01 and 10 digits long).');
            setSuccess('');
            setTimeout(() => {
                setError('');
            }, 5000);
            return;
        }

        const formattedNumber = formatToInternational(phonNumber);
        setError('');
        setSuccess('');

        try {
            setLoading(true);
            const res = await axios.post(`${serverUrl}/initiate`, {
                phonNumber: formattedNumber,
                userId
            });

            setLoading(false);
            const responseCode = res.data.stkResponse.ResponseCode;

            if (responseCode == 0) {
                setSuccess('Request submitted successfully. Check your phone to complete the transaction.');
                setPhonNumber('');
                setTimeout(() => {
                    setSuccess('');
                }, 5000);
            } else {
                setError('Transaction request failed. Please try again.');
                setTimeout(() => {
                    setError('');
                }, 5000);
            }
        } catch (err) {
            setLoading(false);
            setError('An error occurred!!');
            setTimeout(() => {
                setError('');
            }, 5000);
        }
    }
const {user,loading}=useAuth()
    return (
        <div className='flex md:flex-row flex-col w-full justify-center'>
       {!loading && user.active!==true &&
        <Inactive />
       }
         
          
            <div className='bg-gray-100 p-2 flex flex-col w-full md:max-w-[400px]  rounded-xl m-2'>
                <h1 className='text-center'>Pay with Mpesa</h1>

                {/* Show success or error alert */}
                {success && (
                    <p className='bg-green-400 m-1 p-2 rounded text-white text-sm text-center'>
                        {success}
                    </p>
                )}
                {error && (
                    <p className='bg-red-500 m-1 p-2 rounded text-white text-sm text-center'>
                        {error}
                    </p>
                )}

                <form onSubmit={handleFormSubmit} className=''>
                    <div className='flex flex-col'>
                        <label htmlFor="">Enter phone number</label>
                        <input
                            type="tel"
                            className='text-black border  mb-2 border-black p-1 rounded-sm'
                            value={phonNumber}
                            
                            onChange={(e) => setPhonNumber(e.target.value)}
                            placeholder='e.g. 0712345678'
                        />

<label htmlFor="">Amount(Ksh)</label>
                        <input
                          
                            className='text-black border-none outline-none mb-2 bg-white p-1 rounded-sm'
                            value="100"
                            onChange={(e) => setPhonNumber(e.target.value)}
                          readOnly
                        />
                    </div>
                    <div>
                        <button type='submit' className='bg-green-500 w-full rounded-sm cursor-pointer hover:bg-green-600 text-white p-1'>
                            {loading2 ? "loading..." : "Submit"}
                        </button>
                    </div>
                </form>

                {/* Support block */}
                <div className='mt-4 p-2 bg-white border border-gray-400 rounded'>
                    <p className='text-sm mb-1'>
                        If you have another payment method or are unable to pay with Mpesa, please contact our support team for assistance.
                    </p>
                    <p className='text-sm'>
                        <strong>Support Phone:</strong> +254 712 345 678<br />
                        <strong>Email:</strong> support@example.com
                    </p>
                </div>
            </div>

        </div>
    )
}

export default Payment
