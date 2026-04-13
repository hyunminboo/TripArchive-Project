import React from 'react'
import PostCard from './PostCard'
import './PostComponentAll.scss'
const PostList = ({posts}) => {
  return (
    <div className='post-list'>
      {posts.map((post)=>(
        <PostCard key={post.id} post={post}/>
      ))}
      </div>
  )
}

export default PostList