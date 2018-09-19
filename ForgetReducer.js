import AllState from "./AllState";
const ForgetReducer = (state = AllState.Forget, action) => {
  if (action.type === "Forget_username") {
    return {
      ...state,
      [action.fieldName]: action.value
    };
  } else {
    return state;
  }
};
export default ForgetReducer;
