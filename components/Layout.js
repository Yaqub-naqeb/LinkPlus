import React from "react";
import Modal from "../redux/reducers/isOpen";
import Navbar from "./Navbar";
import { Poppins } from "@next/font/google";
import { useSelector } from "react-redux";



const poppins = Poppins({ subsets: ["latin"], weight: ["600", "400", "700"] });
const Layout = ({ children }) => {
  const isDark = useSelector((state) => state.open);



  return (
    <div className={poppins.className}>
      <Navbar />
     <div className={`pt-[8rem]  px-[5rem] ${isDark.dark?'bg-[#1B2430]':'bg-[#EBEBEB] '}`}>
     {children}
     </div>
    </div>
  );
};

export default Layout;
