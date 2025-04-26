import React, { useContext, useEffect, useState } from 'react';
import CurrencySelector from './Currency';
import { ToastContainer, toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import ConfirmPassword from './ConfirmPassword';
import { CirclesWithBar } from 'react-loader-spinner';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { TabContext } from './AppWrappe';

const Settings = ({onRemount,globalData,setGlobalData}) => {
  const [userId, setUserId] = useState(null);

  const [username, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [dBoxOpen, setdBoxOpen] = useState(null);
  const [currency, setCurrency] = useState('');
  const [loadFetch,setLoadFetch]=useState(false);
  const navigate = useNavigate();
  const [reqLoading,setReqLoading]=useState(false);
  const queryClient = useQueryClient();
  const id = localStorage.getItem('userId');
  const serverUri = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
   
    fetchUserData(id)
  }, [id]);

  const fetchUserData = async (UserId) => {
    setLoadFetch(true);
    const res = await axios.get(`${serverUri}/userdata/${UserId}`, {
      withCredentials: true,
    });
  
    if (res) {
      setUserName(res.data.userData.username );
      setEmail(res.data.userData.email);
      setCurrency(res.data.userData.currency);
      setLoadFetch(false);
    }
  };


 

  const handleAccountDeletion = async (e) => {
    e.preventDefault();

    const Url = `${serverUri}/user/delete`;
    const userId = localStorage.getItem('userId');

    try {
      setReqLoading(true);
      const res = await axios.post(Url, { userId, password }, {
        withCredentials: true,
      });

      if (res.data.status === 200) {
        setReqLoading(false);
        toast.success("Account deleted successfully. Redirecting...");
        const cachedItems = ["currency", "openTab", "userId", "token"];

        await axios.post(
          `${serverUri}/logout`,
          {}, // empty request body
          {
            withCredentials: true,
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
          }
        );
        

        cachedItems.forEach((item) => localStorage.removeItem(item));

        setTimeout(() => {
          navigate('/login');
        }, 2000);
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      toast.error(error.message || "Account deletion failed.");
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const Url = `${serverUri}/user/update`;
    const userId = localStorage.getItem('userId');
    let currency;
    currency = localStorage.getItem('currency');
    try {
      setReqLoading(false);
      const res = await axios.post(Url, { userId, username, email, currency, password }, {
        withCredentials: true,
      });

      console.log("Before update:", globalData);
      setGlobalData(prev => {
        const updated = { ...prev, username, email, currency };
        console.log("After update:", updated);
        return updated;
      });
      

      console.log(globalData)
      
      toast.success("Profile updated successfully");
      setReqLoading(false);
      setTimeout(() => {
        if (onRemount) onRemount();
      }, 3000);
      

    } catch (error) {
      console.error(error);
      setReqLoading(false)
      if (error.response) {
        toast.error(error.response.data.message || "Update failed");
      } else {
        toast.error("Network error or server is not responding");
      }
    }
  };

  if(loadFetch){
    return <div className='bg-slate-50 flex justify-center items-center h-full w-full fixed bottom-0'>
    <CirclesWithBar
      height="80"
      width="80"
      color="#4fa94d"
      outerCircleColor="#0000ff"
      innerCircleColor="#000000"
      barColor="#0000ff"
      ariaLabel="circles-with-bar-loading"
      wrapperStyle={{}}
      wrapperClass=""
      visible={true}
      />
        </div>
  }
  return (
    <div className='bg-slate-200 p-2 w-full md:w-[600px] rounded-sm'>
      <div className='flex flex-col'>
        <h1 className='md:text-2xl font-bold text-center'>Personal info</h1>
        <form>
          <div className='flex flex-col'>
            <label htmlFor="">Username</label>
            <input
              type="text"
              className='p-2 rounded-xl shadow border hover:border-2 outline-none border-blue-400'
              value={username}
              required
              onChange={(e) => setUserName(e.target.value)}
            />
          </div>
          <div className='flex flex-col'>
            <label htmlFor="1">Email</label>
            <input
              type="email"
              required
              className='p-2 rounded-xl border shadow border-blue-400 hover:border-2 outline-none'
              id="1"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        </form>
      </div>

      <div>
        <h1 className='md:text-2xl font-bold text-center'>Account preferences</h1>
        <CurrencySelector currency={currency} setCurrency={setCurrency} />

      </div>

      {dBoxOpen !== 1 && (
        <div className='pr-2'>
          <button
            type='submit'
            className='bg-green-400 text-white p-2 rounded-sm w-full block shadow m-2 block  ml-2 cursor-pointer hover:bg-green-600'
            onClick={(e) => setdBoxOpen(1)}
          >
            Update
          </button>
        </div>
      )}

      {dBoxOpen === 1 && (
        <ConfirmPassword
          setPassword={setPassword}
          password={password}
          setdBoxOpen={setdBoxOpen}
          action={handleFormSubmit}
          reqLoading={reqLoading}
          message="Password is required"
        />
      )}

      <div>
        <h1 className='md:text-2xl font-bold text-center'>Credentials</h1>
        <Link
          to='/reset-password'
          className='bg-blue-500 block text-center rounded-sm shadow p-1 text-white m-1 cursor-pointer hover:bg-blue-600'
        >
          Reset password
        </Link>
      </div>

      <div className='w-full pr-2'>
        <h1 className='text-center font-bold md:text-2xl'>Account deletion</h1>
        {dBoxOpen !== 2 && (
          <button
            className='bg-red-500 w-full block rounded-sm shadow p-1 text-white m-1 cursor-pointer hover:bg-red-600'
            onClick={() => setdBoxOpen(2)}
          >
            Delete Account
          </button>
        )}
        {dBoxOpen === 2 && (
          <ConfirmPassword
            setPassword={setPassword}
            password={password}
            setdBoxOpen={setdBoxOpen}
            action={handleAccountDeletion}
            message="Action can not be undone!"
          />
        )}
      </div>

      <ToastContainer />
    </div>
  );
};

export default Settings;
 