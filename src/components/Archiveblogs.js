import React, { useState, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom"; // Import useParams to get the URL param
import PostList from "../components/PostList";
import { combinedFilter } from "../utils/filter"; // Reuse the combinedFilter utility


const Archiveblogs = () => {
  const { typePost } = useParams(); // Get the post type from the URL (Trending, New, Top)
  const [blogs, setBlogs] = useState([]);
  const [categoryFilter, setCategoryFilter] = useState("");

  // Fetch blog data
  const fetchData = useCallback(async () => {
    let url = "/data/blog/posts.json"; // Adjust this path as necessary
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

  // Filtering blogs based on the typePost from URL (Trending, New, Top)
  const filteredBlogs = combinedFilter(blogs, {
    typePost: typePost, // Filter by the typePost from URL param
    categoryPostname: categoryFilter, // You can also allow category filtering on this page
  });

  return (
    <div className="p-7 container mx-auto">
      {/* Filter Controls */}
      <div className="flex flex-col sm:flex-row justify-between items-center mb-8">
        <div className="flex flex-col sm:flex-row items-center gap-4">
          {/* Category Filter */}
          <div>
            <label className="block mb-1 font-semibold">Filter by Category:</label>
            <select
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="p-2 border border-gray-300 rounded-lg"
              value={categoryFilter}
            >
              <option value="">All Categories</option>
              <option value="Travel">Travel</option>
              <option value="Visa">Visa</option>
              <option value="Packages">Packages</option>
            </select>
          </div>
        </div>

        {/* Reset Filters Button */}
        <button
          onClick={() => {
            setCategoryFilter("");
          }}
          className="bg-indigo-600 text-white font-bold py-2 px-4 rounded-lg mt-4 sm:mt-0"
        >
          Reset Filters
        </button>
      </div>

      {/* Displaying filtered blogs */}
      {filteredBlogs.length === 0 ? (
        <p>No posts found for the selected filters.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredBlogs.map((blog) => (
            <PostList key={blog.idPost} blog={blog} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Archiveblogs;
