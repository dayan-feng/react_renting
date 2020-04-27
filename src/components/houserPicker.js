import React, { Component } from "react";
import { request } from "../utils/axios";
import Css from "./houserPicker.module.scss";
import { PickerView } from "antd-mobile";
class HouserPicker extends Component {
  state = {
    pickerTitle: [
      { id: 0, title: "区域", cols: 3 },
      { id: 1, title: "方式", cols: 1 },
      { id: 2, title: "租金", cols: 1 },
      { id: 3, title: "筛选", cols: -1 },
    ],
    currentIndex: -1,
    pickerMsg: [],
    filterList: [],
    pickerList: [[], [], [], []],
  };
  // 把用户选中的值添加到 pickerList 中
  handlePickerList = (e) => {
    let { pickerList, currentIndex } = this.state;
    if (currentIndex === 3) {
      const index = pickerList[currentIndex].indexOf(e);
      index === -1
        ? pickerList[currentIndex].push(e)
        : pickerList[currentIndex].splice(index, 1);
    } else {
      pickerList[currentIndex] = e;
    }
    console.log(pickerList);
    this.setState({
      pickerList,
    });
  };
  // 点击确认按钮
  getFilterCityList = () => {
    let { pickerList } = this.state;
    let obj = {};
    this.setState({ currentIndex: -1 });
    // 修改后台需要的格式数据
    pickerList.forEach((v, i) => {
      if (i === 0) {
        obj[v[0]] = v[2] === "null" ? v[1] : v[2];
      } else if (i === 1) {
        obj["rentType"] = v[0];
      } else if (i === 2) {
        obj["price"] = v[0];
      } else {
        obj["more"] = v.join(",");
      }
    });
    // 过滤对象为空,null,undefined的数据
    for (let key in obj) {
      const del = ["undefined", "", "null", undefined].includes(
        key === "undefined" ? key : obj[key]
      );
      del && delete obj[key];
    }
    console.log(obj);
    this.props.submitPriceObj(obj);
  };
  //  点击清空过滤的选项
  wipeFilter = () => {
    const { pickerList, currentIndex } = this.state;
    pickerList[currentIndex] = [];
    this.setState({ pickerList });
  };
  // 点navbar切换不同的选择器
  renderFilterPicker = () => {
    const {
      pickerList,
      filterList,
      currentIndex,
      pickerMsg,
      pickerTitle,
    } = this.state;
    if (currentIndex >= 0 && currentIndex <= 2) {
      return (
        <div className={Css.picker_navbar_filter_item}>
          <PickerView
            value={pickerList[currentIndex]}
            data={pickerMsg[currentIndex]}
            cols={pickerTitle[currentIndex].cols}
            onChange={this.handlePickerList}
          />
          <div className={Css.picker_filter_item_btn}>
            <span
              onClick={() => {
                this.setState({ currentIndex: -1 });
              }}
            >
              取消
            </span>
            <span onClick={this.getFilterCityList}>确认</span>
          </div>
        </div>
      );
    } else if (currentIndex === 3) {
      return (
        <div className={Css.picker_filter_if}>
          {filterList.map((v, i) => (
            <div key={v.title} className={Css.filter_if_box}>
              <div className={Css.filter_if_title}>{v.title}</div>
              <div className={Css.filter_if_item}>
                {v.data.map((vv) => (
                  <div
                    onClick={this.handlePickerList.bind(this, vv.value)}
                    key={vv.value}
                    className={[
                      Css.filter_if_item_label,
                      pickerList[currentIndex].includes(vv.value)
                        ? Css.active
                        : "",
                    ].join(" ")}
                  >
                    {vv.label}
                  </div>
                ))}
              </div>
            </div>
          ))}
          <div className={Css.filter_if_btn}>
            <span onClick={this.wipeFilter}>清空</span>
            <span onClick={this.getFilterCityList}>确定</span>
          </div>
        </div>
      );
    } else {
      return <></>;
    }
  };
  async componentDidMount() {
    let newPickerMsg = [];
    const id = (await request.get("/area/info?name=上海")).data.body.value;
    const pickerMsg = (await request.get("/houses/condition?id=" + id)).data
      .body;
    // 添加选择器的数据类型
    newPickerMsg.push([pickerMsg.area, pickerMsg.subway]);
    newPickerMsg.push(pickerMsg.rentType);
    newPickerMsg.push(pickerMsg.price);
    // 创建遍历筛选房子的数据
    const filterList = [
      { title: "户型", data: pickerMsg.roomType },
      { title: "朝向", data: pickerMsg.characteristic },
      { title: "楼层", data: pickerMsg.floor },
      { title: "房屋亮点", data: pickerMsg.roomType },
    ];
    this.setState({
      pickerMsg: newPickerMsg,
      filterList,
    });
  }
  render() {
    const { pickerMsg, pickerTitle, currentIndex } = this.state;
    return (
      <div className={Css.picker}>
        <div
          className={Css.picker_navbar}
          // 遮罩层
          style={{ zIndex: currentIndex < 3 && currentIndex > -1 ? 1000 : "" }}
        >
          {/* <div className={Css.shade} hidden></div> */}
          <div className={Css.picker_navbar_title}>
            {pickerTitle.map((v, i) => (
              <div
                className={[
                  Css.picker_navbar_item,
                  currentIndex === i ? Css.colorText : "",
                ].join(" ")}
                key={v.id}
                onClick={() => this.setState({ currentIndex: i })}
              >
                {v.title}
              </div>
            ))}
          </div>
          <div className={Css.picker_navbar_filter}>
            {this.renderFilterPicker()}
          </div>
        </div>
        <div
          onClick={() => this.setState({ currentIndex: -1 })}
          className={Css.shade}
          hidden={currentIndex <= -1}
        ></div>
      </div>
    );
  }
}
export default HouserPicker;
