import React, { Component } from "react";
import Css from "./index.module.scss";
import { baseURL } from "../../utils/axios";
import { withRouter } from "react-router-dom";
class HouseItem extends Component {
  // 跳转到租房详情
  goToHouseDetail = () => {
    const { history, houseItem } = this.props;
    history.push({ pathname: "/details", id: houseItem.houseCode });
  };
  render() {
    const v = this.props.houseItem;
    return (
      <div className={Css.main_house_item} onClick={this.goToHouseDetail}>
        <div className={Css.house_item_left}>
          <img src={baseURL + v.houseImg} alt="" />
        </div>
        <div className={Css.house_item_right}>
          <div className={Css.house_item_title}>{v.title}</div>
          <div className={Css.house_item_dest}>{v.desc}</div>
          <div className={Css.house_item_tags}>
            {v.tags.map((vv) => (
              <span key={vv}>{vv}</span>
            ))}
          </div>
          <div className={Css.house_item_price}>
            <span>{v.price}</span>元/月
          </div>
        </div>
      </div>
    );
  }
}
export default withRouter(HouseItem);
