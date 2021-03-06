import * as actionTypes from "../actions/actionTypes";

const logout = () => {
  console.log("logout uruchomione");
  localStorage.removeItem("token");
  return { loading: false, user: false };
};

const initState = { loadingLogin: false, loadingRegister: false, user: false };

// prettier-ignore
const reducerUser = (state = initState, action) => {
  // console.log("actions", action);
  switch (action.type) {
    case actionTypes.GET_CURRENT_USER_SUCCESS: return { ...state, loadingLogin: false, ...action.payload };
    case actionTypes.GET_CURRENT_USER_FAILURE: return {...state, error: action.payload};
    case actionTypes.LOGIN_USER_LOAD: return {...state, loadingLogin: true}
    case actionTypes.LOGIN_USER_SUCCESS: return { ...state, jwt: action.payload };
    case actionTypes.LOGIN_USER_FAILURE: return { ...state, error: action.payload };
    case actionTypes.REGISTER_USER_LOAD: return { ...state, loadingRegister: true }
    case actionTypes.REGISTER_USER_SUCCESS: return { ...state, loadingRegister: false }
    case actionTypes.REGISTER_USER_FAILURE: return { ...state, error: action.payload }
    case actionTypes.LOGOUT_USER: return logout();
    default: return state;
  }
};

export default reducerUser;
