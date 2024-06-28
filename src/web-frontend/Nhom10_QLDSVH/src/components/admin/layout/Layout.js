import React from "react";
import { Routes, Route, Navigate, useLocation, Outlet } from "react-router-dom";
import Header from "components/admin/header/Header"
import Sidebar from "components/admin/sidebar/Sidebar"
import Footer from "../footer/Footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowDown } from "@fortawesome/free-solid-svg-icons";

export default function Admin(props) {
   const scrollToBottom = () => {
      window.scrollTo({
        top: document.body.scrollHeight,
        behavior: "smooth",
      });
    };
    
   return (
      <div>
         <Header />
         <div className="flex overflow-hidden bg-white pt-16">
            <Sidebar />
            <div id="main-content" className="h-full w-full bg-gray-100 relative overflow-y-auto lg:ml-64">
               <Outlet />
               <Footer />
            </div>
         </div>

         <button
            className="fixed bottom-4 right-4 text-red-500 font-bold px-4 py-2 rounded-lg border-2 border-red-500 transition duration-300 bg-red-500 hover:bg-red-600 text-white"
            onClick={scrollToBottom}
          >
            <FontAwesomeIcon icon={faArrowDown} />
          </button>

         <script async defer src="https://buttons.github.io/buttons.js"></script>
         <script src="https://demo.themesberg.com/windster/app.bundle.js"></script>
      </div>
   );
}
