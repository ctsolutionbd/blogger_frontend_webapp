import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';

const Carousel = ({ typePost }) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [blogs, setBlogs] = useState([]);

  const fetchData = useCallback(async () => {
    let url = "/data/blog/blogposts.json"; // Default URL
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Failed to fetch the blog data.");
      }
      const data = await response.json();
      
      // Filter blogs to only include posts where typePost is "Top"
      const filteredBlogs = data.filter(blog => blog.typePost === "Top");

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

  const [currentSlide, setCurrentSlide] = useState(0);

  const prevSlide = () => {
    setCurrentSlide((prevSlide) =>
      prevSlide === 0 ? blogs.length - 1 : prevSlide - 1
    );
  };

  const nextSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide + 1) % blogs.length);
  };

  const truncateDescription = (descriptionPost) => {
    const words = descriptionPost.split(" ");
    return words.length > 10 ? words.slice(0, 10).join(" ") + "..." : descriptionPost;
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div className="carousel w-full rounded-lg relative">
      {blogs.length > 0 && (
        <div className="relative w-full">
          {blogs.map((blog, index) => (
            <div
              key={blog.idPost}
              className={`${
                currentSlide === index ? 'block' : 'hidden'
              } w-full`}
            >
              <div
                className="card bg-base-100 shadow-lg w-full h-64"
                style={{
                  backgroundImage: `url(${blog.imgPost})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
              >
                <div className="card-body mx-24 my-10 bg-opacity-80 bg-slate-50 rounded-lg">
                  <h2 className="card-title text-violet-700 ">{blog.titlePost}</h2>
                  <p className='text-violet-700 '>{truncateDescription(blog.descriptionPost)}</p>
                  <div className='container flex justify-between'>
                    <div className="flex items-center text-white text-sm mb-2">
                      <img
                        src={blog.authorImg}
                        alt={blog.authorName}
                        className="w-8 h-8 rounded-full mr-2"
                      />
                      <Link to={`/${blog.authorName}`} className="text-violet-700 font-bold hover:underline">
                        {blog.authorName}
                      </Link>
                    </div>
                    <div className="card-actions justify-end">
                      <Link to={`/post/${encodeURIComponent(blog.titlePost)}`}>
                        <button className="btn">Read More</button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}

          <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
            <button onClick={prevSlide} className="btn btn-circle glass">
              ❮
            </button>
            <button onClick={nextSlide} className="btn btn-circle glass">
              ❯
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Carousel;
