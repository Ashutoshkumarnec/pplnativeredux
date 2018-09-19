import AllState from "./AllState";
const LoginReducer = (state = AllState.Login, action) => {
  if (action.type === "Login_username") {
    return {
      ...state,
      [action.fieldName]: action.value
    };
  } else {
    return state;
  }
};
export default LoginReducer;
