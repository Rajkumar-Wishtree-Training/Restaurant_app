import axios from 'axios'
import { ALL_MENU_REQUEST, ALL_MENU_SUCCESS, ALL_MENU_FAIL, CLEAR_ERRORS, ADMIN_MENU_REQUEST, ADMIN_MENU_SUCCESS, ADMIN_MENU_FAIL, CREATE_MENU_SUCCESS, CREATE_MENU_REQUEST, CREATE_MENU_FAIL, DELETE_MENU_REQUEST, DELETE_MENU_SUCCESS, DELETE_MENU_FAIL, UPDATE_MENU_REQUEST, UPDATE_MENU_SUCCESS, UPDATE_MENU_FAIL, MENU_DETAIL_REQUEST, MENU_DETAIL_SUCCESS, MENU_DETAIL_FAIL } from '../reducers/MenuSlice'


//GET ALL MENU ITEMS
export const getMenuItems = (keyword = "", currentPage = 1, price = [0, 3000], category = "") => async (dispatch) => {
    dispatch(ALL_MENU_REQUEST())
    let link = `http://localhost:4000/api/v1/menus?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}`
    try {
        if (category && category !== 'All') {
            link = `http://localhost:4000/api/v1/menus?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&category=${category}`
        }
        const { data } = await axios.get(link, { withCredentials: true })
        dispatch(ALL_MENU_SUCCESS(data))
    } catch (error) {
        // console.log(error.response.data.error);
        dispatch(ALL_MENU_FAIL(error.response.data.error))
    }
}

//ALL MENU ITEMS
export const getAdminMenuItems = () => async (dispatch) => {
    dispatch(ADMIN_MENU_REQUEST())
    let link = `http://localhost:4000/api/v1/admin/menus`
    try {
        const { data } = await axios.get(link, { withCredentials: true })
        dispatch(ADMIN_MENU_SUCCESS(data))
    } catch (error) {
        dispatch(ADMIN_MENU_FAIL(error.response.data.error))
    }
}

//CREATE ITEM
export const createMenuItem = (menuData) => async (dispatch) => {
   dispatch(CREATE_MENU_REQUEST())
    try {
        let link = `http://localhost:4000/api/v1/admin/menu/new`
        const config = { headers: { "Content-Type": "multipart/form-data" } };
        // console.log(menuData);
        const { data } = await axios.post(link,  menuData , {config ,withCredentials : true}  )
        dispatch(CREATE_MENU_SUCCESS(data))

    } catch (error) {
        dispatch(CREATE_MENU_FAIL(error.response.data.error))
    }
}
// GET MENU ITEM
export const getMenuItemDetails = (id) => async (dispatch) => {
    try {
        MENU_DETAIL_REQUEST()
        let link = `http://localhost:4000/api/v1/admin/menu/${id}`
        const { data } = await axios.get(link, {withCredentials : true}  )
        dispatch(MENU_DETAIL_SUCCESS(data.menuItem))

    } catch (error) {
        dispatch(MENU_DETAIL_FAIL(error.response.data.error))
    }
}


//DELETE ITEM
export const deleteMenuItem = (id) => async (dispatch) => {
    try {
        dispatch(DELETE_MENU_REQUEST())
        let link = `http://localhost:4000/api/v1/admin/menu/${id}`
        const {data} = await axios.delete(link,{withCredentials : true})
        dispatch(DELETE_MENU_SUCCESS(data.success))
    } catch (error) {
        dispatch(DELETE_MENU_FAIL(error.response.data.error))
    }
}

//UPDATE ITEM
export const updateMenuItem = (id ,menuData) => async (dispatch) => {
    try {
        dispatch(UPDATE_MENU_REQUEST())
        // console.log(menuData);
        let link = `http://localhost:4000/api/v1/admin/menu/${id}`
        const config = { headers: { "Content-Type": "multipart/form-data" } };
        const {data} = await axios.put(link, menuData , {config, withCredentials : true})
        dispatch(UPDATE_MENU_SUCCESS(data.success))
    } catch (error) {
        dispatch(UPDATE_MENU_FAIL(error.response.data.error))
    }
}

//Clearing Errors
export const clearMenuErrors = () => (dispatch) => {
    dispatch(CLEAR_ERRORS())
}