import { getLocationCity } from "../../utils/baiduMap";
import { CITY_INIT } from "../actionType";
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
