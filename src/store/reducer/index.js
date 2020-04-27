import { combineReducers } from "redux";
import cityReducer from "./cityReducer";
import tokenReducer from "./tokenReducer";
export default combineReducers({ cityReducer, tokenReducer });
