import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const TrendingBlogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/data/blog/newblog.json");
        if (!response.ok) {
          throw new Error("Failed to fetch the blog data.");
        }
        const data = await response.json();
        setBlogs(data);
      } catch (error) {
        console.error("Error fetching blogs:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

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

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-indigo-700 mb-6 text-center">All New Blogs</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {blogs.map((blog) => (
          <div key={blog.id} className="w-full">
            <div className="card bg-opacity-70 bg-slate-50 shadow-md h-full">
              <figure className="h-48 w-auto">
                <img
                  src={blog.imgUrl}
                  alt={blog.title}
                  className="w-full h-full object-cover"
                />
              </figure>
              <div className="card-body">
                <Link to={`/post/${encodeURIComponent(blog.title)}`}>
                  <h3 className="text-lg text-indigo-700 card-title font-semibold">
                    {blog.title}
                  </h3>
                </Link>
                <p className="text-indigo-600">{blog.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TrendingBlogs;