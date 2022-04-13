import { createSlice } from "@reduxjs/toolkit";

export const menuSlice = createSlice({
    name : "menu",
    initialState : {
        menus : [],
        menuItem : {},
        loading : false,
        success : false,
        isDeleted : false,
        isUpdated : false,
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
        MENU_DETAIL_REQUEST : (state , action) => {
            state.loading = true
        },
        MENU_DETAIL_SUCCESS : (state , action) => {
            state.loading = false
            state.menuItem = action.payload
        },
        MENU_DETAIL_FAIL : (state, action) => {
            state.loading = false
            state.error = action.payload
        },
        ADMIN_MENU_REQUEST : (state , action) => {
            state.loading = true
        },
        ADMIN_MENU_SUCCESS : (state , action) => {
            state.loading = false
            state.menus = action.payload.menuItems
            state.error = null
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
            state.error = null
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
        DELETE_MENU_REQUEST : (state , action) => {
            state.loading = true

        },
        DELETE_MENU_SUCCESS : (state , action) => {
            state.loading = false
            state.error = null
            state.isDeleted = action.payload
        },
        DELETE_MENU_RESET : (state , action) => {
            state.loading = false
            state.isDeleted = false
        },
        DELETE_MENU_FAIL : (state , action) => {
            state.loading = false
            state.error = action.payload
        },
        UPDATE_MENU_REQUEST : (state, action) => {
            state.loading = true

        },
        UPDATE_MENU_SUCCESS : (state , action) => {
            state.loading = false
            state.isUpdated = action.payload
            state.error = null
        },
        UPDATE_MENU_RESET: (state ,action) => {
            state.loading =false
            state.isUpdated = false

        },
        UPDATE_MENU_FAIL : (state , action) => {
            state.error = action.payload
            state.loading = false
        },
        CLEAR_ERRORS : (state , action) => {
            state.error = null
        }
    }
})

export const {ALL_MENU_REQUEST , ALL_MENU_SUCCESS , ALL_MENU_FAIL ,  ADMIN_MENU_REQUEST , ADMIN_MENU_SUCCESS , ADMIN_MENU_FAIL , CLEAR_ERRORS , CREATE_MENU_REQUEST , CREATE_MENU_SUCCESS , CREATE_MENU_FAIL , CREATE_MENU_RESET , DELETE_MENU_REQUEST , DELETE_MENU_SUCCESS , DELETE_MENU_FAIL , DELETE_MENU_RESET , UPDATE_MENU_REQUEST , UPDATE_MENU_SUCCESS , UPDATE_MENU_FAIL , UPDATE_MENU_RESET , MENU_DETAIL_REQUEST , MENU_DETAIL_SUCCESS , MENU_DETAIL_FAIL} = menuSlice.actions