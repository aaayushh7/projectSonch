import React from 'react'
import './Title.css'

const Title = ({subTitle, title,intro}) => {
  return (
    <div className='title'>
      <h3>{subTitle}</h3>
      <h2>{title}</h2>
      <p>{intro}</p>
    </div>
  )
}

export default Title
