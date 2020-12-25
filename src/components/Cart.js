import React, { Component } from "react";
import formatCurrency,{formatNumber} from "../util";
import Fade from "react-reveal/Fade";
import { connect, useDispatch } from "react-redux";
import Modal from "react-modal";
import Zoom from "react-reveal/Zoom";
import { removeFromCart } from "../actions/cartActions";
import { createOrder, clearOrder } from "../actions/orderActions";
import {Link } from "react-router-dom";
import LoginScreen from "../screens/LoginScreen";
import { json } from "body-parser";
import store from "../store";
import {getCookie} from '../utils/cookies';
import {SavePaymentTransaction} from '../Services/orderService';
let PaymentTransactionModel={
  txnid: "",
  mode:"",
  bankcode:"",
  net_amount_debit:"",
  phone:"",
  productinfo:"",
  firstname:"",
  error:"",
  addedon:"",
  encryptedPaymentId:"",
  bank_ref_num:"",
  email:"",
  amount:"",
  payuMoneyId:"",
  mihpayid:"",
  amount_split:"",
  PG_TYPE:"",
  txnStatus:"",
  txnMessage:"",
 }
class Cart extends Component {
  
  constructor(props) {
    super(props);
    //this.GenerateOrder = this.GenerateOrder.bind(this);
    var IsAuthenticated = false;
    
    if (localStorage.getItem('IsAuthenticated')==="Yes") {
      console.log(localStorage.getItem('IsAuthenticated'));
     IsAuthenticated = true;
    }
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
  handleInput = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };
 

