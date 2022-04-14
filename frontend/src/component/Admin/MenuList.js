import React, { Fragment, useEffect } from 'react'
import { DataGrid } from '@material-ui/data-grid'
import './MenuList.css'
import { useSelector, useDispatch } from 'react-redux'
import { clearMenuErrors, deleteMenuItem, getAdminMenuItems } from '../../redux/actions/MenuAction'
import { Link , useNavigate } from 'react-router-dom'
import { useAlert } from 'react-alert'
import { Button } from '@material-ui/core'
import EditIcon from '@material-ui/icons/Edit'
import DeleteIcon from '@material-ui/icons/Delete'
import SideBar from './Sidebar'
import { DELETE_MENU_RESET } from '../../redux/reducers/MenuSlice'
import MetaData from '../MetaData'



const MenuList = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const alert = useAlert();

    const { error, menus , isDeleted } = useSelector(state => state.menuList)

    const deleteProductHandler = (id) => {
      dispatch(deleteMenuItem(id))
    }

    useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch(clearMenuErrors());
        }
        if(isDeleted){
          alert.success("Item Deleted")
          navigate('/admin/dashboard')
          dispatch(DELETE_MENU_RESET())
          
        }
        dispatch(getAdminMenuItems());
    },[alert , dispatch , error , isDeleted , navigate])

    const columns = [
        { field: "id", headerName: "Menu ID", minWidth: 220, flex: 0.5 },
    
        {
          field: "name",
          headerName: "Name",
          minWidth: 220,
          flex: 0.5,
        },
       
        {
          field: "price",
          headerName: "Price",
          type: "number",
          minWidth: 220,
          flex: 0.5,
        },
        {
            field : "diet",
            headerName: "Diet",
            minWidth : 220,
            flex : 0.5
        },
        {
          field: "actions",
          flex: 0.3,
          headerName: "Actions",
          minWidth: 150,
          type: "number",
          sortable: false,
          renderCell: (params) => {
            return (
              <Fragment>
                <Link to={`/admin/menu/${params.getValue(params.id, "id")}`}>
                  <EditIcon />
                </Link>
    
                <Button
                  onClick={() =>
                    deleteProductHandler(params.getValue(params.id, "id"))
                  }
                >
                  <DeleteIcon />
                </Button>
              </Fragment>
            );
          },
        },
      ];
      const rows = [];

      menus &&
        menus.forEach((item) => {
          rows.push({
            id: item._id,
            diet : item.diet,
            price: item.price,
            name: item.name,
          });
        });
    return (
        <Fragment>
        <MetaData title='Dilse Foodie --List'/>
        <div className="dashboard">
          <SideBar />
          <div className="productListContainer">
            <h1 id="productListHeading">ALL PRODUCTS</h1>
  
            <DataGrid
              rows={rows}
              columns={columns}
              pageSize={10}
              disableSelectionOnClick
              className="productListTable"
              autoHeight
            />
          </div>
        </div>
      </Fragment>
    )
}

export default MenuList
