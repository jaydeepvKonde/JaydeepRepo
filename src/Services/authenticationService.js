import utility, { EncryptAESData } from "../util";

export const registerUserService = (request) => {
    const REGISTER_API_ENDPOINT = 'http://localhost:3000/api/v1/register';
    
    const parameters = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(request.user)
    };
  
    return fetch(REGISTER_API_ENDPOINT, parameters)
      .then(response => {
        return response.json();
      })
      .then(json => {
        return json;
      });
  };
  
  export const loginUserService = (request) => {

    const LOGIN_API_ENDPOINT = '/token';
    const LoginReqest="username="+request.email+"&password="+EncryptAESData(request.password)+"&grant_type=password";
    const parameters = {
      method: 'POST',
      headers: {
        'Content-Type':'x-www-form-urlencoded',
      },
      body: LoginReqest
    };
  
    return fetch(LOGIN_API_ENDPOINT, parameters)
      .then(response => {
        console.log("response"+JSON.stringify(response));
        return response.json();
      })
      .then(json => {
        console.log("json"+JSON.stringify(json));
        return json;
      });
  };