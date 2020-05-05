import { TOKEN } from "../actionType";
const token = window.localStorage.getItem("token");
export default (state = { token: token || "" }, action) => {
  if (action.type === TOKEN) {
    let newState = JSON.parse(JSON.stringify(state));
    newState.token = action.token;
    return newState;
  }
  return state;
};
