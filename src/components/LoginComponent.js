import React, { useState } from 'react'
import {connect} from 'react-redux'
import {fetchUser} from '../actions/userActions'
import store from "../store";
import { Link, Redirect } from 'react-router-dom';
import "../login.css"
class LoginComponent extends React.Component {
    state = {
        username: "",
        password: "",
        IsLoggedIn:false,
        Message:""
    }

    handleOnChange = (e) => {
        e.persist();
        this.setState(() => ({
            [e.target.name]: e.target.value 
        }))
    }

    onSubmit = (e) => {
        e.preventDefault()
        this.props.fetchUser(this.state)
        let UserState=store.getState();
        console.log("UserState",UserState.user["loggedIn"]);
        alert(JSON.stringify(this.state));
        this.state.IsLoggedIn=UserState.user["loggedIn"];
        
        
    }

    render(){
        
        return(
            
            <div className="Login">
                <h1>Login Form</h1>
                
                {!this.state.IsLoggedIn ? <div>{this.state.Message}</div> : <Redirect to='/' />}
                <form onSubmit={this.onSubmit}>
                    <div class="imgcontainer">
                        <img src="img_avatar2.png" alt="Avatar" class="avatar"/>
                    </div>
                    <input 
                        type="text" 
                        name="username" 
                        placeholder="Username" 
                        value={this.state.username}
                        onChange={this.handleOnChange}
                        className="username"
                    />
                    <br/>
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={this.state.password}
                        onChange={this.handleOnChange}
                    />
                    <br/>
                    <input
                        type="submit"
                        value="Login"
                    />
                </form>
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    console.log("AAAA",state);
    return {
      userReducer: state.userReducer
    }
  }
const mapDispatchToProps = (dispatch) => {
    return {
        fetchUser: (userInfo) => dispatch(fetchUser(userInfo))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginComponent)