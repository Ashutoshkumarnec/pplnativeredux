import { createStore, combineReducers } from "redux";
import RegisterReducer from "./RegisterReducer";
import LoginReducer from "./LoginReducer";
import reduceReducers from "reduce-reducers";
import TimeLineReducer from "./TimeLineReducer";
import ForgetReducer from "./ForgetReducer";

const store = createStore(
  combineReducers({
    Register: RegisterReducer,
    Login: LoginReducer,
    TimeLine: TimeLineReducer,
    Forget: ForgetReducer
  })
);
export default store;
