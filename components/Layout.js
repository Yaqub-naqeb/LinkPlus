import React from 'react'
import Modal from '../redux/reducers/modal'
import Navbar from './Navbar'
import { Poppins } from "@next/font/google";
const poppins = Poppins({ subsets: ["latin"],weight: ['600','400','700'] });
const Layout = ({children}) => {
  return (
    <div className={poppins.className}>
<Navbar/>
        {children}
    </div>
  )
}

export default Layout
