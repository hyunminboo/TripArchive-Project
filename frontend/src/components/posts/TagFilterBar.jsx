import React from 'react'
import PostTag from './PostTag'
import './PostComponentAll.scss'
const TagFilterBar = ({ tags }) => {
  return (
    <div className='tags'>
      <span>#tag:</span>
      {tags.map((tag, i) => (

        <PostTag
          key={`${tag}-${i}`}
          tag={tag}
        />
      ))}
    </div>
  )
}

export default TagFilterBar