import { SEND_HOUSE } from "../actionType";
let house = {
  houseImg: "",
  title: "",
  description: "",
  oriented: "",
  supporting: "空调|洗衣机",
  price: "",
  roomType: "",
  size: "",
  floor: "",
  community: "",
};
export default (state = house, action) => {
  if (action.type === SEND_HOUSE) {
    let newHouse = JSON.parse(JSON.stringify(house));
    newHouse = { ...newHouse, ...action.house };
    return newHouse;
  }
  return state;
};
