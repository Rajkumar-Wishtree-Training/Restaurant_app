import { createSlice } from "@reduxjs/toolkit";

export const menuSlice = createSlice({
    name : "menu",
    initialState : {
        menus : [],
        loading : false,
        error : null
    },
    reducers:{
        ALL_MENU_REQUEST:(state , action) =>{
            state.loading = true;
        },
        ALL_MENU_SUCCESS : (state , action) => {
            state.loading = false;
            state.menus = action.payload.menuItems;
            state.menuCount = action.payload.totalResult;
            state.resultPerPage = action.payload.resultPerPage
            state.filteredProductCount = action.payload.filteredProductCount
        },
        ALL_MENU_FAIL : (state , action) => {
            state.loading = false;
            state.error = action.payload
        },
        CLEAR_ERRORS : (state , action) => {
            state = {...state}
            state.error = null

        }
    }
})

export const {ALL_MENU_REQUEST , ALL_MENU_SUCCESS , ALL_MENU_FAIL , CLEAR_ERRORS} = menuSlice.actions