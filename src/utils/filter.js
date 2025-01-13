// utils/filter.js

// Filter by blog type (New, Trending, Top)
export const filterByType = (blogs, typePost) => {
    if (!typePost) return blogs; // If no type is provided, return all blogs
    return blogs.filter((blog) => blog.typePost === typePost);
  };
  
  // Filter by category
  export const filterByCategory = (blogs, category) => {
    if (!category) return blogs; // If no category is provided, return all blogs
    return blogs.filter((blog) => blog.categoryPostname === category);
  };
  
  // Combined filter that allows filtering by type, category, etc.
  export const combinedFilter = (blogs, filters) => {
    let filteredBlogs = blogs;
  
    if (filters.typePost) {
      filteredBlogs = filterByType(filteredBlogs, filters.typePost);
    }
  
    if (filters.categoryPostname) {
      filteredBlogs = filterByCategory(filteredBlogs, filters.categoryPostname);
    }
  
    return filteredBlogs;
  };
  