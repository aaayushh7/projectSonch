import React from 'react'
import './Title.css'

const Title = ({subTitle, title,intro}) => {
  return (
    <div className='p-6  w-full flex flex-col '>
      <h3 className='text-4xl mx-auto font-semibold'>{subTitle}</h3>
      <h2>{title}</h2>
      <p>{intro}</p>
    </div>
  )
}

export default Title
