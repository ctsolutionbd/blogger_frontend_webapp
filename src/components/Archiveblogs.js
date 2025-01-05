import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
// import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock } from "@fortawesome/free-solid-svg-icons";


const Archiveblogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/data/blog/.json");
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
  const limitedBlogs = blogs.slice(0, 8);

  const truncateDescription = (description) => {
    const words = description.split(" ");
    return words.length > 10 ? words.slice(0, 10).join(" ") + "..." : description;
  };

  return (
    //   {/* If i click trending blog header title show Trending Blog or i click New blog the header title show New Blogs */}
    //               <h2 className="p-4 font-extrabold items-center w-28">{archivetitle} Blogs</h2>
    <div className="container mx-auto">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {limitedBlogs.map((blog) => (
          <div key={blog.idPost} className="w-full">
            <div className="card bg-opacity-70 bg-slate-50 shadow-xl h-full">
              <figure className="h-48 w-auto">
                <img
                  src={blog.imgUrl}
                  alt={blog.title}
                  className="w-full h-full object-cover"
                />
              </figure>
              <div className="card-body">
                {/* Link to post details using blog title */}
                <Link to={`/post/${encodeURIComponent(blog.title)}`} className="text-violet-700 font-bold hover:underline">
                  <h3 className="text-lg text-indigo-700 card-title font-semibold">{blog.title}</h3>
                </Link>
                <div className="card-actions justify-start">
                <Link to={`/category/${encodeURIComponent(blog.category)}`}>
                  <button className="btn glass bg-indigo-500 btn-sm text-white">{blog.category}</button>
                </Link>
                </div>
                <p className="text-indigo-600">{truncateDescription(blog.description)}</p>

                <div className="card-actions items-center justify-between">
                  <Link to={`/${blog.author}`} className="text-violet-700 font-thin hover:underline">{blog.author}</Link>
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

      {blogs.length > 4 && (
        <div className="text-center mt-6">
          <Link to="/new-blogs">
            <button className="hidden bg-indigo-600 hover:bg-blue-700 glass text-white font-bold py-2 px-4 rounded">
              View More
            </button>
          </Link>
        </div>
      )}
    
    </div>
  );
};

export default Archiveblogs;
