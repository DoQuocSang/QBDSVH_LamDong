import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

const SearchInput = ({ searchKey, setSearchKey, handleSearch, handleKeyPress }) => {
  return (
    // <div className="w-full sm:max-w-xs">
    //   <label htmlFor="searchKey" className="sr-only">
    //     Từ khóa tìm kiếm
    //   </label>
    //   <div className="relative text-gray-400 focus-within:text-gray-600">
    //     <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
    //       <svg
    //         className="w-5 h-5 text-gray-500"
    //         fill="currentColor"
    //         viewBox="0 0 20 20"
    //         xmlns="http://www.w3.org/2000/svg"
    //       >
    //         <path
    //           fillRule="evenodd"
    //           d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
    //           clipRule="evenodd"
    //         ></path>
    //       </svg>
    //     </div>
    //     <input
    //       id="searchKey"
    //       type="text"
    //       placeholder="Từ khóa tìm kiếm"
    //       className="block w-full py-2 pl-10 pr-3 text-sm placeholder-gray-500 border-gray-300 rounded-md bg-gray-100 focus:bg-white focus:outline-none focus:ring-cyan-500 focus:border-cyan-500"
    //       value={searchKey}
    //       onChange={(e) => setSearchKey(e.target.value)}
    //       onKeyPress={handleKeyPress}
    //     />
    //   </div>
    // </div>
    <div className="flex items-center max-w-lg bg-white rounded-lg shadow border border-gray-200 border-1">
        <div className="w-full">
            <input
              id="searchKey" 
              type="text" 
              className="w-full px-4 py-1 text-gray-800 rounded-full focus:outline-none"
              placeholder="Từ khóa tìm kiếm"
              value={searchKey}
              onChange={(e) => setSearchKey(e.target.value)}
              onKeyPress={handleKeyPress}
              />
        </div>
        <div>
            <button 
              onClick={handleSearch}
              className="bg-teal-500 w-12 h-12 text-white rounded-r-lg hover:bg-teal-400 transition duration-75">
               <FontAwesomeIcon icon={faSearch}/>
            </button>
        </div>
    </div>
  );
};

export default SearchInput;
