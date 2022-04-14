import React from 'react'
import { Link } from 'react-router-dom'
import './PageNotFound.css'

const PageNotFound = () => {
  return (
    <div className='pageNotFound'>
        <h1>OPS! Page Not Found 404</h1>
        <Link to='/'>Backe to Home</Link>
      
    </div>
  )
}

export default PageNotFound
