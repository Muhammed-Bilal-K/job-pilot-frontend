import React from 'react'
import Navbar from '../../components/userComponents/navbar/Navbar'
import Highlight from './Highlight'
import BoxSection from './Alldata'

const Hero:React.FC = () => {
  return (
    <>
        <Navbar />
        <Highlight />
        <BoxSection />
    </>
  )
}

export default Hero