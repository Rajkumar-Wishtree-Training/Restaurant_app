import React, { useEffect } from 'react'
import Sidebar from './Sidebar.js'
import { Typography } from '@material-ui/core'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector , useDispatch } from 'react-redux'
import './Dashboard.css'
import { getAdminMenuItems } from '../../redux/actions/MenuAction.js'

const Dashboard = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { isAuthenticated} = useSelector(state => state.userDetails)
  const {menus } = useSelector(state => state.menuList)            
  // console.log(data , data.role);
  useEffect(()=>{
   dispatch(getAdminMenuItems())
  },[isAuthenticated , navigate , dispatch])
  return (
    <div className="dashboard">
      <Sidebar />
      <div className="dashboardContainer">
        <Typography component="h1">Dashboard</Typography>

        <div className="dashboardSummary">
          <div className="dashboardSummaryBox2">
            <Link to="/admin/menuitems">
              <p>Menus</p>
              <p>{menus && menus.length}</p>
            </Link>
            <Link to="/admin/users">
              <p>Users</p>
              <p>67</p>
            </Link>
          </div>
        </div>
      </div>
    </div> 
  )
}

export default Dashboard
