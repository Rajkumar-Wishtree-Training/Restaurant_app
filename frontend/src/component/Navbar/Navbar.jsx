import React, { } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { logoutUser } from '../../redux/actions/authAction'
import './Navbar.css'

function Navbar({isAuthenticated , data}) {
    // const {data, isAuthenticated} = useSelector(state => state.loginDetails)
    const dispatch = useDispatch()
    const onClickLogout = () => {
       try {
        dispatch(logoutUser())
       } catch (error) {
            
       }
    }
  return (
   <div className="navbar">
       <span className="logo"><Link className='link' to='/'>Dilse Foodie</Link></span>
       {
           isAuthenticated ? (
            <ul className="list">
            <li className="listItem">
                <img src="https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg" alt="ProfileImage" className='avatar'/>
            </li>
            <li className="listItem">{data.name}</li>
            <li className="listItem" onClick={onClickLogout}>Log out</li>
        </ul>
           ) : (
               <Link className='link listItem' to='/login'>Login</Link>
           )
       }
   </div>
  )
}

export default Navbar
