import axios from "axios";
import { LOGIN_FAIL, LOGIN_REQUEST, LOGIN_SUCCESS ,CLEAR_ERRORS, SIGN_UP_REQUEST, SIGN_UP_SUCCESS, SIGN_UP_FAIL, LOAD_USER_REQUEST, LOAD_USER_SUCCESS, LOAD_USER_FAIL, LOGOUT_REQUEST, LOGOUT_FAIL, LOGOUT_SUCCESS, GMAIL_LOGIN_REQUEST, GMAIL_LOGIN_SUCCESS, GMAIL_LOGIN_FAIL } from "../reducers/authSlice";

export const loginUser = (data) =>async (dispatch) => {
    dispatch(LOGIN_REQUEST())
    try {
        let link = `http://localhost:4000/api/v1/login`
        const response = await axios.post(link,{...data},{withCredentials : true})
        // console.log({...response.data.user});
        dispatch(LOGIN_SUCCESS(response.data.user))

    } catch (error) {
        dispatch(LOGIN_FAIL(error.response.data.error))
    }
}

export const gmailLogin = (res) => async(dispatch) => {
    try {
        dispatch(GMAIL_LOGIN_REQUEST())
        const link = 'http://localhost:4000/api/v1/gmail/login'
        const {data} = await axios.post(link , {token : res.tokenId} , {withCredentials : true})
        // console.log(data);
        dispatch(GMAIL_LOGIN_SUCCESS(data.user))
    } catch (error) {
        dispatch(GMAIL_LOGIN_FAIL(error.response.data.error))
    }
}

export const signUpUser = (data) => async (dispatch) => {
    dispatch(SIGN_UP_REQUEST())
    try {
        let link = `http://localhost:4000/api/v1/register`
        const config = { headers: { "Content-Type": "application/json" } };
        const response = await axios.post(link , {...data},{config , withCredentials:true})
        // console.log(response);
        dispatch(SIGN_UP_SUCCESS(response.data.user))

    } catch (error) {
        dispatch(SIGN_UP_FAIL(error.response.data.error))
    }
}

export const loadUser = () => async (dispatch) => {
    try {
        dispatch(LOAD_USER_REQUEST())
        const config = { headers: { "Content-Type": "application/json" } };
        let link = `http://localhost:4000/api/v1/me`
        const {data} = await axios.get(link,{config, withCredentials:true})
        // console.log(data);
        dispatch(LOAD_USER_SUCCESS(data.user))
    } catch (error) {
        // console.log(error.response);
        dispatch(LOAD_USER_FAIL(error.response.data.error))
    }
}

export const logoutUser = () => async (dispatch) => {
    try {
        dispatch(LOGOUT_REQUEST())
        const config = { headers: { "Content-Type": "application/json" } };
        let link = `http://localhost:4000/api/v1/logout`
         await axios.get(link , {config , withCredentials : true})
        // console.log(message);
        dispatch(LOGOUT_SUCCESS())
    } catch (error) {
        dispatch(LOGOUT_FAIL(error.response.data.error))
    }
}

//Clearing Errors
export const clearErrors = () => (dispatch) =>{
    dispatch(CLEAR_ERRORS())
}