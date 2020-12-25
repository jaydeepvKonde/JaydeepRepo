import $ from 'jquery';
import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { GetUserByEmailID,UpdateProfileDetailByCustomerID } from '../actions/userActions';
import '../Css/Profile.css';
class UserProfileEdit extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      picture: false,
      src: false,
      CustomerName: '',  
      MobileNo: '',  
      CustomerAddress: '',
      PinCode:''
    }

    this.CustomerName = this.CustomerName.bind(this);  
    this.MobileNo = this.MobileNo.bind(this);
    this.CustomerAddress = this.CustomerAddress.bind(this);    
    this.City = this.City.bind(this);  
    this.PinCode = this.PinCode.bind(this);
    this.ProfileImagePath=this.ProfileImagePath.bind(this);
    this.UpdateUserDetail = this.UpdateUserDetail.bind(this);  
  }
  MobileNo(event) {  
    this.setState({ MobileNo: event.target.value })  
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
  ProfileImagePath(event) {  
    this.setState({ ProfileImagePath: event.target.value })  
  } 
  componentDidMount() {
    document.title = 'React Login';
    let CustomerID=localStorage.getItem("CustomerID");
    if(CustomerID!=null)
    {
      this.props.GetUserByEmailID(CustomerID);
    }
  }
  UpdateUserDetail=(event)=>{
    let CustomerID=localStorage.getItem("CustomerID");
    let data={
        CustomerID:CustomerID,
        CustomerName: this.state.CustomerName,  
        MobileNo: this.state.MobileNo,
        CustomerAddress:this.state.CustomerAddress,
        PinCode: this.state.PinCode,  
        ProfileImagePath:this.state.ProfileImagePath,
    }
    //alert(JSON.stringify(data));
    this.props.UpdateProfileDetailByCustomerID(data);
  }
  handlePictureSelected(event) {
    var picture = event.target.files[0];
    var src     = URL.createObjectURL(picture);

    this.setState({
      picture: picture,
      src: src
    });
  }

  renderPreview() {
    if(this.state.src) {
      return (
        <img src={this.state.src} className="imgPreview"/>
      );
    } else {
      return (
        <p>
          No Preview
        </p>
      );
    }
  }

  upload() {
    var formData = new FormData();

    formData.append("file", this.state.picture);

    $.ajax({
      url: "/PostUserImage",
      method: "POST",
      data: formData,
      cache: false,
      contentType: false,
      processData: false,
      success: function(response) {
        alert(JSON.stringify(response));
      }
    });
  }

  render() {
    return (
      <form><div>
        <h5>Picture Uploader</h5>
        <input
          type="file"
          onChange={this.handlePictureSelected.bind(this)}
        />
        <br/>
        <div className="dvPreview">
        {this.renderPreview()}
        </div>
        <hr/>
        <button
          onClick={this.upload.bind(this)}
        >
          Upload
        </button>
         {this.props.user &&(<div><div>
           <label htmlfor="name"><b>Name</b></label>
           <input type="text" name="txtCustName" onChange={this.CustomerName} defaultValue={this.props.user.CustomerName} placeholder="Customer Name" />
           <br/>
           <label htmlfor="email"><b>Email Address</b></label>
           <input type="text" name="txtEmail" onChange={this.EmailAddress} defaultValue={this.props.user.EmailAddress} placeholder="Email" />
          </div>
          
          <label htmlfor="pincode"><b>Pin Code</b></label>
          <input type="text"  onChange={this.PinCode} defaultValue={this.props.user.PinCode} placeholder="Pin Code" />

          <label htmlfor="mobileno"><b>Mobile No</b></label>
          <input type="text"  onChange={this.MobileNo} defaultValue={this.props.user.MobileNo} placeholder="Mobile No" />  

          <label htmlfor="custAdd"><b>Address</b></label>
          <input type="text"  onChange={this.CustomerAddress} defaultValue={this.props.user.CustomerAddress} placeholder="Address" /></div>)}
          <button type="button" className="registerbtn" onClick={this.UpdateUserDetail}>Register</button>
      </div></form>
            
    );
  }
}
export default connect(
  (state) => ({ user: state.user.user.Data}),
  {
    GetUserByEmailID,
    UpdateProfileDetailByCustomerID
  }
)(UserProfileEdit);