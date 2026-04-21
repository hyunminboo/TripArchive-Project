import PostHeader from '@/components/posts/PostHeader'
import PostList from '@/components/posts/PostList'
import TagFilterBar from '@/components/posts/TagFilterBar'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import { useState, useEffect } from 'react'
import './PostPagesAll.scss'
import { getPosts } from '@/api/post.api'
import { useNavigate } from 'react-router-dom'
import useFilteredPosts from '../../hooks/useFilteredPosts'
const PostDashboard = () => {

    const [selectedTag, setSelectedTag] = useState('전체')
    const [searchKeyword, setSearchKeyword] = useState('')
    const [tags, setTags] = useState(['전체'])

    const [posts, setPosts] = useState([])
    const navigate = useNavigate()
    const [fetchError, setFetchError] = useState('')

    useEffect(() => {
        setFetchError('')
        const fetchPosts = async () => {
            try {
                const response = await getPosts()

                console.log(response)
                const rawPosts = Array.isArray(response)
                    ? response
                    : Array.isArray(response?.data)
                        ? response.data
                        : []

                const mappedPosts = (rawPosts || []).map((post) => ({
                    id: post.id,
                    category: post.category,
                    title: post.title,
                    content: post.content,
                    tags: post.tags || [],
                    thumbnail: post.imageUrl || ''
                }))

                setPosts(mappedPosts)
            } catch (error) {
                setFetchError(error?.response?.data?.message || error.message || '게시글 조회 실패')
                setPosts([])
            }

        }
        fetchPosts()
    }, [])




    const filteredPosts = useFilteredPosts(posts,selectedTag,searchKeyword)
    const handleCreatePost = () => {
        console.log('새 메모 작성')
        navigate('/app/posts/new')
    }
   return (
        <section className='page post-section'>
            <div className="inner">
                
                {/* 1. 검색창과 버튼을 한 줄로 묶는 컨테이너 */}
                <div className="top-action-bar">
                    <div className="input-post">
                        <Input
                            placeholder="다녀온 여행지 검색" // 텍스트 변경
                            value={searchKeyword}
                            onChange={(e) => setSearchKeyword(e.target.value)}
                        />
                    </div>
                    <Button 
                        text="새 메모 작성" // 텍스트 변경
                        className="brown-btn" // SCSS에서 제어할 전용 클래스 추가
                        onClick={handleCreatePost} 
                    />
                </div>

                {/* 2. 태그 영역 */}
                <div className="tags-wrapper">
                    <TagFilterBar
                        tags={tags}
                        selectedTag={selectedTag}
                        onChangeTag={setSelectedTag}
                    />
                    {/* (참고) 캡처 이미지에는 '전체 게시글 보기' 버튼이 없으므로 제거하거나 주석 처리하셔도 좋습니다. */}
                </div>

                {/* 3. 게시글 리스트 영역 */}
                <PostList posts={filteredPosts.slice(0,3)} />
            </div>
        </section>
    )
}

export default PostDashboard