import React,{Component} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import
{
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    Container
}
from "reactstrap";
import RegisterModel from "./RegisterModel";
class AppNavbar extends Component
{
    state={
        isOpen:false
    };
    toggle=()=>
    {
        this.setState({
            isOpen:!this.state.isOpen
        });
    }

    render()
    {
        return(
            <div>
                <Navbar color='dark' dark expand='sm' className="mb-5">
                <Container>
                    <NavbarBrand>Shopping</NavbarBrand>
                    <NavbarToggler onClick={this.toggle}></NavbarToggler>
                    <Collapse isOpen={this.state.isOpen} navbar>
                        <Nav className='ml-auto' navbar>
                            <NavItem>
                                <RegisterModel></RegisterModel>
                            </NavItem>
                        </Nav>
                    </Collapse>
                </Container>
                </Navbar>
            </div>
        )
    }
}
export default AppNavbar;