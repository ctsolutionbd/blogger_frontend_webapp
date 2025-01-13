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
          
          {/* Desktop Links */}
          <div className="hidden md:flex items-center space-x-4">
            <a href="/" className="text-violet-400 font-semibold hover:text-violet-600">Blogs</a>
            <a href="/shops" className=" text-violet-400 font-semibold hover:text-violet-600">Shops</a>
            <a href="/events" className="text-violet-400 font-semibold hover:text-violet-600">Events</a>

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
