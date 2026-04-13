import React from 'react'
import Button from '../ui/Button'
const PostHeader = ({
  title = '',
  buttonText = '',
  onClick,
  buttonClass = '',
  showButton = true,

}) => {
  return (
    <header className='post-header'>
        <h2 className='post-title'>{title}</h2>

      {showButton && (
        <Button
          text={buttonText}
          className={buttonClass}
          onClick={onClick}
        />
      )}
    </header>
  )
}

export default PostHeader