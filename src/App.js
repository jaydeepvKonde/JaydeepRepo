import React from "react";
import store from "./store";
import { Provider } from "react-redux";
import { Router , Route, Link , useHistory, Switch } from "react-router-dom";
import HomeScreen from "./screens/HomeScreen";
import AdminScreen from "./screens/AdminScreen";
import LoginScreen from "./screens/LoginScreen";
import RegistrationScreen from "./screens/RegistrationScreen";
import history from "./components/history";
import BootstrapNavbar from "./components/BootstrapNavbar";
import AppNavbar from "./components/AppNavbar";
import LoginComponent from './components/LoginComponent';

class App extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = { IsLoggedIn: true };
    this.events = [
      "load",
      "mousemove",
      "mousedown",
      "click",
      "scroll",
      "keypress"
    ];

    //this.warn = this.warn.bind(this);
    this.logout = this.logout.bind(this);
    this.resetTimeout = this.resetTimeout.bind(this);

    for (var i in this.events) {
      window.addEventListener(this.events[i], this.resetTimeout);
    }

    this.setTimeout();
  }

  clearTimeout() {
    if (this.warnTimeout) clearTimeout(this.warnTimeout);

    if (this.logoutTimeout) clearTimeout(this.logoutTimeout);
  }

  setTimeout() {
    //this.warnTimeout = setTimeout(this.warn, 16 * 1000);

    this.logoutTimeout = setTimeout(this.logout, 30 * 10000);
  }

  resetTimeout() {
    this.clearTimeout();
    this.setTimeout();
  }

  // warn() {
  //   alert("You will be logged out automatically in 1 minute.");
  // }

  logout() {
    // Send a logout request to the API
    console.log("Sending a logout request to the API...");
    this.setState({ IsLoggedIn: false });
      localStorage.removeItem("token");
      localStorage.removeItem("IsAuthenticated");
      localStorage.removeItem("CustomerID");
      window.location.href="/Login";
    // this.destroy(); // Cleanup
  }

  destroy() {
    this.clearTimeout();

    for (var i in this.events) {
      window.removeEventListener(this.events[i], this.resetTimeout);
    }
  }
  render() {
    
    return (
      <Provider store={store}>
        <Router history={history} basename="/">
          <div className="grid-container">
          {/* <AppNavbar></AppNavbar> */}
          
            <BootstrapNavbar></BootstrapNavbar>
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
