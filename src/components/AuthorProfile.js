import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import PostList from '../components/PostList';

const AuthorProfile = () => {
  const { authorName } = useParams(); // Get the author name from URL
  const [authorData, setAuthorData] = useState(null);
  const [authorBlogs, setAuthorBlogs] = useState([]);

  // Fetch author data and blogs based on the author's name
  useEffect(() => {
    console.log("Fetching author data...");

    // Fetch author profile
    fetch(`./data/author/authors.json`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        const author = data.find((author) => author.authorName === authorName);
        if (author) {
          setAuthorData(author);
        } else {
          console.error('Author not found');
        }
      })
      .catch((error) => {
        console.error('Error fetching author data:', error);
      });

    // Fetch posts related to the author
    console.log("Fetching posts...");
    fetch('./data/blog/posts.json')
      .then((response) => response.json())
      .then((data) => {
        const postsByAuthor = data.filter(blog => blog.authorName === authorName);
        setAuthorBlogs(postsByAuthor);
      })
      .catch((error) => {
        console.error('Error fetching posts:', error);
      });
  }, [authorName]);

  // If author data is not available, show loading
  if (!authorData) {
    return <div>Loading author profile...</div>;
  }

  return (
    <div className="container mx-auto p-6">
      {/* Author Information */}
      <div className="flex items-center">
        <img
          src={authorData.profileImage}
          alt={authorData.authorName}
          className="w-20 h-20 rounded-full mr-4"
        />
        <div>
          <h2 className="text-2xl font-semibold">{authorData.authorName}</h2>
          <p className="text-gray-600">{authorData.bio || "No bio available."}</p>
        </div>
      </div>

      {/* Author Blogs */}
      <div className="mt-6">
        <h3 className="text-xl font-semibold">
          Posts by <span className="text-violet-500">{authorData.authorName}</span>
        </h3>
        <div className="py-10">
          {authorBlogs.length > 0 ? (
            <PostList typePost={authorName} /> 
          ) : (
            <p>No posts found for this author.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthorProfile;
