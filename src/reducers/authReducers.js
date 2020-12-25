import { 
    USER_LOADING, 
    USER_LOADED, 
    LOGIN_SUCCESS, 
    REGISTER_SUCCESS,
    GET_ERRORS,
    CLEAR_ERRORS,
    AUTH_ERROR,
    LOGIN_FAIL,
    LOGOUT_SUCCESS,
    REGISTER_FAIL
} from "../actions/types";
import store from "../store";

const InitialState={
    token: localStorage.getItem('token'),
    IsAuthenticated:false,
    IsLoading:false,
    user:null
}

export const authReducer=(state=InitialState,action)=>
{
    switch(action.type)
    {
        case USER_LOADING:
            return{
                ...state,
                IsLoading:true
            };
        case USER_LOADED:
            return{
                ...state,
                IsAuthenticated:true,
                IsLoading:false,
                user:action.payload
            };

        case LOGIN_SUCCESS:
        case REGISTER_SUCCESS:
            localStorage.setItem('token', action.payload.token);
            return {
                ...state,
                ...action.payload,
                IsAuthenticated:true,
                IsLoading:false
            };

        case AUTH_ERROR:
        case LOGIN_FAIL:
        case LOGOUT_SUCCESS:
        case REGISTER_FAIL:
            localStorage.removeItem('token');
            return{
                ...state,
                token:null,
                user:null,
                IsAuthenticated:false,
                IsLoading:false
            };

        default:
            return false
            
    }
}