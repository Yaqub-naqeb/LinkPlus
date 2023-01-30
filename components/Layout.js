import React from 'react'
import Modal from '../redux/reducers/modal'
import Navbar from './Navbar'

const Layout = ({children}) => {
  return (
    <div>
<Navbar/>
        {children}
    </div>
  )
}

export default Layout
