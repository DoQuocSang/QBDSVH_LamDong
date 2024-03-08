import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Logo from "images/logo1.png"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell, faGear, faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import DefaultUserImage from "images/post-default.png"
import LogoutModal from "../../../components/admin/modal/LogoutModal";
import { getHeritagesByQuerySearch } from "../../../services/HeritageRepository";
import { getUserByUserName } from "services/UserRepository";
import { isEmptyOrSpaces } from "../../utils/Utils";
import { useLocation } from "react-router-dom";


export default () => {
   const [heritageList, setHeritageList] = useState([]);
   const location = useLocation();
   const queryParams = new URLSearchParams(location.search);
   const username = queryParams.get("username");
   const [loggedInUsername, setLoggedInUsername] = useState(localStorage.getItem('loggedInUsername') || "");
 
   const handleSearch = (key) => {
     if (!isEmptyOrSpaces(key)) {
       getHeritagesByQuerySearch(key).then((data) => {
         if (data) {
           setHeritageList(data);
         } else {
           setHeritageList([]);
         }
         console.log(heritageList);
       });
     } else {
       setHeritageList([]);
     }
   };
 
   useEffect(() => {
     // Lấy thông tin người dùng từ username
     getUserByUserName(username).then((user) => {
       if (user) {
         setLoggedInUsername(user.username);
         localStorage.setItem('loggedInUsername', user.username);
       }
     });
   }, [username]);

    

   return (
     <>
      {/* {heritageList.length}
       {heritageList.map((item, index) => (
          <p key={index}>{item.Name}</p>
       ))} */}
      <nav className="bg-white border-b border-gray-200 fixed z-30 w-full">
         <div className="px-3 py-3 lg:px-5 lg:pl-3 shadow-md">
            <div className="flex items-center justify-between">
               <div className="flex items-center justify-start">
                  <button id="toggleSidebarMobile" aria-expanded="true" aria-controls="sidebar" className="lg:hidden mr-2 text-gray-600 hover:text-gray-900 cursor-pointer p-2 hover:bg-gray-100 focus:bg-gray-100 focus:ring-2 focus:ring-gray-100 rounded">
                     <svg id="toggleSidebarMobileHamburger" className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h6a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clip-rule="evenodd"></path>
                     </svg>
                     <svg id="toggleSidebarMobileClose" className="w-6 h-6 hidden" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path>
                     </svg>
                  </button>
                  <Link to="/">
                     <a className="text-xl font-bold flex items-center lg:ml-2.5 hover:text-amber-500 transition duration-300">
                        <img src={Logo} className="h-12 mr-2" alt="Windster Logo" />
                        {/* <span className="self-center whitespace-nowrap text-2xl font-extrabold">10Team</span> */}
                     </a>
                  </Link>

                  {/* <form action="#" method="GET" className="hidden lg:block lg:pl-32">
                     <label for="topbar-search" className="sr-only">Tìm kiếm</label>
                     <div className="mt-1 relative lg:w-64">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                           <svg className="w-5 h-5 text-gray-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                              <path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd"></path>
                           </svg>
                        </div>
                        <input 
                           type="text" 
                           name="key" 
                           id="topbar-search" 
                           onChange={e => handleSearch(e.target.value)}
                           className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-full focus:ring-cyan-600 focus:border-cyan-600 block w-full pl-10 p-2.5 transition duration-500 ease-in-out border-transparent focus:border-blueGray-500 focus:bg-white dark:focus:bg-gray-800 focus:outline-none focus:shadow-outline focus:ring-1 ring-offset-current ring-offset-1 ring-purple-400" 
                           style={{ color: 'white' }}
                           placeholder="Tìm kiếm" />
                     </div>
                  </form> */}

               </div>
               <div className="flex items-center">
                  <button id="toggleSidebarMobileSearch" type="button" className="lg:hidden text-gray-500 hover:text-gray-900 hover:bg-gray-100 p-2 rounded-lg">
                     <span className="sr-only">Tìm kiếm</span>
                     <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd"></path>
                     </svg>
                  </button>
                  <div className="hidden lg:flex items-center">
                     <img className="h-8 w-8 rounded-lg mx-3" src={DefaultUserImage} alt="Neil image" />
                     <span className="text-base font-bold text-gray-500 mr-5">
                     {loggedInUsername}
                     </span>
                     {/* <div className="-mb-1">
                        <a className="github-button" href="#" data-color-scheme="no-preference: dark; light: light; dark: light;" data-icon="octicon-star" data-size="large" data-show-count="true" aria-label="Star themesberg/windster-tailwind-css-dashboard on GitHub">Star</a>
                     </div> */}
                  </div>
                  {/* <a href="/" className="hidden transition duration-300 sm:inline-flex ml-5 text-white  bg-red-400 hover:bg-amber-400 focus:ring-4 focus:ring-cyan-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center items-center mr-3">
                     <FontAwesomeIcon icon={faRightFromBracket} className="text-base mr-3" />
                     Đăng xuất
                  </a> */}
                  <a href="#" className="text-base font-bold text-gray-500 mr-4 hover:text-red-500 transition duration-150 ease-in-out">
                     <FontAwesomeIcon icon={faGear} className="text-lg" />
                  </a>
                  <a href="#" className="text-base font-bold text-gray-500 mr-4 hover:text-red-500 transition duration-150 ease-in-out">
                     <FontAwesomeIcon icon={faBell} className="text-lg" />
                  </a>
                  <a id="logout_buttonmodal" className="cursor-pointer text-base font-bold text-gray-500 mr-4 hover:text-red-500 transition duration-150 ease-in-out">
                     <FontAwesomeIcon icon={faRightFromBracket} className="text-lg" />
                  </a>
                  
               </div>
            </div>
         </div>
      </nav>
      <LogoutModal/>
     </>
   );
}

