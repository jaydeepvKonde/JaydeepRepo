  import React from 'react';
  import HomeScreen from "../screens/HomeScreen";
  import LoginScreen from "../screens/LoginScreen";
  import RegistrationScreen from "../screens/RegistrationScreen";
  import AdminScreen from "../screens/AdminScreen";
  import Success from "../components/Success";
  import UserProfile from "../components/UserProfile";
  import UserProfileEdit from "../components/UserProfileEdit";
  import Demo from "../components/Demo";
  import Modal from "react-modal";
  import {
    BrowserRouter as Router,
    Switch,
    Route,
    useParams,
  } from "react-router-dom";
  import { Navbar,Nav,NavDropdown,Form,FormControl,Button } from 'react-bootstrap';
  import { connect } from "react-redux";
  import { filterProducts, sortProducts,filterByCategory } from "../actions/productActions";
  class BootstrapNavbar extends React.Component {
    constructor(props) {
      super(props);
      let IsLoggedIn="No";
      let TypeOfUser="";
      IsLoggedIn=localStorage.getItem("IsAuthenticated");
      TypeOfUser=localStorage.getItem("TypeOfUser");
      console.log("IsLoggedIn",IsLoggedIn);
      
      this.state = {
        IsOpenLogin: false,
        IsOpenRegistration:false,
        IsLoggedInqq:IsLoggedIn,
        UserType:TypeOfUser
      };
    }
    
    onClickHandler = event => {
      const CateoryID = event.target.id;
      this.props.filterByCategory(this.props.products,CateoryID)
    }
    openModal = () => {
      this.setState({ IsOpenLogin:true });
    };
    closeModal = () => {
      this.setState({ IsOpenLogin: false });
    };
    openModalRegistration = () => {
      this.setState({ IsOpenRegistration:true });
    };
    closeModalRegistration = () => {
      this.setState({ IsOpenRegistration: false });
    };
    Logout=()=>
    {
      localStorage.removeItem("token");
      localStorage.removeItem("IsAuthenticated");
      localStorage.removeItem("CustomerID");
      window.location.href="/Login";
    }
    
    render(){
        return(
             <div>
             
                <div className="row">
                    <div className="col-md-12">
                    
                        <Router>
                            <Navbar bg="dark" variant="dark" expand="lg" sticky="top">
                                <Navbar.Brand href="#home">React Bootstrap Navbar</Navbar.Brand>
                                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                                <Navbar.Collapse id="basic-navbar-nav">
                                    {this.state.IsLoggedInqq=='Yes' &&(<Nav className="mr-auto">
                                    <Nav.Link href="/">Home</Nav.Link>
                                    
                                    <NavDropdown title="Category" id="basic-nav-dropdown">
                                        <NavDropdown.Item onClick={this.onClickHandler} id='1'>Polo neck T Shirt</NavDropdown.Item>
                                        <NavDropdown.Item onClick={this.onClickHandler} id="2">Basic Tees</NavDropdown.Item>
                                        <NavDropdown.Item onClick={this.onClickHandler} id="3">Graphics Tees</NavDropdown.Item>
                                        <NavDropdown.Item onClick={this.onClickHandler} >Formal TShirts</NavDropdown.Item>
                                        <NavDropdown.Item href="#action/3.6">Casual TShirts</NavDropdown.Item>
                                        <NavDropdown.Item href="#action/3.7">Stretch jeans</NavDropdown.Item>
                                        <NavDropdown.Item href="#action/3.8">Cotton Trousers</NavDropdown.Item>
                                        <NavDropdown.Item href="#action/3.9">Formal Trousers</NavDropdown.Item>
                                        <NavDropdown.Item href="#action/3.10">Strech Ankle Trousers</NavDropdown.Item>
                                    </NavDropdown>
                                    </Nav>)}
        {this.state.IsLoggedInqq!="Yes" &&(<Nav.Link href="/Login">Login</Nav.Link>) }
        {this.state.IsLoggedInqq!="Yes" &&(<Nav.Link href="/Register">Register</Nav.Link>)}
        {this.state.IsLoggedInqq=="Yes" &&(<Nav.Link onClick={this.Logout}>Logout</Nav.Link>)}
        {this.state.IsLoggedInqq=="Yes" && this.state.UserType=="Admin" &&(<Nav.Link href="/Order">Order</Nav.Link>)}
                                    {/* <Form inline>
                                    <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                                    <Button variant="outline-success">Search</Button>
                                    </Form> */}
                                </Navbar.Collapse>
                            </Navbar>
                            <br />
                            <Switch>
                            <Route path="/" component={HomeScreen} exact />
                            <Route path="/Register" component={RegistrationScreen} />
                            <Route path="/Login" component={LoginScreen} /> 
                            <Route path="/Order" component={AdminScreen} />
                            <Route path="/Success" component={Success} />
                            <Route path="/Profile" component={UserProfile} />
                            <Route path="/ProfileEdit" component={UserProfileEdit} />
                            
                            </Switch>
                        </Router>
                        
                        <footer>All right is reserved.</footer>
                    </div>
                </div>
                { this.state.IsOpenLogin &&  <Modal backdrop="static" keyboard={false} className="LoginModel" ariaHideApp={false} isOpen={true} onRequestClose={this.closeModal}>
                        <button className="CloseModel" onClick={this.closeModal}>x</button> <LoginScreen/></Modal> }

                        { this.state.IsOpenRegistration &&  <Modal backdrop="static" keyboard={false} className="RegistartionModel" isOpen={true} onRequestClose={this.closeModalRegistration}>
                        <button className="CloseModel" onClick={this.closeModalRegistration}>x</button> <RegistrationScreen/></Modal> }
                        
            </div>
           
        )  
    }
  }

  export default connect(
    (state) => ({
      products: state.products.items,
      categoryid:state.products.categoryid,
    }),
    {
      filterProducts,
      filterByCategory,
    }
  )(BootstrapNavbar);
 