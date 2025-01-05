import React, { useState, useEffect, useCallback } from "react";
import { Link } from 'react-router-dom'

const PostCard = ({ typePost }) => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true); // Add loading state
  const [error, setError] = useState(null); // Add error state

  // Determine which file to fetch based on the type prop
  const fetchData = useCallback(async () => {
    let url = "/data/blog/blogposts.json"; // Default URL
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Failed to fetch the blog data.");
      }
      const data = await response.json();
      
      // Filter blogs to only include posts where typePost is "Trending"
      const filteredBlogs = data.filter(blog => blog.typePost === "Trending");

      setBlogs(filteredBlogs);
    } catch (error) {
      console.error("Error fetching blogs:", error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }, [typePost]); // useCallback ensures the function is memoized and only re-created if `typePost` changes

  useEffect(() => {
    fetchData();
  }, [fetchData]); // Now `fetchData` can be safely included in the dependency array

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <ul>
      {blogs.map((blog) => (
        <li key={blog.idPost} className="mb-4 flex">
          <div className="transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 hover:bg-slate-100 duration-300 p-4 bg-opacity-80 bg-slate-50 rounded-lg shadow-xl">
            {/* image and post grid colum */}
            <div className="card card-side">
                <figure>
                    <img
                        src={blog.imgPost}
                        alt={blog.titlePost}
                        className="rounded-md w-40 object-cover"
                    />
                </figure>
                <div class="card-body">
                  <Link to={`/post/${encodeURIComponent(blog.titlePost)}`} className="text-violet-700 font-bold hover:underline">{blog.titlePost}</Link>
                  <div className="flex justify-between">
                  <Link to={`/${blog.authorName}`} className=" text-violet-700 font-thin hover:underline">{blog.authorName}</Link>
                  </div>
                </div>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default PostCard;
