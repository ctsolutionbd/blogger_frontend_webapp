import React, { useState, useEffect, useCallback } from "react";
import { Link } from 'react-router-dom';

const PostCard = ({ typePost }) => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Function to limit title to 4 words
  const truncateTitle = (title) => {
    const words = title.split(" ");
    if (words.length > 3) {
      return words.slice(0, 3).join(" ") + "..."; // Truncate and add ellipsis
    }
    return title;
  };

  const fetchData = useCallback(async () => {
    let url = "/data/blog/posts.json"; 
    try {
      const response = await fetch(url);
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
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  const limitedBlogs = blogs.slice(0, 2);

  return (
    <div className="container mx-auto">
      <ul>
        {limitedBlogs.map((blog) => (
          <li key={blog.idPost} className="mb-4 flex">
            <div className="transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 hover:bg-slate-100 duration-300 p-4 bg-opacity-80 bg-slate-50 rounded-lg shadow-xl">
              <div className="card card-side">
                <figure>
                  <img
                    src={blog.imgPost}
                    alt={blog.titlePost}
                    className="rounded-md w-40 object-cover"
                  />
                </figure>
                <div className="card-body">
                  <Link
                    to={`/post/${encodeURIComponent(blog.titlePost)}`}
                    className="text-violet-700 font-bold hover:underline"
                  >
                    {truncateTitle(blog.titlePost)} {/* Truncate title here */}
                  </Link>
                  <div className="flex justify-between">
                    <Link
                      to={`/${blog.authorName}`}
                      className="text-violet-700 font-thin hover:underline"
                    >
                      {blog.authorName}
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PostCard;
