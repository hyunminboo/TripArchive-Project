
import React from 'react'
import { getTagColor } from '@/hooks/useTagColor'
const PostTag = ({ tag ,onClick}) => {
  return (
    <span className='post-tag'
    style={{
    backgroundColor: '#ffffff',
    border: '1px solid #d1d5db'
  }}
    >
      <span>
      {tag}
      </span>
      <button 
      className='post-tag-delete' 
      onClick={(e)=>{
        e.preventDefault()
        e.stopPropagation()
        onClick?.()
        }}>X</button>
    </span>
  )
}

export default PostTag