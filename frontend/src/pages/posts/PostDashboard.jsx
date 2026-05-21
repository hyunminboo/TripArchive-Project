import PostList from "@/components/posts/PostList";
import TagFilterBar from "@/components/posts/TagFilterBar";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { useState, useEffect } from "react";
import "./PostPagesAll.scss";
import { getPosts } from "@/api/post.api";
import { logout as logoutApi } from "@/api/auth.api";
import { useAuth } from "@/store/auth.store";
import { useNavigate, useParams, Link } from "react-router-dom";
import useFilteredPosts from "../../hooks/useFilteredPosts";
import SidebarMap from "@/components/map/SidebarMap";
import Header from "@/components/layouts/Header";

const PostDashboard = () => {
  const [selectedTag, setSelectedTag] = useState("전체");
  const [searchKeyword, setSearchKeyword] = useState("");
  const [tags, setTags] = useState(["전체"]);
  const [posts, setPosts] = useState([]);
  const [fetchError, setFetchError] = useState("");
  const [collapsed, setCollapsed] = useState(false);
  const [selectedPlaces, setSelectedPlaces] = useState(() => {
    const saved = localStorage.getItem("tripArchive_selectedPlaces");
    try {
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      return [];
    }
  });
  const [isMapModalOpen, setIsMapModalOpen] = useState(false);

  const navigate = useNavigate();
  const { id: activeId } = useParams();
  const { logout, member } = useAuth();

  useEffect(() => {
    localStorage.setItem("tripArchive_selectedPlaces", JSON.stringify(selectedPlaces));
  }, [selectedPlaces]);

  const handleLogout = async () => {
    try {
      await logoutApi();
      logout();
      navigate("/");
    } catch (error) {
      alert(error.message || "로그아웃 오류");
    }
  };

  useEffect(() => {
    setFetchError("");
    const fetchPosts = async () => {
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
        const uniqueTags = [
          "전체",
          ...new Set(
            mappedPosts.flatMap((post) =>
              post.tags.map((tag) => tag?.name ?? tag),
            ),
          ),
        ];
        setTags(uniqueTags);
      } catch (error) {
        setFetchError(
          error?.response?.data?.message || error.message || "게시글 조회 실패",
        );
        setPosts([]);
      }
    };
    fetchPosts();
  }, []);

  const filteredPosts = useFilteredPosts(posts, selectedTag, searchKeyword);

  const handleCreatePost = () => {
    navigate("/app/posts/new");
  };

  const handleAddPlace = (placeName) => {
    setSelectedPlaces(prev => {
      // Avoid exact duplicates
      if (prev.some(p => p.name === placeName)) return prev;
      return [...prev, { id: Date.now(), name: placeName }];
    });
  };

  const handleRemovePlace = (id) => {
    setSelectedPlaces(prev => prev.filter(p => p.id !== id));
  };

  return (
    <div className="post-dashboard-layout">
      <aside className={`post-sidebar ${collapsed ? "collapsed" : ""}`}>
        {!collapsed && (
          <div className="sidebar-logo-container">
            <Link to="/app">
              <img src="/images/logo.svg" alt="TripArchive" className="sidebar-logo" />
            </Link>
          </div>
        )}
        <div className="sidebar-header">
          {!collapsed && (
            <div className="sidebar-title-group">
              <span className="sidebar-title">내 메모</span>
              <span className="sidebar-count">{filteredPosts.length}</span>
              <span className="sidebar-divider">|</span>
              <span className="sidebar-title">위치</span>
              <span className="sidebar-count">{selectedPlaces.length}</span>
            </div>
          )}
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
        </div>

        {!collapsed && (
          <>
            <div className="sidebar-map-section">
              <SidebarMap 
                onSelectPlace={handleAddPlace} 
                isModalOpen={isMapModalOpen}
                setIsModalOpen={setIsMapModalOpen}
              />
              
              {selectedPlaces.length > 0 && (
                <div className="sidebar-places-list">
                  {selectedPlaces.map(place => (
                    <div key={place.id} className="sidebar-selected-place">
                      <div 
                        className="place-info" 
                        onClick={() => setIsMapModalOpen(true)}
                        style={{ cursor: "pointer" }}
                      >
                        <span className="place-name">{place.name}</span>
                      </div>
                      <button 
                        className="remove-place-btn" 
                        onClick={() => handleRemovePlace(place.id)}
                        title="삭제"
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="sidebar-section-title">작성한 메모</div>
            <ul className="sidebar-list">
              {filteredPosts.length === 0 ? (
                <li className="sidebar-empty">작성된 메모가 없어요</li>
              ) : (
                filteredPosts.map((post) => (
                  <li
                    key={post.id}
                    className={`sidebar-item ${String(activeId) === String(post.id) ? "active" : ""}`}
                    onClick={() => navigate(`/app/posts/${post.id}`)}
                  >
                    <span className="sidebar-item-title">{post.title}</span>
                    {post.tags.length > 0 && (
                      <span className="sidebar-item-tag">
                        #{post.tags[0]?.name ?? post.tags[0]}
                      </span>
                    )}
                  </li>
                ))
              )}
            </ul>

            <div className="sidebar-footer">
              <button
                className="sidebar-footer-btn"
                onClick={() => navigate("/app/profile")}
              >
                <span className="sidebar-avatar">
                  {(member?.nickname ?? member?.name ?? "?")
                    .charAt(0)
                    .toUpperCase()}
                </span>
                <span className="sidebar-footer-label">
                  {member?.nickname ?? member?.name ?? "내 프로필"}
                </span>
              </button>
              <button className="sidebar-footer-btn logout" onClick={handleLogout}>
                <span className="sidebar-footer-label">로그아웃</span>
              </button>
            </div>
          </>
        )}
      </aside>

      <section className="page post-section">
        <Header />
        <div className="inner">
          <div className="top-action-bar">
            <div className="input-post">
              <Input
                placeholder="메모 검색"
                value={searchKeyword}
                onChange={(e) => setSearchKeyword(e.target.value)}
                icon={
                  <svg 
                    width="18" 
                    height="18" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                    style={{ color: '#5f6368' }}
                  >
                    <circle cx="11" cy="11" r="8"></circle>
                    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                  </svg>
                }
              />
            </div>
          </div>

          <div className="tags-wrapper">
            <TagFilterBar
              tags={tags}
              selectedTag={selectedTag}
              onChangeTag={setSelectedTag}
            />
          </div>

          {fetchError && <p className="fetch-error">{fetchError}</p>}

          <PostList posts={filteredPosts} />
        </div>
      </section>
    </div>
  );
};

export default PostDashboard;
