import React from "react";

const Sidebar = ({ isOpen, toggleSidebar }) => {
  return (
    <div
      className={`fixed inset-y-0 left-0 bg-gray-900 w-64 transform ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      } transition-transform duration-300 ease-in-out z-20 md:hidden`}
    >
      <div className="p-4 text-white">
        {/* Logo */}
        <a href="/" className="block py-2 px-4 text-lg font-bold">
          Blogger
        </a>

        {/* Navigation Links */}
        <ul className="mt-4 space-y-4">
          <li>
            <a
              href="/travel"
              className="block py-2 px-4 hover:bg-gray-700 rounded-lg"
              onClick={toggleSidebar}
            >
              Travel
            </a>
          </li>
          <li>
            <a
              href="/visa"
              className="block py-2 px-4 hover:bg-gray-700 rounded-lg"
              onClick={toggleSidebar}
            >
              Visa
            </a>
          </li>
          <li>
            <a
              href="/packages"
              className="block py-2 px-4 hover:bg-gray-700 rounded-lg"
              onClick={toggleSidebar}
            >
              Packages
            </a>
          </li>
          <li>
            <a
              href="/login"
              className="block py-2 px-4 bg-slate-300 text-cyan-800 text-center font-semibold shadow-md hover:text-violet-600 rounded-lg"
              onClick={toggleSidebar}
            >
              Log In
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
