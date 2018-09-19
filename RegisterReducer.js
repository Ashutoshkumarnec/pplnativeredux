import AllState from "./AllState";
const RegisterReducer = (state = AllState.Register, action) => {
  if (action.type === "Register_username") {
    return {
      ...state,
      [action.fieldName]: action.value
    };
  } else {
    return state;
  }
};
export default RegisterReducer;
