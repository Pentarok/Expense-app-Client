import React from 'react'
import HomeIntro from './HomeIntro'
import About from './About'
import Contact from './Contact'
import Footer from './Footer'
const Homepage = () => {
  return (
    <div>
        <HomeIntro/>
        <div className='pt-1'>
        <About/>
        </div>
       
        <Contact/>
        <div>
            <Footer/>
        </div>
    </div>

  )
}

export default Homepage