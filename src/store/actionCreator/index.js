import { getLocationCity } from "../../utils/baiduMap";
import { CITY_INIT, TOKEN } from "../actionType";
import { request } from "../../utils/axios";
export const actionInitCity = () => {
  return (dispatch) => {
    getLocationCity().then((res) => {
      res.name = res.name.replace("市", "");
      dispatch({
        type: CITY_INIT,
        city: res.name,
      });
    });
  };
};
export const handleInitCity = (city) => {
  return { type: CITY_INIT, city };
};
export const actionToken = (data) => {
  return async (dispatch) => {
    const { status, body } = (await request.post("/user/login", data)).data;
    body && window.localStorage.setItem("token", body.token);
    if (status === 400) {
      return false;
    } else {
      dispatch({
        type: TOKEN,
        token: body.token,
      });
      return true;
    }
  };
};
export const actionRemoveToken = () => {
  window.localStorage.setItem("token", "");
  return {
    type: TOKEN,
    token: "",
  };
};