  handlePayment=(e)=>
    {
      
      var HashModel={
        key:"",
        txnId:"",
        amount:this.props.cartItems.reduce((a, c) => a + c.DiscountedPrice * c.count, 0),
        productinfo:"test",
        firstName:this.state.name,
        email:this.state.email
      };
      console.warn("HashModel",HashModel);
      var hashCode="";
      fetch('/CheckHash', {  
        method: 'post',  
        headers: {
          "Content-Type": "application/json",
        },
       body:JSON.stringify(HashModel),
        }).then((Response) => Response.json())  
        .then((result) => {  
            console.log("Hash:"+JSON.stringify(result));  
            console.log("Mobile",this.state.mobile);
            hashCode=result;
            var RequestData = {
              key: '4fUOL2U2',
              txnid: result.txnID,
              amount: HashModel.amount,
              firstname: this.state.name,
              email: this.state.email,
              phone: this.state.mobile,
              productinfo: 'test',
              surl : 'https://localhost:3000/Success',
              furl: 'https://localhost:3000/Failure',
              hash: result.hashCode,//"p31QeYcljCFcpVfcs77nvdNFCyxNeh6L19Yy0G/bd41p9kWxGnbjCfgt41g2lvlCrK/f3h0/e9zIRQ+X4GjVzA==",
              service_provider:'',
          }
      
          var Handler = {
      
            responseHandler: function(BOLT){
              console.log("Resplonse"+JSON.stringify(BOLT));
              var response=BOLT.response;
              if(response.txnStatus==="SUCCESS")
              {
                PaymentTransactionModel.txnid=response.txnid;
                PaymentTransactionModel.mode=response.mode;
                PaymentTransactionModel.bankcode=response.bankcode;
                PaymentTransactionModel.net_amount_debit=response.net_amount_debit;
                PaymentTransactionModel.phone=response.phone;
                PaymentTransactionModel.productinfo=response.productinfo;
                PaymentTransactionModel.firstname=response.firstname;
                PaymentTransactionModel.error=response.error;
                PaymentTransactionModel.addedon=response.addedon;
                PaymentTransactionModel.encryptedPaymentId=response.encryptedPaymentId;
                PaymentTransactionModel.bank_ref_num=response.bank_ref_num;
                PaymentTransactionModel.email=response.email;
                PaymentTransactionModel.amount=response.amount;
                PaymentTransactionModel.payuMoneyId=response.payuMoneyId;
                PaymentTransactionModel.mihpayid=response.mihpayid;
                PaymentTransactionModel.amount_split=response.amount_split;
                PaymentTransactionModel.PG_TYPE=response.PG_TYPE;
                PaymentTransactionModel.txnStatus=response.txnStatus;
                PaymentTransactionModel.txnMessage=response.txnMessage;
                console.log("PaymentTransactionModel",JSON.stringify(PaymentTransactionModel));
                SavePaymentTransaction(PaymentTransactionModel).then(function(result){
                  console.log("Result"+JSON.stringify(result));
                  if(result.Success===1)
                  {
                    window.location.pathname = '/Success';
                  }
                });
              }
              
              // your payment response Code goes here, BOLT is the response object
            },
            catchException: function(BOLT){
              console.log("Error"+JSON.stringify(BOLT));
              // the code you use to handle the integration errors goes here
      
            }
            
          }
          window.bolt.launch( RequestData , Handler ); 
        })  
    }
  closeModal = () => {
    this.props.clearOrder();
    this.setState({ IsPaid: false });
    window.location.pathname = '/';
  };
  openLoginModal = () => {
    this.setState({ IsOpenLogin:true });
  };
  closeLoginModal = () => {
    this.setState({ IsOpenLogin: false });
  };
  render() {
    
    const { cartItems, order } = this.props;
    return (
      <div>
        {cartItems.length === 0 ? (
          <div className="cart cart-header">Cart is empty</div>
        ) : (
          <div className="cart cart-header">
            You have {cartItems.length} in the cart{" "}
          </div>
        )}
        {console.log("Its Return"+JSON.stringify(order))}
        {order && (
          <Modal isOpen={true} onRequestClose={this.closeModal}>
            <Zoom>
              <button className="close-modal" onClick={this.closeModal}>
                x
              </button>
              <div className="order-details">
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
              </div>
            </Zoom>
          </Modal>
        )}
        <div>
          <div className="cart">
            <Fade left cascade>
              <ul className="cart-items">
                {cartItems.map((item) => (
                  <li key={item._id}>
                    <div>
                      <img src={item.image} alt={item.title}></img>
                    </div>
                    <div>
                      <div>{item.title}</div>
                      <div className="right">
                        {formatCurrency(item.DiscountedPrice)} x {item.count}{" "}
                        <button
                          className="button"
                          onClick={() => this.props.removeFromCart(item)}
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </Fade>
          </div>
          {cartItems.length !== 0 && (
            <div>
              <div className="cart">
                <div className="total">
                  <div>
                    Total:{" "}
                    {formatCurrency(
                      cartItems.reduce((a, c) => a + c.DiscountedPrice * c.count, 0)
                    )}
                  </div>
                  
                      {!this.state.IsAuthenticated ? (<button className="button Checkout" type="button" onClick={this.handlePayment}>
                            Checkout
                          </button>):(<Link to="/Login" className="btn btn-primary">Login</Link>)}
                     
                </div>
              </div>
              {!this.state.showCheckout && (
                <Fade right cascade>
                  <div className="cart">
                    <form>
                      <ul className="form-container">
                      <li>
                          <label>Name</label>
                          <input
                            name="name"
                            type="text"
                            required
                            onChange={this.handleInput}
                          ></input>
                        </li>
                        <li>
                          <label>Email</label>
                          <input
                            name="email"
                            type="email"
                            required
                            onChange={this.handleInput}
                          ></input>
                        </li>
                        <li>
                          <label>Contact no.</label>
                          <input
                            name="mobile"
                            type="mobile"
                            required
                            onChange={this.handleInput}
                          ></input>
                        </li>
                        
                        <li>
                          <label>Address</label>
                          <input
                            name="address"
                            type="text"
                            required
                            onChange={this.handleInput}
                          ></input>
                        </li>
                        <li>
                          <button className="button primary" type="button" onClick={this.handlePayment}>
                            Checkout
                          </button>
                        </li>
                      </ul>
                    </form>
                  </div>
                </Fade>
              )}
            </div>
          )}
        </div>
        { this.state.IsOpenLogin &&  <Modal backdrop="static" keyboard={false} className="LoginModel" ariaHideApp={false} isOpen={true} onRequestClose={this.closeLoginModal}>
                        <button className="CloseModel" onClick={this.closeLoginModal}>x</button> <LoginScreen/></Modal> }

                        
      </div>
      
    );
  }
}

export default connect(
  (state) => ({
    order: state.order.order,
    cartItems: state.cart.cartItems,
  }),
  { removeFromCart, createOrder, clearOrder }
)(Cart);
