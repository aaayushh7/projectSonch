import React from 'react'
import './Title.css'

const Title = ({subTitle, title,intro}) => {
  return (
    <div className='p-6 sm:mx-[100px] text-justify'>
      <h3>{subTitle}</h3>
      <h2>{title}</h2>
      <p>{intro}</p>
    </div>
  )
}

export default Title
