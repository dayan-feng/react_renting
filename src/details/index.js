import React, { Component } from "react";
import { request, baseURL } from "../utils/axios";
import { Carousel, NavBar, Icon } from "antd-mobile";
import "./index.scss";
import Css from "./index.module.scss";
import img from "../assets/images/headImg.png";
class Details extends Component {
  state = {
    details: {},
    imgHeight: 176,
    iconfont: [
      { icon: "icon-wardrobe", name: "衣柜" },
      { icon: "icon-wash", name: "洗衣机" },
      { icon: "icon-air ", name: "空调" },
      { icon: "icon-gas", name: "天然气" },
      { icon: "icon-ref", name: "冰箱" },
      { icon: "icon-Heat", name: "暖气" },
      { icon: "icon-vid", name: "电视" },
    ],
  };
  async componentDidMount() {
    const { id } = this.props.location;
    const details = (await request("/houses/" + "5cc450a21439630e5b3dca75"))
      .data.body;
    const asd = await request("/houses/" + "5cc450a21439630e5b3dca75");
    console.log(asd);

    this.setState({ details });
    console.log(details);
    this.getMapToHtml(details);
  }
  // 获取地图
  getMapToHtml = (details) => {
    const { latitude, longitude } = details.coord;
    var map = new window.BMap.Map("map");
    var point = new window.BMap.Point(longitude, latitude);
    map.centerAndZoom(point, 18);
    var marker = new window.BMap.Marker(point); // 创建标注
    map.addOverlay(marker); // 将标注添加到地图中

    var label = new window.BMap.Label(
      `<div class=${Css.mapText}>${details.community}</div>`
    );
    label.setStyle({ border: 0, background: "none" });
    marker.setLabel(label);
  };
  render() {
    const { details, imgHeight, iconfont } = this.state;
    return (
      <div>
        {details.houseImg && (
          <div className={Css.details}>
            <div className={Css.navbar}>
              <NavBar
                style={{ background: "#00c27d", color: "#fff" }}
                mode="light"
                icon={<Icon type="left" />}
                onLeftClick={() => this.props.history.goBack()}
              >
                <span style={{ color: "#fff", fontSize: "18px" }}>
                  {details.community}
                </span>
              </NavBar>
            </div>
            <div className={Css.carousel}>
              <Carousel autoplay infinite>
                {details.houseImg.map((val) => (
                  <img
                    key={val}
                    src={baseURL + val}
                    alt="#"
                    style={{
                      width: "100%",
                      height: imgHeight,
                      verticalAlign: "top",
                    }}
                    onLoad={() => {
                      window.dispatchEvent(new Event("resize"));
                      this.setState({ imgHeight: "auto" });
                    }}
                  />
                ))}
              </Carousel>
            </div>
            <div className={Css.title}>{details.title}</div>
            <div className={Css.feature}>
              {details.tags.map((v) => (
                <span key={v}>{v}</span>
              ))}
            </div>
            <div className={Css.info}>
              <div className={Css.info_price}>
                <span>{details.price}/月</span>
                <span>租金</span>
              </div>
              <div className={Css.info_roomType}>
                <span>{details.roomType}</span>
                <span>租金</span>
              </div>
              <div className={Css.info_size}>
                <span>{details.size}平米</span>
                <span>面积</span>
              </div>
            </div>
            <div className={Css.msg}>
              <div>
                装修: <span>精装</span>
              </div>
              <div>
                朝向: <span>北</span>
              </div>
              <div>
                装修: <span>17</span>
              </div>
              <div>
                类型: <span>普通楼层</span>
              </div>
            </div>
            <div className={Css.site}>
              小区: <span>{details.community}</span>
            </div>
            <div className={Css.map} id="map"></div>
            <div className={Css.mating}>房屋配套</div>
            <div className={Css.mating_content}>
              {iconfont.map((v) => (
                <div key={v.icon}>
                  <i className={`iconfont ${v.icon}`}></i>
                  {v.name}
                </div>
              ))}
            </div>
            <div className={Css.state}>房源概况</div>
            <div className={Css.houseOwner}>
              <div className={Css.headImg}>
                <img src={img} alt="" />
              </div>
              <div className={Css.name}>
                王女士
                <i className="iconfont icon-auth">
                  <span>已认证房主</span>
                </i>
              </div>
              <div className={Css.sendMsg}>发消息</div>
            </div>
            <div className={Css.describe}>
              <div>1.附近有公园</div>
              <div>2.大型商场,花园,超市</div>
              <div>3.绿化好,空气清新</div>
            </div>
            <div className={Css.serve}>
              <div className={Css.collect}>收藏</div>
              <div className={Css.consult}>在线咨询</div>
              <div className={Css.phone}>电话预约</div>
            </div>
          </div>
        )}
      </div>
    );
  }
}
export default Details;
