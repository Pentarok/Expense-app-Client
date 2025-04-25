import { useState } from 'react'

import './App.css'
import AppWrappe from './AppWrappe'
import { BrowserRouter, Routes,Route } from 'react-router-dom'
import HomeLayout from './HomeLayout'
import Login from './Login'
import Homepage from './Homepage'
import SignUp from './SignUp'
import GeneralLayout from './GeneralLayout'
import About from './About'
import Pricing from './Pricing'
import Contact from './Contact'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ErrorBoundary from './ErrorBoundary'
import ForgotPassword from './ForgotPassword'
import ResetPassword from './ResetPassword'
import Payment from './Payment'
import GeneralContextLayout from './GeneralContextLayout'
function App() {
  

  return (
    <>
  
    <BrowserRouter>
    <ToastContainer/>
    <ErrorBoundary>
    <Routes>
   
    <Route path='/' element={<GeneralLayout/>}>
               <Route path='/' element={<Homepage/>}></Route>
                 <Route path='/about' element={<About/>}></Route>  
                 <Route path='/contact' element={<Contact/>}></Route> 
                 <Route path='/pricing' element={<Pricing/>}></Route> 
                 <Route path='/reset-password' element={<ForgotPassword/>}></Route>
<Route path='/reset-password/:id/:token' element={<ResetPassword/>}></Route> 
       {/* 
                <Route path='/contact' element={<Contact/>}></Route> */}
                <Route path='/login' element={<Login/>}></Route>
                
                <Route path='/register' element={<SignUp/>}></Route>
         </Route>
         <Route path='/' element={<GeneralContextLayout/>}>
    <Route path='/finance/payment' element={<Payment/>}></Route>
    </Route>
<Route path='/user' element={<HomeLayout/>}>

<Route path='/user/page' element={<AppWrappe/>}></Route>
</Route>
    </Routes>
    </ErrorBoundary>
    </BrowserRouter>
     
    </>
  )
}

export default App
