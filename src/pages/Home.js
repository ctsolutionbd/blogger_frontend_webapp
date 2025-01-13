import React, { useState, useEffect, useCallback } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSuitcaseRolling, faPassport, faUmbrellaBeach } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import Carousel from "../components/Carousel";
import PostCard from "../components/PostCard";
import PostList from "../components/PostList";
import { combinedFilter } from "../utils/filter"; // Import the filter utility

const Home = () => {
  const [blogs, setBlogs] = useState([]);
  const [categoryFilter, setCategoryFilter] = useState("");
  const [typeFilter, setTypeFilter] = useState("");

  // Fetch blog data
  const fetchData = useCallback(async () => {
    let url = "/data/blog/posts.json"; // Default URL
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Failed to fetch the blog data.");
      }
      const data = await response.json();
      setBlogs(data); // Save fetched blog data to state
    } catch (error) {
      console.error(error);
    }
  }, []);

  useEffect(() => {
    fetchData(); // Fetch data when component loads
  }, [fetchData]);

  // Filtering blogs based on typePost and category
  const filteredBlogs = combinedFilter(blogs, {
    typePost: typeFilter,
    categoryPostname: categoryFilter,
  });

  // Get filtered blog categories for New, Trending, and Top
  const trendingBlogs = filteredBlogs.filter((blog) => blog.typePost === "Trending");
  const newBlogs = filteredBlogs.filter((blog) => blog.typePost === "New");
  const topBlogs = filteredBlogs.filter((blog) => blog.typePost === "Top");

  return (
    <div className="p-7 container mx-auto">
      {/* Category Section */}
      <div className="flex flex-col sm:flex-row flex-wrap justify-center items-center sm:space-x-6 space-y-4 sm:space-y-0 mb-6 sm:mb-10">
        {/* Travel Category */}
        <button
          onClick={() => setCategoryFilter("Travel")} // Set the filter to "Travel"
          aria-label="Travel"
          className="flex flex-col items-center justify-center px-10 py-6 shadow-sm hover:bg-slate-300 rounded-lg bg-slate-200 transition-colors duration-300 w-full sm:w-60"
        >
          <FontAwesomeIcon icon={faSuitcaseRolling} className="text-indigo-600 text-4xl hover:text-violet-600" />
          <p className="font-semibold text-indigo-600 text-center mt-2">Travel</p>
        </button>

        {/* Visa Category */}
        <button
          onClick={() => setCategoryFilter("Visa")} // Set the filter to "Visa"
          aria-label="Visa"
          className="flex flex-col items-center justify-center px-10 py-6 shadow-sm hover:bg-slate-300 rounded-lg bg-slate-200 transition-colors duration-300 w-full sm:w-60"
        >
          <FontAwesomeIcon icon={faPassport} className="text-indigo-600 text-4xl hover:text-violet-600" />
          <p className="font-semibold text-indigo-600 text-center mt-2">Visa</p>
        </button>

        {/* Packages Category */}
        <button
          onClick={() => setCategoryFilter("Packages")} // Set the filter to "Packages"
          aria-label="Packages"
          className="flex flex-col items-center justify-center px-10 py-6 shadow-sm hover:bg-slate-300 rounded-lg bg-slate-200 transition-colors duration-300 w-full sm:w-60"
        >
          <FontAwesomeIcon icon={faUmbrellaBeach} className="text-indigo-600 text-4xl hover:text-violet-600" />
          <p className="font-semibold text-indigo-600 text-center mt-2">Packages</p>
        </button>
      </div>

      {/* Carousel and Sidebar Section */}
      <div className="container mx-auto p-4 sm:p-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Carousel Section */}
        <div className="lg:col-span-2">
          <div className="carousel w-full rounded-lg">
            {/* Add Carousel component */}
            <Carousel blogs={topBlogs} />
          </div>
        </div>

        {/* Sidebar Section */}
        <div className="shadow-xl bg-slate-300 p-6 rounded-lg">
          <h2 className="text-xl sm:text-2xl text-indigo-600 font-bold mb-4">Most Trending Blogs</h2>
          <ul className="list-disc list-inside">
            {/* Displaying trending blogs using PostCard */}
            <PostCard blogs={trendingBlogs} />
          </ul>
          <Link to="/post-all/Trending">
            <button className="bg-indigo-600 hover:bg-blue-700 glass text-white items-center font-bold py-2 px-4 rounded mt-6">
              View More
            </button>
          </Link>
        </div>
      </div>

      {/* New Blog Posts List */}
      <div className="container justify-between items-baseline flex">
        <h2 className="text-xl sm:text-2xl text-indigo-600 font-bold mb-4">New Blogs</h2>
        <Link to="/post-all/New">
          <button className="bg-indigo-600 hover:bg-blue-700 glass text-white items-center font-bold py-2 px-4 rounded mt-6">
            View More
          </button>
        </Link>
      </div>

      <div className="container mx-auto p-4 sm:p-6 flex gap-6">
        {/* Displaying new blogs using PostList */}
        <PostList blogs={newBlogs} />
      </div>
    </div>
  );
};

export default Home;
