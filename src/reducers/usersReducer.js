const defaultState = {
  loggedIn: false,
  user: {}
}

const userReducer = (state = defaultState, action) => {
  switch(action.type){
      case "SET_USER":
          return {
              ...state,
              loggedIn: true,
              user: {...action.payload}
          }
      case "LOG_OUT":
          localStorage.clear()
          return {
              loggedIn: false,
              user: {}
          }
      case "SET_USER_PROFILE":
          return {
              ...state,
              user: {...action.payload}
          }
        case "UPDATE_USER_PROFILE":
        return {
            ...state,
            user: {...action.payload}
        }
          
      default: return state
  }
}

export default userReducer