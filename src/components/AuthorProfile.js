import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const AuthorProfile = () => {
  const { authorName } = useParams(); // Get the author name from URL
  const [authorData, setAuthorData] = useState(null);
  const [authorBlogs, setAuthorBlogs] = useState([]);

  // Fetch author data based on the author's name
  useEffect(() => {
    console.log("Fetching author data...");
    fetch(`./data/authors/${authorName}.json`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        console.log("Author data:", data);
        setAuthorData(data[0]); // Assuming the data is an array, so we take the first element
      })
      .catch((error) => {
        console.error('Error fetching author data:', error);
      });
  
    console.log("Fetching posts...");
    fetch('./data/blog/blogposts.json')
      .then((response) => response.json())
      .then((data) => {
        console.log("Posts data:", data);
        const postsByAuthor = data.filter(blog => blog.authorName === authorName);
        setAuthorBlogs(postsByAuthor);
      })
      .catch((error) => {
        console.error('Error fetching posts:', error);
      });
  }, [authorName]);

  if (!authorData || authorBlogs.length === 0) {
    return <div>Loading author profile...</div>;
  }

  return (
    <div className="container mx-auto p-6">
      <div className="flex items-center">
        <img
          src={authorData.profileImage}
          alt={authorData.name}
          className="w-20 h-20 rounded-full mr-4"
        />
        <div>
          <h2 className="text-2xl font-semibold">{authorData.name}</h2>
          <p className="text-gray-600">{authorData.bio || "No bio available."}</p>
        </div>
      </div>
      <div className="mt-6">
        <h3 className="text-xl font-semibold">Posts by {authorData.name}</h3>
        <ul className="mt-4">
          {authorBlogs.map((blog) => (
            <li key={blog.id} className="mb-2">
              <a href={`/posts/${blog.title}`} className="text-violet-600 hover:underline">
                {blog.title}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AuthorProfile;
