import React, { Component } from "react";
import { connect } from "react-redux";
import store from "../store";
import { removeFromCart } from "../actions/cartActions";
import { createOrder, clearOrder } from "../actions/orderActions";
import {getCookie} from '../utils/cookies';
class Success extends Component {
    constructor(props) {
    super(props);
        console.warn("Prrorororo",props);
        console.warn(store.getState());
        this.GenerateOrder = this.GenerateOrder.bind(this);
        this.state = {
                        name: getCookie('name'),
                        email: getCookie('email'),
                        address: getCookie('address'),
                        customerID:"",
                        mobile:getCookie('phone'),
                        showCheckout: true,
                        Authenticated:true,
                        IsOpenLogin: false,
                        IsPaid:false
                    };
                    
    }
    componentDidMount() {
    window.addEventListener('load', this.GenerateOrder);
    }

 componentWillUnmount() { 
   window.removeEventListener('load', this.GenerateOrder)  
    }
     GenerateOrder =()=> {
    let CustomerID=localStorage.getItem("CustomerID");
    const order = {
      name: this.state.name,
      email: this.state.email,
      mobile: this.state.mobile,
      address: this.state.address,
      customerID:CustomerID,
      cartItems: this.props.cartItems,
      total: this.props.cartItems.reduce((a, c) => a + c.DiscountedPrice * c.count, 0),
      txnId:"",//PaymentTransactionModel.txnid
    };
    
    this.props.createOrder(order);

  };
  RedirectHome=()=>
  {
      window.location.pathname = '/';
  }
     render() {
    //{this.GenerateOrder()}
    const { cartItems, order } = this.props;
    return (<div>{order && (<div className="order-details">
                <h3 className="success-message">Your order has been placed.</h3>
                <h2>Order {order._id}</h2>
                <ul>
                  <li>
                    <div>Name:</div>
                    <div>{order.name}</div>
                  </li>
                  <li>
                    <div>Email:</div>
                    <div>{order.email}</div>
                  </li>
                  <li>
                    <div>Address:</div>
                    <div>{order.address}</div>
                  </li>
                  <li>
                    <div>Date:</div>
                    <div>{Date}</div>
                  </li>
                  <li>
                    <div>Total:</div>
                    <div>{order.total}</div>
                  </li>
                  <li>
                    <div>Cart Items:</div>
                    <div>
                      {order.CartItems.map((x) => (
                        <div>
                          {x.count} {" x "} {x.title}
                        </div>
                      ))}
                    </div>
                  </li>
                </ul>
                <button class="button primary" onClick={this.RedirectHome}>Okay</button>
              </div>)}</div>)
     }
}
export default connect(
  (state) => ({
    order: state.order.order,
    cartItems: state.cart.cartItems,
  }),
  { removeFromCart, createOrder, clearOrder }
)(Success);