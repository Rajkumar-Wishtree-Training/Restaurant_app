import React from 'react'
import { Link } from 'react-router-dom'
import './Navbar.css'

function Navbar({user}) {
  return (
   <div className="navbar">
       <span className="logo"><Link className='link' to='/'>Dilse Foodie</Link></span>
       {
           user ? (
            <ul className="list">
            <li className="listItem">
                <img src="https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg" alt="ProfileImage" className='avatar'/>
            </li>
            <li className="listItem">John Doe</li>
            <li className="listItem">Log out</li>
        </ul>
           ) : (
               <Link className='link listItem' to='/login'>Login</Link>
           )
       }
   </div>
  )
}

export default Navbar
