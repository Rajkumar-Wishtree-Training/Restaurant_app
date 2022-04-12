import { Typography } from '@material-ui/core'
import React from 'react'
import { Link } from 'react-router-dom'
import { TreeView, TreeItem } from "@material-ui/lab";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import PostAddIcon from "@material-ui/icons/PostAdd";
import AddIcon from "@material-ui/icons/Add";
import ImportExportIcon from "@material-ui/icons/ImportExport";
import DashboardIcon from "@material-ui/icons/Dashboard";
import PeopleIcon from "@material-ui/icons/People";
import './Sidebar.css'

const Sidebar = () => {
  return (
    <div className="sidebar">
    <Link to="/">
     <p className='sidebarTitle'>Dilse Foodie</p>
    </Link>
    <Link to="/admin/dashboard">
      <Typography component='p'>
        <DashboardIcon /> Dashboard
      </Typography>
    </Link>
    <Link to='#'>
    <TreeView
        defaultCollapseIcon={<ExpandMoreIcon />}
        defaultExpandIcon={<ImportExportIcon />}
      >
        <TreeItem nodeId="1" label="Menu List">
          <Link to="/admin/menuitems">
            <TreeItem nodeId="2" label="All" icon={<PostAddIcon />} />
          </Link>

          <Link to="/admin/menu/new">
            <TreeItem nodeId="3" label="Create" icon={<AddIcon />} />
          </Link>
        </TreeItem>
      </TreeView>
    </Link>
    <Link to="/admin/users">
      <Typography component='p'>
        <PeopleIcon /> Users
      </Typography>
    </Link>
  </div>
    )
}

export default Sidebar
