import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { GetUserByEmailID } from '../actions/userActions';
import '../Css/Profile.css'
 class UserProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
        user: null,
        categoryID:null,
      };
    }
  
  componentDidMount() {
    document.title = 'React Login';
    let CustomerID=localStorage.getItem("CustomerID");
    if(CustomerID!=null)
    {
      this.props.GetUserByEmailID(CustomerID);
    }
  }

  render() {
    return (
      
      <div className="container">
      
        <h3>User Profile</h3>
        {this.props.user &&(<form>
<div className="wrapper">
    <div className="left">
        <img src="/Userimage/WIN_20201205_10_47_34_Pro.jpg" 
        alt="user" width="100%"></img>
        <h4>{this.props.user.CustomerName}</h4>
    </div>
    <div className="right">
        <div className="info">
            <h3>Information</h3>
            <div className="info_data">
            <table className="tableInfo">
              <tr>
                <td><div className="data">
                      <h4>Email</h4>
                      <p>{this.props.user.EmailAddress}</p>
                    </div>
                </td>
                <td>
                    <div className="data">
                    <h4>Phone</h4>
                    <p>{this.props.user.MobileNo}</p>
                    </div>
                </td>
              </tr>
              <tr>
                <td><div className="data">
                      <h4>PinCode</h4>
                      <p>{this.props.user.PinCode}</p>
                    </div>
                </td>
                <td>
                    <div className="data">
                    <h4>Address</h4>
                    <p>{this.props.user.CustomerAddress}</p>
                    </div>
                </td>
              </tr>
              </table>   
             
            </div>
        </div>
    </div>
</div>
        </form>)}
      </div>
    );
  }
}

export default connect(
  (state) => ({ user: state.user.user.Data}),
  {
    GetUserByEmailID
  }
)(UserProfile);