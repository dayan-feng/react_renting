import { combineReducers } from "redux";
import cityReducer from "./cityReducer";
import tokenReducer from "./tokenReducer";
import sendHouse from "./sendHouse";
export default combineReducers({ cityReducer, tokenReducer, sendHouse });
