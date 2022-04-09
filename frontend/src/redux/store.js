import {configureStore} from "@reduxjs/toolkit"
import { menuSlice } from "./reducers/MenuSlice"

export default configureStore({
    reducer : {
        menuList : menuSlice.reducer
    }
})