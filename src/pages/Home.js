import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSuitcaseRolling, faPassport, faUmbrellaBeach } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import Carousel from "../components/Carousel";
import PostCard from "../components/Postcard"; // Updated usage
import PostList from "../components/PostList"; // Assuming PostList exists

const Home = () => {
  return (
    <div className="p-7 container mx-auto">
      {/* Category Section */}
      <div className="flex flex-col sm:flex-row flex-wrap justify-center items-center sm:space-x-6 space-y-4 sm:space-y-0 mb-6 sm:mb-10">
        {/* Travel Category */}
        <Link
          to="/category/travel"
          aria-label="Travel"
          className="flex flex-col items-center justify-center px-10 py-6 shadow-sm hover:bg-slate-300 rounded-lg bg-slate-200 transition-colors duration-300 w-full sm:w-60"
        >
          <FontAwesomeIcon icon={faSuitcaseRolling} className="text-indigo-600 text-4xl hover:text-violet-600" />
          <p className="font-semibold text-indigo-600 text-center mt-2">Travel</p>
        </Link>

        {/* Visa Category */}
        <Link
          to="/category/visa"
          aria-label="Visa"
          className="flex flex-col items-center justify-center px-10 py-6 shadow-sm hover:bg-slate-300 rounded-lg bg-slate-200 transition-colors duration-300 w-full sm:w-60"
        >
          <FontAwesomeIcon icon={faPassport} className="text-indigo-600 text-4xl hover:text-violet-600" />
          <p className="font-semibold text-indigo-600 text-center mt-2">Visa</p>
        </Link>

        {/* Packages Category */}
        <Link
          to="/category/packages"
          aria-label="Packages"
          className="flex flex-col items-center justify-center px-10 py-6 shadow-sm hover:bg-slate-300 rounded-lg bg-slate-200 transition-colors duration-300 w-full sm:w-60"
        >
          <FontAwesomeIcon icon={faUmbrellaBeach} className="text-indigo-600 text-4xl hover:text-violet-600" />
          <p className="font-semibold text-indigo-600 text-center mt-2">Packages</p>
        </Link>
      </div>

      {/* Carousel and Sidebar Section */}
      <div className="container mx-auto p-4 sm:p-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Carousel Section */}
        <div className="lg:col-span-2">
          <div className="carousel w-full rounded-lg">
            {/* Add Carousel component */}
            <Carousel />
          </div>
        </div>

        {/* Sidebar Section */}
        <div className="shadow-xl bg-slate-300 p-6 rounded-lg">
          <h2 className="text-xl sm:text-2xl text-indigo-600 font-bold mb-4">Most Trending Blogs</h2>
          <ul className="list-disc list-inside">
            {/* Displaying trending blogs using PostCard */}
            <PostCard type="trending-card" />
          </ul>
          <Link to="/trending-blogs">
            <button className="bg-indigo-600 hover:bg-blue-700 glass text-white items-center font-bold py-2 px-4 rounded mt-6">
              View More
            </button>
          </Link>
        </div>
      </div>

      {/* New Blog Posts List */}
      <div className="container justify-between items-baseline flex">
        <h2 className="text-xl sm:text-2xl text-indigo-600 font-bold mb-4">New Blogs</h2>
        <Link to="/archiveblogs">
          <button className="bg-indigo-600 hover:bg-blue-700 glass text-white items-center font-bold py-2 px-4 rounded mt-6">
            View More
          </button>
        </Link>
      </div>
      <div className="container mx-auto p-4 sm:p-6 flex gap-6">
        {/* Displaying new blogs using PostList */}
        <PostList type="new" />
      </div>
    </div>
  );
};

export default Home;
