

import React, { Component } from 'react';  
import { Button, Card, CardBody, CardGroup, Col, Container, Form, Input, InputGroup, InputGroupAddon, InputGroupText, Row } from 'reactstrap';  
import {withRouter, Route } from 'react-router';
import history from "../components/history";
import Modal from "react-modal";
import { Redirect } from "react-router-dom";
import CryptoJS from "../../node_modules/crypto-js/crypto-js";
import utility, { EncryptAESData } from "../util";
const cfg = {
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7
  };
export class Login extends Component {  
    constructor(props) {  
        super(props);  
  
        this.state = {  
            Email: '',  
            Password: ''  
        }  
  
        this.Password = this.Password.bind(this);  
        this.Email = this.Email.bind(this);  
        this.login = this.login.bind(this);  
    }  
  
    Email(event) {  
        this.setState({ Email: event.target.value })  
    }  
    Password(event) {  
        this.setState({ Password: event.target.value })  
    }  
    login(event) {  
     console.log("Before:"+this.state.Password);
     
    const LoginReqest="username="+this.state.Email+"&password="+EncryptAESData(this.state.Password)+"&grant_type=password";
    
    console.log("Try Login"+ LoginReqest);
        fetch('/token', {  
            method: 'post',  
           'Content-Type':'x-www-form-urlencoded',
            
            body: LoginReqest
        }).then((Response) => Response.json())  
            .then((result) => {  
                console.log(result);  
                if (result.error === 'invalid_grant')  
                    alert('Invalid User');  
                else  
                {
                    //this.props.history.push("/Dashboard");
                    localStorage.setItem("token",result.access_token);
                    localStorage.setItem("IsAuthenticated",result.IsAuthenticated);
                    localStorage.setItem("CustomerID",result.CustomerID);
                    localStorage.setItem("TypeOfUser",result.TypeOfUser);
                    window.location.pathname = '/';
                  //return <Redirect to="/Register" />;
                }
            })  
    }  
  
    render() {  
  
        return (  
             <div className="app flex-row align-items-center"> 
              <br></br> 
                 <Container>  
                     <Row className="justify-content-center Login">  
                         <Col md="10" lg="10" xl="10">  
  
                             <CardGroup>  
                                 <Card className="p-2">  
                                     <CardBody>  
                                         <Form>  
                                             <div className="row" className="mb-2 pageheading">  
                                                 <div className="col-sm-12 btn btn-primary">  
                                                     Login  
                              </div>  
                                             </div>  
                                             <InputGroup className="mb-3">  
  
                                                 <Input type="text" onChange={this.Email} placeholder="Enter Email" />  
                                             </InputGroup>  
                                             <InputGroup className="mb-4">  
  
                                                 <Input type="password" onChange={this.Password} placeholder="Enter Password" />  
                                             </InputGroup>  
                                             <Button onClick={this.login} color="success" block>Login</Button>  
                                         </Form>  
                                     </CardBody>  
                                 </Card>  
                            </CardGroup>  
                         </Col>  
                     </Row>  
                 </Container>  
             </div>  
        );  
    }  
}  
//export default withRouter(Login) 
