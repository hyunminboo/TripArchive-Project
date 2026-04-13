import React from 'react'
import './Button.scss'
const Button = ({
  type="button",
  text,
  className,
  onClick,
  backico = '',
  disabled = false,
  icons }) => {

  const backIconSrc =
    backico == 'wh' ? "/images/arrow-back-wh.svg" :
      backico == 'bh' ? "/images/arrow-back.svg" : null


  return (
    <button
    type={type}
      onClick={onClick}
      disabled={disabled}
      className={`btn ${className}`}>
      {
        backIconSrc && <img src={backIconSrc} />
      }
      {text}
      {icons && <img src='/images/arrow.svg' />}
    </button>
  )
}

export default Button