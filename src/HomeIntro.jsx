import React from 'react'
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
  return (
    <div className='p-4 rounded-xl shadow bg-white'>
        <h1 className='md:text-2xl font-bold text-green-600'>Welcome to FinNance – Your Smart Expense Tracker & Financial Companion</h1>

        <h2 className='text-xl font-bold text-green-500 md:pt-2' >Why Choose us?</h2>
     {/*    features */}
     <ul>
     {features.map((ft,i)=>
     <div key={i} className='mb-2'><li className='font-bold mb-0'>{ft.title}</li>
     <span>-{ft.description}</span></div>)}
     </ul>
     <h1 className='text-xl text-green-600 pl-3'>Start Managing Your Money Better Today!</h1>
   <p>Join thousands of users simplifying their finances. Sign up now and take the first step toward financial freedom!</p>
    </div>
  )
}

export default HomeIntro