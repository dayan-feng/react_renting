import React, { Component } from "react";
import { NavBar, Icon } from "antd-mobile";
import IndexSearch from "../components/IndexSearch";
import Css from "./index.module.scss";
import { connect } from "react-redux";
import HouserPicker from "../components/houserPicker";
import { request } from "../utils/axios";
import HouseItem from "../components/houseItem";
import { List } from "react-virtualized";

class Found extends Component {
  // 请求数据数量.id
  houseNum = {
    cityId: "",
    start: 1,
    end: 20,
  };
  // 节流阀
  closure = true;
  // 判断是否还有数据
  houseListLength = 0;
  constructor() {
    super();
    this.list = React.createRef();
    this.state = {
      houseList: [],
    };
  }
  // 点击确认,子传父
  submitPriceObj = (e) => {
    this.setState({ houseList: [] });
    this.houseNum.start = 1;
    this.houseNum.end = 20;
    this.getHouseList(e);
  };
  // 获取租房列表
  async getHouseList(params = {}) {
    params = { ...params, ...this.houseNum };
    console.log(params);

    let houseList = await request.get("/houses", { params });
    houseList = houseList.data.body.list;
    this.setState({ houseList: [...this.state.houseList, ...houseList] });
    this.houseListLength = houseList.length;
  }
  async componentDidMount() {
    this.houseNum.cityId = await (
      await request.get("/area/info?name=" + "上海")
    ).data.body.value;
    this.getHouseList({});
  }
  // 渲染房子列表
  rowRenderer = ({ key, index, isScrolling, isVisible, style }) => {
    const { houseList } = this.state;
    return houseList.map((v, i) => (
      <div key={i} className={Css.main_house_item}>
        <HouseItem houseItem={v}></HouseItem>
      </div>
    ));
  };
  // list滚动触底获取更多房子数据
  getMoreHouseList = ({ clientHeight, scrollHeight, scrollTop }) => {
    // 离底部<100才获取新数据
    let differ = scrollHeight - (scrollTop + clientHeight) < 50;
    // 一开始不触发
    let start = this.state.houseList.length;
    // 请求的数据不足20
    let length = this.houseListLength === 20;
    if (!differ || !start || !length || !this.closure) return;
    this.houseNum.start += 20;
    this.houseNum.end += 20;
    this.closure = false;
    this.getHouseList();
    setTimeout(() => {
      this.closure = true;
    }, 3000);
  };
  render() {
    const { houseList } = this.state;
    return (
      <div className={Css.main}>
        <div className={Css.main_header}>
          <div className={Css.main_header_navbar}>
            <NavBar
              mode="light"
              style={{ background: "#f5f5f5" }}
              icon={<Icon type="left" />}
              onLeftClick={() => this.props.history.goBack()}
            ></NavBar>
          </div>
          <div className={Css.main_header_search}>
            <IndexSearch iconMapColor="#00b769"></IndexSearch>
          </div>
        </div>
        <div className={Css.main_picker}>
          <HouserPicker submitPriceObj={this.submitPriceObj}></HouserPicker>
        </div>
        <div className={Css.main_house}>
          <List
            width={window.screen.width}
            height={window.screen.height - 130}
            rowCount={houseList.length}
            rowHeight={140}
            rowRenderer={this.rowRenderer}
            scrollToPosition={this.asd}
            onScroll={this.getMoreHouseList}
          />
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  city: state.cityReducer.city,
});
export default connect(mapStateToProps)(Found);
