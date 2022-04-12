import { createSlice } from "@reduxjs/toolkit";

export const menuSlice = createSlice({
    name : "menu",
    initialState : {
        menus : [],
        menuItem : {},
        loading : false,
        success : false,
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
            state.menus = []
            state.filteredProductCount = 0
            state.menuCount = 0
            state.error = action.payload
        },
        ADMIN_MENU_REQUEST : (state, action) => {
            state.loading = true
        },
        ADMIN_MENU_SUCCESS : (state , action) => {
            state.loading = false
            state.menus = action.payload.menuItems
            state.menuCount = action.payload.totalResult
        },
        ADMIN_MENU_FAIL : (state, action) => {
            state.loading = false;
            state.menus = []
            state.menuCount = 0
            state.error = action.payload
        },
        CREATE_MENU_REQUEST : (state , action) => {
            state.loading = true
        },
        CREATE_MENU_SUCCESS : (state , action) => {
            state.loading = false
            state.success = action.payload.success
            state.menuItem = action.payload.menuItem
        },
        CREATE_MENU_FAIL : (state , action) => {
            state.loading = false
            state.error = action.payload
        },
        CREATE_MENU_RESET : (state , action) => {
            state.loading = false
            state.success = false
        },
        CLEAR_ERRORS : (state , action) => {
            state.error = null
        }
    }
})

export const {ALL_MENU_REQUEST , ALL_MENU_SUCCESS , ALL_MENU_FAIL ,  ADMIN_MENU_REQUEST , ADMIN_MENU_SUCCESS , ADMIN_MENU_FAIL , CLEAR_ERRORS , CREATE_MENU_REQUEST , CREATE_MENU_SUCCESS , CREATE_MENU_FAIL , CREATE_MENU_RESET} = menuSlice.actions