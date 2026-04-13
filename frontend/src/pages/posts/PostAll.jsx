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

const PostAll = () => {

  const [selectedTag, setSelectedTag] = useState('전체')
  const [searchKeyword, setSearchKeyword] = useState('')
  const [tags, setTags] = useState(['전체'])

  const [posts, setPosts] = useState([])
  const [fetchError, setFetchError] = useState('')
  const navigate = useNavigate()

  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 3


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

  const filteredPosts = useFilteredPosts(posts, selectedTag, searchKeyword)

  useEffect(() => {
    setCurrentPage(1)
  }, [selectedTag, searchKeyword])

  const totalPages = Math.ceil(filteredPosts.length/ itemsPerPage)
  const startIndex =(currentPage -1) * itemsPerPage

  const endIndex =startIndex + itemsPerPage

  const currentPosts = filteredPosts.slice(startIndex,endIndex)
  const pageNumbers = Array.from({length:totalPages},(_,i)=>i+1)


  const handlePrevPage =()=>{
    setCurrentPage((prev)=>Math.max(prev-1,1))
  }
  const handleNextPage =()=>{
    setCurrentPage((prev)=>Math.max(prev+1,totalPages))
  }
  const handlePageClick =(page)=>{
    setCurrentPage(page)
  }



  const handleCreatePost = () => {
    console.log('새 메모 작성')
    navigate('/app/posts/new')
  }

  return (
    <section className='page post-section post-all'>
      <div className="inner">
        <PostHeader
          onClick={handleCreatePost}
          title='전체 게시글 보기'
          showButton
          buttonText="새 게시글 쓰기"
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
        <PostList posts={currentPosts} />

        <div className="btn-wrap">
          <Button 
          onClick={handlePrevPage}
          text="<" 
          disabled ={currentPage==1}
          className="bl"/>
          <ul>
            {pageNumbers.map((page)=>(
              <li 
              key={page} 
              onClick={()=>handlePageClick(page)}
              >{page}</li>

            ))}
          </ul>
          <Button 
          disabled ={currentPage==totalPages || totalPages==0}

          onClick={handleNextPage}
          text=">" className="bl"/>
        </div>
      </div>
    </section>
  )
}

export default PostAll