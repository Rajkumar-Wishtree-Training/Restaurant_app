import axios from 'axios'
import { ALL_MENU_REQUEST, ALL_MENU_SUCCESS, ALL_MENU_FAIL, CLEAR_ERRORS, ADMIN_MENU_REQUEST, ADMIN_MENU_SUCCESS, ADMIN_MENU_FAIL, CREATE_MENU_SUCCESS, CREATE_MENU_REQUEST, CREATE_MENU_FAIL } from '../reducers/MenuSlice'


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
        console.log(error.response.data.error);
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
    CREATE_MENU_REQUEST()
    try {
        let link = `http://localhost:4000/api/v1/admin/menu/new`
        const config = { headers: { "Content-Type": "multipart/form-data" } };
        console.log(menuData);
        const { data } = await axios.post(link,  menuData , {config ,withCredentials : true}  )
        dispatch(CREATE_MENU_SUCCESS(data))

    } catch (error) {
        dispatch(CREATE_MENU_FAIL(error.response.data.error))
    }

}

//Clearing Errors
export const clearMenuErrors = () => (dispatch) => {
    dispatch(CLEAR_ERRORS())
}