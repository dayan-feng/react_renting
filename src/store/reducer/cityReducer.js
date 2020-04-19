import { CITY_INIT } from "../actionType";
export default (state = { city: "" }, action) => {
  if (action.type === CITY_INIT) {
    let newState = JSON.parse(JSON.stringify(state));
    newState.city = action.city;
    return newState;
  }
  return state;
};
