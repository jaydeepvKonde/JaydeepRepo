import * as types from './types';
import {loginUserService} from '../Services/authenticationService';
export const registerUserAction = (user) => {
  return {
    type: types.REGISTER_USER,
    user
  }
};

export const loginUserAction = (user) => {
  //user=loginUserService(user);
  console.log("Login User:"+JSON.stringify(user));
  
  return {
    type: types.LOGIN_USER,
    user
  }
};