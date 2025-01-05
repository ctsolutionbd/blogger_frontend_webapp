import React, { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock } from "@fortawesome/free-solid-svg-icons";

const PostList = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async () => {
    let url = "/data/blog/blogposts.json"; // URL for the JSON data
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Failed to fetch the blog data.");
      }
      const data = await response.json();
      setBlogs(data); // Set all blog data without filtering
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

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

  const limitedBlogs = blogs.slice(0, 4); // Limiting to 4 blogs

  const truncateDescription = (description) => {
    const words = description.split(" ");
    return words.length > 10 ? words.slice(0, 10).join(" ") + "..." : description;
  };

  return (
    <div className="container mx-auto">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {limitedBlogs.map((blog) => (
          <div key={blog.idPost} className="w-full">
            <div className="transition ease-in delay-100 hover:-translate-y-1 hover:scale-110 hover:bg-slate-100 duration-200 card bg-opacity-70 bg-slate-50 shadow-xl h-full">
              <figure className="h-48 w-auto">
                <img
                  src={blog.imgPost}
                  alt={blog.titlePost}
                  className="w-full h-full object-cover"
                />
              </figure>
              <div className="card-body">
                {/* Link to post details using blog title */}
                <Link
                  to={`/post/${encodeURIComponent(blog.titlePost)}`}
                  className="text-violet-700 font-bold hover:underline"
                >
                  <h3 className="text-lg text-indigo-700 card-title font-semibold">
                    {blog.titlePost}
                  </h3>
                </Link>
                <div className="card-actions justify-start">
                  <Link to={`/category/${encodeURIComponent(blog.categoryPostname)}`}>
                    <button className="btn glass bg-indigo-500 btn-sm text-white">
                      {blog.categoryPostname}
                    </button>
                  </Link>
                </div>
                <p className="text-indigo-600">{truncateDescription(blog.descriptionPost)}</p>
                {/* Author, date, and reading time in one line */}
                <div className="flex items-center text-sm text-gray-500 mt-4">
                  <img
                    src={blog.authorImg}
                    alt={blog.authorName}
                    className="w-8 h-8 rounded-full mr-2"
                  />
                  <Link
                    to={`/${blog.authorName}`}
                    className="text-indigo-600 hover:underline"
                  >
                    {blog.authorName}
                  </Link>
                  <div className="flex items-center mx-2 justify-end">
                  <p className="font-thin text-xs">{blog.datePost}</p>
                  <FontAwesomeIcon icon={faClock} className="m-1 text-xs" />
                  <p className="font-thin text-xs">{blog.timePost}</p>
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
            <button className="bg-indigo-600 hover:bg-blue-700 glass text-white font-bold py-2 px-4 rounded">
              View More
            </button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default PostList;
