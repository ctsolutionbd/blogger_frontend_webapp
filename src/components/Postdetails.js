import React, { useState, useEffect, useCallback } from "react";
import { useParams, Link } from "react-router-dom";

const PostDetails = () => {
  const { title } = useParams(); // Extract the title from the URL
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async () => {
    let url = "/data/blog/blogposts.json"; // URL for the blog posts data
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Failed to fetch the blog data.");
      }
      const data = await response.json();

      // Find the blog with the matching title (title is URL-encoded)
      const foundBlog = data.find(
        (blog) => blog.titlePost === decodeURIComponent(title)
      );

      if (!foundBlog) {
        throw new Error("Post not found");
      }

      setBlog(foundBlog); // Set the found post in state
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }, [title]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="container py-12">
      <div className="w-full p-6">
        <h1 className="text-4xl font-semibold mb-2">{blog.titlePost}</h1>
        <div className="flex items-center text-sm">
          <img
            src={blog.authorImg}
            alt={blog.authorName}
            className="w-8 h-8 rounded-full mr-2"
          />
          <Link
            to={`/${blog.authorName}`}
            className="text-violet-700 font-thin hover:underline"
          >
            <p>{blog.authorName}</p>
          </Link>
          <span className="mx-2">•</span>
          <p>{blog.datePost}</p>
          <span className="mx-2">•</span>
          <p>{blog.timePost}</p>
        </div>
      </div>

      <div className="m-4">
        <span className="text-indigo-600 text-sm uppercase font-bold">
          Category: {blog.categoryPostname}
        </span>
      </div>

      <div className="mt-8 mx-4 lg:mx-24">
        <figure className="h-48 w-auto">
          <img
            src={blog.imgPost}
            alt={blog.titlePost}
            className="w-full h-full object-cover"
          />
        </figure>
        <p className="text-lg text-gray-700 leading-relaxed mb-6">
          {blog.descriptionPost}
        </p>
      </div>
    </div>
  );
};

export default PostDetails;


