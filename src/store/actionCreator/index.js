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
  console.log(this);
  return async (dispatch) => {
    const res = await (await request.post("/user/login", data)).data;
    console.log(res);
    if (res.status === 400) {
      return false;
    } else {
      dispatch({
        type: TOKEN,
        token: res.body.token,
      });
      return true;
    }
  };
};
export const actionRemoveToken = () => {
  console.log(1);
  return {
    type: TOKEN,
    token: "",
  };
};
