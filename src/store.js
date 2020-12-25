import { createStore, applyMiddleware, compose, combineReducers } from "redux";
import thunk from "redux-thunk";
import { productsReducer } from "./reducers/productReducers";
import { cartReducer } from "./reducers/cartReducers";
import { orderReducer } from "./reducers/orderReducers";
import { authReducer} from "./reducers/authReducers";
import { errorReducer } from "./reducers/errorReducers";
import { authenticationReducer } from "./reducers/authenticationReducer";
import { loginReducer } from "./reducers/loginReducer";
import userReducer from './reducers/usersReducer'
import commentReducer from './reducers/commentReducer'
const initialState = {};
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  combineReducers({
    products: productsReducer,
    cart: cartReducer,
    order: orderReducer,
    auth:authReducer,
    error:errorReducer,
    user:userReducer,
    comment:commentReducer
  }),
  initialState,
  composeEnhancer(applyMiddleware(thunk))
);
export default store;
