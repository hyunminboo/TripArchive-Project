// src/context/PostContext.jsx
import { createContext, useContext, useState, useEffect } from "react";
import { getPosts } from "@/api/post.api";

const PostContext = createContext(null);

export const PostProvider = ({ children }) => {
  const [posts, setPosts] = useState([]);
  const [fetchError, setFetchError] = useState("");

  const fetchPosts = async () => {
    setFetchError("");
    try {
      const response = await getPosts();
      const rawPosts = Array.isArray(response)
        ? response
        : Array.isArray(response?.data)
          ? response.data
          : [];

      const mappedPosts = rawPosts.map((post) => ({
        id: post.id,
        category: post.category,
        title: post.title,
        content: post.content,
        tags: post.tags || [],
        thumbnail: post.imageUrl || "",
      }));

      setPosts(mappedPosts);
    } catch (error) {
      setFetchError(
        error?.response?.data?.message || error.message || "게시글 조회 실패",
      );
      setPosts([]);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <PostContext.Provider value={{ posts, setPosts, fetchError, fetchPosts }}>
      {children}
    </PostContext.Provider>
  );
};

export const usePostContext = () => useContext(PostContext);
