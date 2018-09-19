import AllState from "./AllState";
const TimeLineReducer = (state = AllState.TimeLine, action) => {
  if (action.type === "TimeLine_username") {
    return {
      ...state,
      [action.fieldName]: action.value
    };
  } else {
    return state;
  }
};
export default TimeLineReducer;
