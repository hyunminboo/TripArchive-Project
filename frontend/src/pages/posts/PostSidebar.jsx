// src/components/posts/PostSidebar.jsx
import { usePostContext } from "@/context/PostContext";
import { useNavigate } from "react-router-dom";
import "./PostSidebar.scss";

const PostSidebar = () => {
  const { posts } = usePostContext();
  const navigate = useNavigate();

  return (
    <aside className="post-sidebar">
      <div className="sidebar-header">
        <span className="sidebar-title">내 메모</span>
        <span className="sidebar-count">{posts.length}</span>
      </div>

      <ul className="sidebar-list">
        {posts.length === 0 && (
          <li className="sidebar-empty">작성된 메모가 없어요</li>
        )}
        {posts.map((post) => (
          <li
            key={post.id}
            className="sidebar-item"
            onClick={() => navigate(`/app/posts/${post.id}`)}
          >
            <span className="sidebar-item-title">{post.title}</span>
            {post.tags.length > 0 && (
              <span className="sidebar-item-tag">
                #{post.tags[0]?.name ?? post.tags[0]}
              </span>
            )}
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default PostSidebar;
