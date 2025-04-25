import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const ResetPassword = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState(''); // success | error
  const [loading, setLoading] = useState(false);

  const { id, token } = useParams();
  const navigate = useNavigate();
  const serverUri = import.meta.env.VITE_BACKEND_URL;

  const handleSend = async (e) => {
    e.preventDefault();

    // Validation
    if (password !== confirmPassword) {
      setMessage("Passwords do not match! Please try again.");
      setStatus("error");
      return;
    }

    if (password.length < 8) {
      setMessage("Password must be at least 8 characters long.");
      setStatus("error");
      return;
    }

    try {
      setLoading(true);
      setMessage('');
      setStatus('');

      const res = await axios.post(
        `${serverUri}/reset-password/${id}/${token}`,
        { password },
        { withCredentials: true }
      );

      setMessage(res.data.message || "Password reset successful.");
      setStatus("success");

      // Optional: redirect after 3 seconds
      // setTimeout(() => navigate("/login"), 3000);

    } catch (error) {
      console.error(error);
      setStatus("error");

      if (error.response && error.response.data) {
        const backendError = error.response.data.error;

        if (
          backendError?.toLowerCase().includes("expired") ||
          backendError?.toLowerCase().includes("invalid")
        ) {
          setMessage("This reset link is invalid or has expired. Please request a new one.");
        } else {
          setMessage(backendError || "Something went wrong.");
        }
      } else {
        setMessage("Network error or server is not responding.");
      }
    } finally {
      setLoading(false);

      // Clear message after a short time (longer for errors)
      setTimeout(() => {
        setMessage('');
        setStatus('');
      }, status === "success" ? 5000 : 8000);
    }
  };

  return (
    <div className='flex justify-center items-center w-full p-4'>
      <div className='bg-black shadow-md rounded-md p-6 w-[450px]'>
        <h2 className='text-xl text-white font-semibold text-center mb-2'>Reset Your Password</h2>

        {message && (
          <div
            className={`p-3 rounded text-white text-sm  ${
              status === 'success' ? 'bg-green-500' : 'bg-red-500'
            }`}
          >
            {message}
          </div>
        )}

        <form onSubmit={handleSend} >
          <div>
            <label className='block text-white'>New Password</label>
            <input
              type='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className='bg-white mb-2  text-black w-full p-2 border rounded mt-1'
              placeholder='Enter new password'
            />
          </div>

          <div>
            <label className='block text-white'>Confirm New Password</label>
            <input
              type='password'
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className='bg-white mb-2 text-black w-full p-2 border rounded mt-1'
              placeholder='Confirm new password'
            />
          </div>

          <button
            type='submit'
            disabled={loading}
            className='w-full bg-orange-500 text-white p-2 rounded hover:bg-orange-600 transition'
          >
            {loading ? 'Processing...' : 'Reset Password'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
