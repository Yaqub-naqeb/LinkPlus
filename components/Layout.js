import React from "react";
import Modal from "../redux/reducers/isOpen";
import Navbar from "./Navbar";
import { Poppins } from "@next/font/google";
import { useSelector } from "react-redux";
import DarkToggle from "./main/toggle/DarkToggle";



const poppins = Poppins({ subsets: ["latin"], weight: ["600", "400", "700"] });
const Layout = ({ children }) => {
  const isDark = useSelector((state) => state.open);



  return (
    <div className={poppins.className}>
      <Navbar />
      <DarkToggle/>
     <div className={`pt-[10rem]  px-[5rem] ${isDark.dark?'bg-[#1B2430]':'bg-[#EBEBEB] '}`}>
     {children}
     </div>
    </div>
  );
};

export default Layout;
