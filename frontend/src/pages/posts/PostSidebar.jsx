import { useState } from "react";
import { usePostContext } from "@/context/PostContext";
import { useNavigate } from "react-router-dom";
import SidebarMap from "@/components/map/SidebarMap";

const PostSidebar = () => {
  const { posts } = usePostContext();
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);
  const [selectedPlace, setSelectedPlace] = useState("");

  return (
    <aside className={`post-sidebar ${collapsed ? "collapsed" : ""}`}>
      <button
        className="sidebar-toggle"
        onClick={() => setCollapsed(!collapsed)}
      >
        <img
          src="/images/sidebar-toggle.svg"
          alt="toggle"
          width={18}
          height={18}
        />
      </button>

      {!collapsed && (
        <>
          <div className="sidebar-header">
            <span className="sidebar-title">내 메모</span>
            <span className="sidebar-count">{posts.length}</span>
          </div>

          <div className="sidebar-map-section">
            <SidebarMap onSelectPlace={setSelectedPlace} />
            {selectedPlace && (
              <div className="sidebar-selected-place">
                <span className="place-label">📍 </span>
                <span className="place-name">{selectedPlace}</span>
              </div>
            )}
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
                {post.tags.length > 0 && (
                  <span className="sidebar-item-tag">
                    #{post.tags[0]?.name ?? post.tags[0]}
                  </span>
                )}
              </li>
            ))}
          </ul>
        </>
      )}
    </aside>
  );
};

export default PostSidebar;
