import axios from 'axios'
import {ALL_MENU_REQUEST , ALL_MENU_SUCCESS , ALL_MENU_FAIL , CLEAR_ERRORS} from '../reducers/MenuSlice'

export const getMenuItems = (keyword = "" , currentPage = 1 , price = [0,3000] , category = "") => async(dispatch) => {
    dispatch(ALL_MENU_REQUEST())
    let link = `http://localhost:4000/api/v1/menus?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}`
    try {
        if(category && category!== 'All'){
            link = `http://localhost:4000/api/v1/menus?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&category=${category}`
        }
        const {data} =await axios.get(link)
        dispatch(ALL_MENU_SUCCESS(data))
    } catch (error) {
        console.log(error.response.data.error);
        dispatch(ALL_MENU_FAIL(error.response.data.error))
    }
}

//Clearing Errors
export const clearErrors = (dispatch) =>{
    dispatch(CLEAR_ERRORS())
}