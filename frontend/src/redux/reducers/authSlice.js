import { createSlice } from "@reduxjs/toolkit";

export const loginSlice = createSlice({
    name : 'login',
    initialState : {
        data : {},
        loading : false,
        isAuthenticated:false,
        error : null
    },
    reducers:{
        
    }
})
export const signUpSlice = createSlice({
    name : 'signUp',
    initialState : {
        data : {},
        loading :false,
        isAuthenticated : false,
        error : null
    },
    reducers:{
        SIGN_UP_REQUEST:(state , action) => {
            state.loading = true
        },
        SIGN_UP_SUCCESS : (state, action) =>{
            state.loading = false
            state.data = action.payload
            state.isAuthenticated = true
            
        },
        SIGN_UP_FAIL : (state , action) => {
            state.loading = false
            state.error = action.payload
        },
        LOAD_USER_REQUEST : (state , action) => {
            state.loading = true
        },
        LOAD_USER_SUCCESS : (state , action) => {
            state.loading = false
            state.data = action.payload
            state.isAuthenticated = true
        },
        LOAD_USER_FAIL: (state , action) => {
            state.loading = false
        },
        LOGOUT_REQUEST : (state , action) => {
            state.loading = true
        },
        LOGOUT_SUCCESS : (state, action) => {
            state.loading = false
            state.isAuthenticated = false
        },
        LOGOUT_FAIL : (state , action) => {
           state.loading = false
           state.error = action.payload
        },
        LOGIN_REQUEST:(state , action) => {
            state.loading = true
        },
        LOGIN_SUCCESS : (state, action) =>{
            state.loading = false
            state.data = action.payload
            state.isAuthenticated = true
            
        },
        LOGIN_FAIL : (state , action) => {
            state.loading = false
            state.error = action.payload
        },
        CLEAR_ERRORS : (state , action) => {
            state.error = null
        }
    }

})
// export const { , CLEAR_ERRORS} = loginSlice.actions

export const {LOGIN_REQUEST , LOGIN_SUCCESS , LOGIN_FAIL , CLEAR_ERRORS , SIGN_UP_REQUEST , SIGN_UP_SUCCESS , SIGN_UP_FAIL , LOAD_USER_REQUEST , LOAD_USER_SUCCESS , LOAD_USER_FAIL , LOGOUT_REQUEST , LOGOUT_SUCCESS , LOGOUT_FAIL } = signUpSlice.actions