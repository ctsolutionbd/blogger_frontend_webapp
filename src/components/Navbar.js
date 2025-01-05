import React, { useState } from "react"; 
import Sidebar from "./Sidebar";  // Import Sidebar

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative">
      {/* Navbar */}
      <nav className="flex w-full items-center p-4  shadow-md">
        <div className="container mx-auto flex items-center justify-between">
          
          {/* Logo */}
          <a href="/">
            <img src="./assets/icons/blogger.png" alt="Blogger" className="w-40 font-bold h-auto" />
          </a>

          {/* Search Bar */}
          <div className="hidden md:flex shadow-md items-center">
            <input type="search" placeholder="Search Blogs and Books" aria-label="Search" className="p-2 rounded-l"/>
            <button
              className="relative z-[2] flex items-center rounded-r bg-slate-700 px-6 py-2.5 text-xs font-medium uppercase leading-tight text-white shadow-md transition duration-150 ease-in-out hover:bg-primary-700 hover:shadow-lg"
              type="button"
              id="button-addon1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="h-5 w-5"
              >
                <path
                  fillRule="evenodd"
                  d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center space-x-4">
            <a href="/" className="text-violet-400 font-semibold hover:text-violet-600">Blogs</a>
            <a href="./bookshops/books" className=" text-violet-400 font-semibold hover:text-violet-600">Books</a>
            <a href="/Events" className="text-violet-400 font-semibold hover:text-violet-600">Events</a>

            {/* Log In Button */}
            <a
              href="/login"
              className="bg-indigo-600 hover:bg-blue-700 glass text-white items-center font-bold py-2 px-4 rounded">
              Log In
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleNavbar}
            className="md:hidden text-lime-300 focus:outline-none"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16m-7 6h7"
              />
            </svg>
          </button>
        </div>
      </nav>

      {/* Sidebar */}
      <Sidebar isOpen={isOpen} toggleSidebar={toggleNavbar} />
    </div>
  );
};

export default Navbar;
