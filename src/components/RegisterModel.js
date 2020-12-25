import React,{ Component} from "react";
import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    Form,
    FormGroup,
    Label,
    Input,
    NavLink
} from  "reactstrap";

import {connect} from 'react-redux';
import PropTypes from "prop-types";
class RegisterModel extends Component
{
    state={
        Modal:false,
        name:'',
        email:'',
        password:'',
        msg:null
    };

    static propTypes={
        IsAuthenticated:PropTypes.bool,
        error:PropTypes.object.isRequired
    }
    toggle=()=>
    {
        this.setState({Modal:!this.state.Modal});
    };
    onChange=e=>
    {
        this.setState({[e.target.name]:e.target.value});
    }

    onSubmit=e=>{
        e.preventDefault();
        this.toggle();
    }
    render()
    {
            return(
                    <div>
                        <NavLink onClick={this.toggle} href="#"> Register</NavLink>
                        <Modal isOpen={this.state.Modal} toggle={this.toggle}>
                            <ModalHeader toggle={this.toggle}>Register</ModalHeader>
                            <ModalBody>
                                <form onSubmit={this.onSubmit}>
                                    <FormGroup>
                                    <label for="name">name</label>
                                    <input type="text"
                                    name="name"
                                    id="name"
                                    placeholder="name"
                                    onChange={this.onChange}
                                    >
                                    </input>

                                    <label for="email">Email</label>
                                    <input type="text"
                                    name="email"
                                    id="email"
                                    placeholder="email"
                                    onChange={this.onChange}
                                    >
                                    </input>

                                    <label for="password">Password</label>
                                    <input type="password"
                                    name="password"
                                    id="password"
                                    placeholder="password"
                                    onChange={this.onChange}
                                    >
                                    </input>

                                    <Button color="dark" style={{marginTop:'2rem'}} block>Register</Button>
                                    </FormGroup>
                                </form>
                            </ModalBody>
                        </Modal>
                    </div>
            );
    }
}

const mapStateToProps=state=>({
    IsAuthenticated:state.auth.IsAuthenticated,
    error:state.error
});

export default connect(mapStateToProps,{})(RegisterModel)