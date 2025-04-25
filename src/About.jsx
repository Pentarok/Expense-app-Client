import React from 'react'
const newFeatures = [
    {
      title: "AI-Driven Insights",
      description: "Get smart recommendations to optimize your spending.",
      icon: "🚀",
    },
    {
      title: "Custom Budgeting",
      description: "Tailor budgets based on your income and lifestyle.",
      icon: "💰",
    },
    {
      title: "Security First",
      description: "Your financial data is encrypted and never shared.",
      icon: "🔒",
    },
    {
      title: "User-Friendly Interface",
      description: "Track expenses with ease on any device.",
      icon: "📊",
    },
  ];
  
const About = () => {
  return (
    <div className='bg-white p-4'>
        <h1 className='sm:text-2xl font-bold text-center'>About Us</h1>
        <p>FinNance was born out of a need for a better financial management solution. We wanted to create a tool that goes beyond basic expense tracking—one that offers AI-powered insights, real-time analytics, and an intuitive interface to help users make smarter financial decisions.</p>
    <h1 className='text-xl font-bold md:pt-2 md:pb-1'>Our Mission</h1>
    <p>We are dedicated to helping people build financial confidence by providing tools that make budgeting and expense tracking stress-free. Our goal is to give you full control over your money so you can spend smarter and save more.</p>
   <h1 className='text-xl font-bold md:pt-2 md:pb-1'>What Makes Us Different?</h1>
   {newFeatures.map((ft,i)=><div key={i}>
    <span>{ft.icon}</span>
    <span className='text-gray-900 font-semibold'>{ft.title}</span>
    <p className='md:pb-1'>-{ft.description}</p>
   </div>)}
    </div>
    
  )
}

export default About