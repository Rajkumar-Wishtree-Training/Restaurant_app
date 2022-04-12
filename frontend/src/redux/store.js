import {configureStore} from "@reduxjs/toolkit"
import { menuSlice } from "./reducers/MenuSlice"
import { loginSlice , signUpSlice } from "./reducers/authSlice"

export default configureStore({
    reducer : {
        menuList : menuSlice.reducer,
        loginDetails : loginSlice.reducer,
        signUpDetails : signUpSlice.reducer,
        userDetails : signUpSlice.reducer
    }
})