import React from 'react'
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import { useNavigate } from 'react-router-dom';
const features = [
    {
      title: "Effortless Expense Tracking",
      description: "Log your spending in seconds and categorize transactions automatically.",
      icon: "✅",
    },
    {
      title: "Smart Budgeting",
      description: "Set monthly or weekly budgets and get alerts before overspending.",
      icon: "✅",
    },
    {
      title: "AI-Powered Insights",
      description: "Gain personalized financial recommendations and spending patterns.",
      icon: "✅",
    },
    {
      title: "Multi-Device Sync",
      description: "Access your finances from your phone, tablet, or computer.",
      icon: "✅",
    },
    {
      title: "Secure & Private",
      description: "Your financial data is encrypted and protected.",
      icon: "✅",
    },
  ];
 
  
const HomeIntro = () => {
const navigate = useNavigate();
  const getStarted = ()=>{
    navigate('/register')
  }
  return (
    <div className='p-4 max-w-full  flex flex-col sm:flex-row  text-white shadow bg-gray-900'>
      <div className='basis-1/2'>
      <h1 className='md:text-2xl font-bold text-gray-50'>Welcome to FinNance – Your Smart Expense Tracker & Financial Companion</h1>

      <p className="mt-2 text-white sm:text-xl p-2">
  Track smarter, spend wiser.<br />
  Stay on budget effortlessly.<br />
  Your financial freedom starts here.
</p>
 
       <button className='bg-green-500 text-white hover:bg-white hover:text-green-500 rounded-sm mt-8 p-2 sm:min-w-[270px] mb-2 font-bold cursor-pointer transition-all duration-300 sm:text-2xl' onClick={getStarted}>Get started</button>
        </div>  

        <LazyLoadImage
    alt="finance image"
    effect="blur"
    className='rounded-xl max-h-[380px] md:w-[350px] md:min-w-[200px]'
    wrapperProps={{
        // If you need to, you can tweak the effect transition using the wrapper style.
        style: {transitionDelay: "1s"},
    }}
    src="https://res.cloudinary.com/dtrskzurx/image/upload/v1745784520/ChatGPT_Image_Apr_27_2025_11_05_57_PM_qrvlht.png" />
    </div>
  )
}

export default HomeIntro