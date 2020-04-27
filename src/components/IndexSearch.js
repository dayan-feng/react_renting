import React, { Component } from "react";
import Css from "./IndexSearch.scss";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
class IndexSearch extends Component {
  static defaultProps = {
    iconMapColor: "#fff",
  };
  render() {
    const { city, history, iconMapColor } = this.props;
    return (
      <div className="search">
        <div className="search_left">
          <span
            className="city"
            onClick={() => {
              history.push("/citySelect");
            }}
          >
            {city}
          </span>
          <i className="iconfont icon-seach"></i>
          <div className="search_input">请输入小区或地址</div>
        </div>
        <div className="search_right">
          <i
            style={{ color: iconMapColor }}
            className="iconfont icon-map"
            onClick={() => {
              history.push("/mapFound");
            }}
          ></i>
        </div>
      </div>
    );
  }
}
const mapStateToprops = (state) => ({
  city: state.cityReducer.city,
});
export default connect(mapStateToprops)(withRouter(IndexSearch));
