import { TOKEN } from "../actionType";
export default (state = { token: "" }, action) => {
  if (action.type === TOKEN) {
    let newState = JSON.parse(JSON.stringify(state));
    newState.token = action.token;
    return newState;
  }
  return state;
};
