import React, { Component } from "react";
import Css from "./IndexSearch.scss";
import { withRouter } from "react-router-dom";
class IndexSearch extends Component {
  render() {
    const { city, history } = this.props;
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
export default withRouter(IndexSearch);
