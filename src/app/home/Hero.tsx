import React from 'react'
import Navbar from '../../components/userComponents/navbar/Navbar'
import Highlight from './Highlight'
import BoxSection from './Alldata'
import JobWork from './JobWork'
import PopularJobs from './PopularJobs'
import BecomePart from './BecomePart'
import Footer from './Footer'

const Hero:React.FC = () => {
  return (
    <>
        <Navbar />
        <Highlight />
        <BoxSection />
        <JobWork/>
        <PopularJobs />
        <BecomePart />
        <Footer />
    </>
  )
}

export default Hero