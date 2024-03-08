import React from "react";
import { Routes, Route, Navigate, useLocation, Outlet } from "react-router-dom";
import Header from "components/admin/header/Header"
import Sidebar from "components/admin/sidebar/Sidebar"
import Footer from "../footer/Footer";

export default function Admin(props) {

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

         <script async defer src="https://buttons.github.io/buttons.js"></script>
         <script src="https://demo.themesberg.com/windster/app.bundle.js"></script>
      </div>
   );
}
