import React, { Component } from "react";
import { NavBar, Icon } from "antd-mobile";
import { request } from "../utils/axios";
import { connect } from "react-redux";
import Css from "./index.scss";
import { List } from "react-virtualized";
import { handleInitCity } from "../store/actionCreator";
class CitySelect extends Component {
  constructor() {
    super();
    this.cityIndex = React.createRef();
  }
  state = {
    cityList: [],
    letterList: [],
    letterIndex: 0,
    cityIndex: 0,
  };
  /**
   * 点击修改redux的城市
   */
  amendReduxCity = (city) => {
    this.props.handleInitCity(city);
    this.props.history.goBack();
  };
  async componentDidMount() {
    let letterList = ["#", "热"];
    const cityList = [
      { title: "当前定位", data: [{ label: this.props.city }] },
    ];
    // 获取热门城市
    let hotCity = await (await request.get("/area/hot")).data.body;
    hotCity = hotCity.map((v) => {
      return { label: v.label };
    });
    cityList.push({ title: "热门城市", data: hotCity });
    // 获取全部城市

    let allCiry = await (await request.get("/area/city?level=1")).data.body;
    // 按字母重新排列
    allCiry.sort((a, b) => (a.short < b.short ? -1 : 1));
    allCiry.forEach((v) => {
      const firstLetter = v.short[0].toUpperCase();
      const index = cityList.findIndex((vv) => vv.title == firstLetter);
      if (index === -1) {
        letterList.push(firstLetter);
        cityList.push({
          title: firstLetter,
          data: [{ label: v.label }],
        });
      } else {
        cityList[index].data.push({ label: v.label });
      }
    });
    this.setState({
      cityList,
      letterList: [...this.state.letterList, ...letterList],
    });
    // 提前计算好city的距离
    this.cityIndex.measureAllRows();
  }
  /**
   * 渲染List组件的每个城市
   */
  rowRenderer = ({ key, index, isScrolling, isVisible, style }) => {
    return (
      <div key={key} style={style} className="city_list">
        <div className="city_list_title">
          {this.state.cityList[index].title}
        </div>
        <div className="city_list_box">
          {this.state.cityList[index].data.map((v) => (
            <div
              onClick={() => {
                this.amendReduxCity(v.label);
              }}
              key={v.label}
              className="city_list_item"
            >
              {v.label}
            </div>
          ))}
        </div>
      </div>
    );
  };
  // 每个城市列表高度
  rowHeight = ({ index }) => {
    return this.state.cityList[index].data.length * 40 + 40;
  };
  // 滑动城市对于其字母
  onRowsRendered = ({ startIndex }) => {
    if (startIndex === this.state.letterIndex) return;
    this.setState({
      letterIndex: startIndex,
    });
  };
  render() {
    const { cityIndex, cityList, letterList, letterIndex } = this.state;
    return (
      <div className="city">
        {/* 1.导航栏开始 */}
        <div className="city_nav">
          <NavBar
            className="city_nav_bar"
            mode="light"
            icon={<Icon type="left" />}
            onLeftClick={() => {
              this.props.history.goBack();
            }}
          >
            城市选择
          </NavBar>
        </div>
        {/* 1.导航栏结束 */}
        {/* 2.城市滑动列表开始 */}
        <div className="city_list">
          <List
            // List的宽度
            width={window.screen.width}
            // List的高度
            height={window.screen.height - 40}
            // 数组的长度
            rowCount={cityList.length}
            // 每一行的高度
            rowHeight={this.rowHeight}
            // 如何渲染每一行标签
            rowRenderer={this.rowRenderer}
            // 对齐字母
            scrollToIndex={cityIndex}
            // 对齐位置
            scrollToAlignment="start"
            // 滑动触发事件,返回城市index
            onRowsRendered={this.onRowsRendered}
            ref={(ref) => (this.cityIndex = ref)}
          />
        </div>
        {/* 2.城市滑动列表结束 */}
        {/* 3.右边字母列表开始 */}
        <div className="city_letter">
          {letterList.map((v, i) => (
            <div
              onClick={() => {
                this.setState({ cityIndex: i });
              }}
              key={v}
              className={i === letterIndex ? "currentLetter" : ""}
            >
              {v}
            </div>
          ))}
        </div>
        {/* 右边字母列表结束 */}
      </div>
    );
  }
}

const mapStateCityProps = (state) => ({
  city: state.cityReducer.city,
});
const mapDispacthCityProps = (dispacth) => {
  return {
    handleInitCity(city) {
      dispacth(handleInitCity(city));
    },
  };
};
export default connect(mapStateCityProps, mapDispacthCityProps)(CitySelect);
