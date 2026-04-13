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
                <PostHeader
                    onClick={handleCreatePost}
                    title='게시글을 작성하세요'
                    showButton
                    buttonText="작성하기"
                    buttonClass="primary"
                />
                <div className="input-post">
                    <Input
                        placeholder="게시글 제목 또는 내용을 검색하세요"
                        value={searchKeyword}
                        onChange={(e) => setSearchKeyword(e.target.value)}
                    />
                </div>
                <div className="tags-wrapper">

                    <TagFilterBar
                        tags={tags}
                        selectedTag={selectedTag}
                        onChangeTag={setSelectedTag}
                    />
                    <Button text="전체 게시글 보기" className="wh" />
                </div>
                <PostList posts={filteredPosts.slice(0,3)} />
            </div>
        </section>
    )
}

export default PostDashboard