import React, { Component } from "react";
import { NavBar, Icon } from "antd-mobile";
import { connect } from "react-redux";
import Css from "./index.module.scss";
import { request, baseURL } from "../utils/axios";
import HouseItem from "../components/houseItem";

let map = null;
const BMap = window.BMap;
class MapFound extends Component {
  state = {
    houseList: [],
    showHouseList: false,
  };
  async componentDidMount() {
    const id = (await request.get("/area/info?name=上海")).data.body.value;
    map = new BMap.Map("allmap");
    // 地图缩放及距离显示组件
    map.addControl(new BMap.NavigationControl());
    map.addControl(new BMap.ScaleControl());
    this.mapLabel(id, "上海");
    // 拖动地图,把房子列表隐藏
    map.addEventListener("dragstart", () => {
      if (this.state.showHouseList) {
        this.setState({ showHouseList: false });
      }
    });
  }
  // 使用闭包存回地图层级等一些信息
  houseLabel = (function () {
    let mapMsg = [
      { id: 1, zoom: 11, shape: "carLabel" },
      { id: 2, zoom: 13, shape: "carLabel" },
      { id: 3, zoom: 15, shape: "rectLabel" },
    ];
    let index = -1;
    return () => mapMsg[++index];
  })();
  // 获取房子详情信息
  getHouseInfo = async (id) => {
    const houseList = await (await request.get(`/houses?cityId=${id}`)).data
      .body.list;
    this.setState({ houseList, showHouseList: true });
  };
  // 渲染地图标注
  mapLabel = async (id, city) => {
    // 调用闭包获取数据
    const houseLabel = this.houseLabel();
    map.centerAndZoom(city, houseLabel.zoom);
    const areaList = (await request.get("/area/map?id=" + id)).data.body;
    areaList.forEach((v) => {
      var point = new BMap.Point(v.coord.longitude, v.coord.latitude);
      var opts = {
        position: point, // 指定文本标注所在的地理位置
        offset: new BMap.Size(0, 0),
      };
      var label = new BMap.Label(
        `<div class=${Css[houseLabel.shape]}>
          <span>${v.label}</span>
          <span>${v.count}套</span>  
        </div>`,
        opts
      ); // 创建文本标注对象
      label.setStyle({
        border: "none",
        background: "transparent",
      });
      map.addOverlay(label);
      // 点击标注事件

      label.onclick = (e) => {
        console.log(e);

        if (houseLabel.id === 3) {
          map.panBy(30, 40);
          this.getHouseInfo(v.value);
          return;
        }
        setTimeout(() => {
          map.clearOverlays();
        }, 0);
        // 递归获取新的地图标注
        this.mapLabel(v.value, v.label);
      };
    });
  };
  render() {
    const { houseList, showHouseList } = this.state;
    return (
      <div>
        {/* 1.导航栏开始 */}
        <div>
          <NavBar
            mode="light"
            icon={<Icon type="left" />}
            onLeftClick={() => this.props.history.goBack()}
          >
            地图找房
          </NavBar>
        </div>
        {/* 1.导航栏结束 */}
        <div className={Css.main}>
          {/* 2.地图开始 */}
          <div id="allmap" className={Css.main_map}></div>
          {/* 2.地图结束 */}
          {/* 3.房子列表开始 */}
          <div
            className={[
              Css.main_house,
              showHouseList ? Css.main_show_house : "",
            ].join(" ")}
          >
            <div className={Css.main_house_head}>
              <span>房屋列表</span>更多房源
            </div>
            <div className={Css.main_house_list}>
              {houseList.map((v, index) => (
                <div key={index}>
                  <HouseItem houseItem={v}></HouseItem>
                </div>
              ))}
            </div>
          </div>
          {/* 房子列表结束 */}
        </div>
      </div>
    );
  }
}
const reduxStateCity = (state) => ({
  city: state.cityReducer.city,
});
export default connect(reduxStateCity)(MapFound);
