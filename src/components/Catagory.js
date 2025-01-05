import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock } from "@fortawesome/free-solid-svg-icons";

const Category = () => {
  const { categoryName } = useParams(); // Extract the category name from the URL
  const [blogs, setBlogs] = useState([]); // State to store blogs
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const responses = await Promise.all([
          fetch("/data/blog/trendingblog.json"),
          fetch("/data/blog/topblog.json"),
          fetch("/data/blog/newblog.json")
        ]);

        const [trendingBlogs, topBlogs, newBlogs] = await Promise.all(
          responses.map((res) => res.json())
        );

        // Combine all blogs and filter by category
        const allBlogs = [...trendingBlogs, ...topBlogs, ...newBlogs];
        const filteredBlogs = allBlogs.filter(
          (blog) => blog.category.toLowerCase() === categoryName.toLowerCase()
        );

        setBlogs(filteredBlogs);
      } catch (error) {
        console.error("Error fetching blogs:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, [categoryName]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-red-600 text-center py-10">
        <p>There was an error loading the blogs.</p>
        <p>{error}</p>
      </div>
    );
  }

  if (blogs.length === 0) {
    return (
      <div className="text-center py-10 text-gray-500">
        <p>No blogs found in the "{categoryName}" category.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-semibold text-center mb-6 capitalize">
        {categoryName} Blogs
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {blogs.map((blog) => (
          <div key={blog.id} className="w-full">
            <div className="card bg-opacity-70 bg-slate-50 shadow-xl h-full">
              <figure className="h-48 w-auto">
                <img
                  src={blog.imgUrl}
                  alt={blog.title}
                  className="w-full h-full object-cover"
                />
              </figure>
              <div className="card-body">
                <Link
                  to={`/post/${blog.title}`}
                  className="text-indigo-700 font-bold hover:underline"
                >
                  <h3 className="text-lg text-indigo-700 card-title font-semibold">
                    {blog.title}
                  </h3>
                </Link>
                <div className="card-actions justify-start">
                  <button className="btn glass bg-indigo-500 btn-sm text-white">
                    {blog.category}
                  </button>
                </div>
                <p className="text-indigo-600">
                  {blog.description.split(" ").slice(0, 10).join(" ")}...
                </p>
                <div className="card-actions items-center justify-between">
                  <Link
                    to={`/${blog.authorName}`}
                    className="text-violet-700 font-thin hover:underline"
                  >
                    {blog.authorName}
                  </Link>
                  <div className="flex items-center text-violet-500 font-thin text-sm gap-2">
                    <p>{blog.date}</p>
                    <FontAwesomeIcon icon={faClock} />
                    <p>{blog.time}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Category;
