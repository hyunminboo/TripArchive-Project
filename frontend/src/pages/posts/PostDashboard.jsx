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

const PostDashboard = () => {
  const [selectedTag, setSelectedTag] = useState("전체");
  const [searchKeyword, setSearchKeyword] = useState("");
  const [tags, setTags] = useState(["전체"]);
  const [posts, setPosts] = useState([]);
  const [fetchError, setFetchError] = useState("");

  const navigate = useNavigate();
  const { id: activeId } = useParams();
  const { logout, member } = useAuth();

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

  return (
    <div className="post-dashboard-layout">
      <aside className="post-sidebar">
        <div className="sidebar-header">
          <span className="sidebar-title">내 메모</span>
          <span className="sidebar-count">{filteredPosts.length}</span>
        </div>

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
      </aside>

      <section className="page post-section">
        <div className="inner">
          <div className="top-action-bar">
            <div className="input-post">
              <Input
                placeholder="여행지 검색"
                value={searchKeyword}
                onChange={(e) => setSearchKeyword(e.target.value)}
              />
            </div>
            <Button
              text="새 메모 작성"
              className="brown-btn"
              onClick={handleCreatePost}
            />
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
