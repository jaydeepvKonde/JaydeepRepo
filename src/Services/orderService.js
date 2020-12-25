import utility, { EncryptAESData } from "../util";

export const SavePaymentTransaction = (PaymentTransactionModel) => {
    const API_ENDPOINT = '/SaveTransactionDetails';
    
    const parameters = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer '+localStorage.getItem('token')
      },
      body: JSON.stringify(PaymentTransactionModel)
    };
  
    return fetch(API_ENDPOINT, parameters)
      .then(response => {
          console.log("response",response);
        return response.json();
      })
      .then(json => {
        console.log("json",json);
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