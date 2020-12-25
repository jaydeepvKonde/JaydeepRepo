import { USER_LOADING, USER_LOADED, LOGIN_SUCCESS, REGISTER_SUCCESS, AUTH_ERROR } from "../actions/types";
import {returnErrors, returnError } from './errorActions'
export const  loadUser=()=>(dispatch,getState)=> {
    dispatch({ type:USER_LOADING});

    const token=getState().auth.token;
    const config={
        headers:{
            "Content-type":"application/json"
        },
        //body:{"EmailID":}
    };

    if(token)
    {
        config.headers['Authorization']='Bearer '+token;
    }
    
    fetch("/User")
      .then((res) => res.json())
      .then((data) => {
        dispatch({ type: USER_LOADED, payload: data });
      })
      .catch(err=>{
          dispatch(returnError(err.response.data,err.response.status));
          dispatch({type:AUTH_ERROR})
      })
}
