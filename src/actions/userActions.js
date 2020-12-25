// Action Creators
import utility, { EncryptAESData,DecryptAESData } from "../util";
import {setCookie} from '../utils/cookies';
import {SET_USER_PROFILE,UPDATE_USER_PROFILE} from '../actions/types';
const setUser = (payload) => ({ type: "SET_USER", payload})

export const logUserOut = () => ({type: "LOG_OUT"})

// Methods

export const fetchUser = (userInfo) => dispatch => {
    const LoginReqest="username="+userInfo.username+"&password="+EncryptAESData(userInfo.password)+"&grant_type=password";
    fetch(`/token`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: LoginReqest//JSON.stringify(userInfo)
    })
    .then(res => res.json())
    .then(data => {
        // data sent back will in the format of
        // {
        //     user: {},
        //.    token: "aaaaa.bbbbb.bbbbb"
        // }
        if(data.error==='undefined' || data.error==='')
        {
            console.log("token",data);
            localStorage.setItem("token", data.access_token);
            localStorage.setItem("CustomerID", data.CustomerID);
            setCookie('token',data.access_token,1);
            setCookie('email',data.EmailAddress,1);
            setCookie('phone',data.mobile,1);
            setCookie('name',data.CustomerName,1);
            setCookie('address',data.CustomerAddress,1);
            setCookie('authenticate',true,1);
            localStorage.setItem('IsAuthenticated','Yes');
            localStorage.setItem("User:", JSON.stringify(data) )
            // dispatch(setUser(data));
            dispatch({ type: 'SET_USER', payload: data });
            // eslint-disable-next-line no-restricted-globals
            location.href="/";
        }
        
    })
}

export const signUserUp = (userInfo) => dispatch => {
    fetch(`http://localhost:4000/users`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify(userInfo)
    })
    .then(res => res.json())
    .then(data => {
        // data sent back will in the format of
        // {
        //     user: {},
        //.    token: "aaaaa.bbbbb.bbbbb"
        // }
        localStorage.setItem("token", data.token)
        
        dispatch(setUser(data.user))
    })
}

export const autoLogin = () => dispatch => {
    fetch(`http://localhost:4000/auto_login`, {
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("token")}`
        }
    })
    .then(res => res.json())
    .then(data => {
        // data sent back will in the format of
        // {
        //     user: {},
        //.    token: "aaaaa.bbbbb.bbbbb"
        // }
        localStorage.setItem("token", data.token)
        dispatch(setUser(data))
    })
}

export const GetUserByEmailID=(CustomerID)=>dispatch=>{
    //console.log("CustomerID"+DecryptAESData(CustomerID));
    fetch(`/GetProfileDetails?CustID=`+CustomerID, {
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            //"Authorization": `Bearer ${localStorage.getItem("token")}`
        }
    })
    .then(res => res.json())
    .then(data => {
        dispatch({ type: SET_USER_PROFILE, payload: data})
    })
}

export const UpdateProfileDetailByCustomerID=(data)=>dispatch=>{
    //console.log("CustomerID"+DecryptAESData(CustomerID));
    
    fetch(`/UpdateProfileDetails`, {
        method: 'PUT',
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            //"Authorization": `Bearer ${localStorage.getItem("token")}`
        },
        body: JSON.stringify(data),
    })
    .then(res => res.json())
    .then(data => {
        dispatch({ type: UPDATE_USER_PROFILE, payload: data})
    })
}