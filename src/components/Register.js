import React, { Component } from 'react';  

import {withRouter} from 'react-router';

import { EncryptAESData } from "../util";
import "../Registration.css"
class Register extends Component {  
  
  constructor(props) {  
    super(props);  
  
    this.state = {  
    CustomerName: '',  
    EmailAddress: '',  
    ConfirmPassword:'',
    MobileNo: '',  
    Password: '',  
    CustomerAddress: '',
    PinCode:''
    }  
  
     
    this.EmailAddress = this.EmailAddress.bind(this);  
    this.Password = this.Password.bind(this);  
    this.ConfirmPassword = this.ConfirmPassword.bind(this);  
    this.CustomerName = this.CustomerName.bind(this);  
    this.MobileNo = this.MobileNo.bind(this);
    this.CustomerAddress = this.CustomerAddress.bind(this);    
    this.City = this.City.bind(this);  
    this.PinCode = this.PinCode.bind(this);
    this.register = this.register.bind(this);  
  }  
  
  
  
  EmailAddress(event) {  
    this.setState({ EmailAddress: event.target.value })  
  }  
  
  MobileNo(event) {  
    this.setState({ MobileNo: event.target.value })  
  }  
  
  Password(event) {  
    this.setState({ Password: event.target.value });
    
  }  
  ConfirmPassword(event) {  
    this.setState({ ConfirmPassword: event.target.value })  
  }  
  City(event) {  
    this.setState({ City: event.target.value })  
  }  
  PinCode(event) {  
    this.setState({ PinCode: event.target.value })  
  }  
  CustomerName(event) {  
    this.setState({ CustomerName: event.target.value })  
  }  
  CustomerAddress(event) {  
    this.setState({ CustomerAddress: event.target.value })  
  }  
  
  register(event) { 
    console.log("Before Registore"+this.state.ConfirmPassword); 
    fetch('/Register', {  
      method: 'post',  
      headers: {  
        'Accept': 'application/json',  
        'Content-Type': 'application/json'  
      },  
      body: JSON.stringify({  
  
        CustomerName: this.state.CustomerName,  
        Password: EncryptAESData(this.state.Password),  
        EmailAddress: this.state.EmailAddress,  
        City: this.state.City,  
        PinCode: this.state.PinCode,  
        MobileNo: this.state.MobileNo,
        CustomerAddress:this.state.CustomerAddress
      })  
    }).then((Response) => Response.json())  
      .then((Result) => {  
        console.log("Result"+JSON.stringify(Result));
        if (Result.Status === 200) 
        {
               console.log('Tested');
              alert("Please Login Now");
               window.location.pathname = '/';
                
              } 
        else  
          alert('Sorrrrrry !!!! Un-authenticated User !!!!!')  
      })  
  }  
  
  render() {  

    return (  
      // <div className="app flex-row align-items-center">  
      //   <Container>  
      //     <Row className="justify-content-center">  
      //       <Col md="10" lg="10" xl="10">  
      //         <Card className="mx-4">  
      //           <CardBody className="p-4">  
      //             <Form>  
      //               <div className="row mb-2 pageheading">  
      //                 <div className="col-sm-12 btn btn-primary">  
      //                   Sign Up  
      //                   </div>  
      //               </div>  
      //               <InputGroup className="mb-3">  
      //                 <Input type="text"  onChange={this.CustomerName} placeholder="Name" required />  
      //               </InputGroup>  
      //               <InputGroup className="mb-3">  
      //                 <Input type="text"  onChange={this.EmailAddress} placeholder="Email Address" required type="email" />  
      //               </InputGroup>  
      //               <InputGroup className="mb-3">  
      //                 <Input type="password"  onChange={this.Password} placeholder="Password" />  
      //               </InputGroup>  
      //               <InputGroup className="mb-3">  
      //                 <Input type="password"  onChange={this.ConfirmPassword} placeholder="Confirm Password" />  
      //               </InputGroup>  
      //               <InputGroup className="mb-4">  
      //                 <Input type="text"  onChange={this.City} placeholder="City" />  
      //               </InputGroup>  
      //               <InputGroup className="mb-4">  
      //                 <Input type="text"  onChange={this.PinCode} placeholder="Pin Code" />  
      //               </InputGroup>
      //               <InputGroup className="mb-4">  
      //                 <Input type="text"  onChange={this.MobileNo} placeholder="MobileNo" />  
      //               </InputGroup>  
      //               <InputGroup className="mb-3">  
      //                 <Input type="text"  onChange={this.CustomerAddress} placeholder="Address" />  
      //               </InputGroup>  
      //               <Button  onClick={this.register}  color="success" block>Create Account</Button>  
      //             </Form>  
      //           </CardBody>  
      //         </Card>  
      //       </Col>  
      //     </Row>  
      //   </Container>  
      // </div>  
  <form >
  <div class="container">
    <h1>Register</h1>
    <p>Please fill in this form to create an account.</p>
    <hr/>
    <label for="CustomerName"><b>Customer Name</b></label>
     <input type="text" name="CustName" onChange={this.CustomerName} placeholder="Customer Name" required />

    <label for="email"><b>Email</b></label>
    <input type="text"  onChange={this.EmailAddress} placeholder="Email Address" name="email" required type="email" />  
    <br/>
    <label for="psw"><b>Password</b></label>
    <input type="password" placeholder="Enter Password" name="psw" id="psw" required />

    <label for="psw-repeat"><b>Repeat Password</b></label>
    <input type="password" placeholder="Repeat Password" name="psw-repeat" id="psw-repeat" required/>

    <label for="city"><b>City</b></label>
    <input type="text"  onChange={this.City} placeholder="City" name="city" id="city"/>  

    <label for="pincode"><b>Pin Code</b></label>
    <input type="text"  onChange={this.PinCode} placeholder="Pin Code" />

    <label for="mobileno"><b>Mobile No</b></label>
    <input type="text"  onChange={this.MobileNo} placeholder="Mobile No" />  

    <label for="custAdd"><b>Address</b></label>
    <input type="text"  onChange={this.CustomerAddress} placeholder="Address" />  
    <hr/>
    <p>By creating an account you agree to our <a href="#">Terms & Privacy</a>.</p>

    <button type="submit" class="registerbtn" onClick={this.register}>Register</button>
  </div>
  
  <div class="container signin">
    <p>Already have an account? <a href="#">Sign in</a>.</p>
  </div>
</form>
    );  
  }  
}  
export default withRouter(Register)
//export default Register; 