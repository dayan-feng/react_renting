import React, { useState, useRef, useEffect } from "react";
import { NavBar, Icon } from "antd-mobile";
import { Modal, List, InputItem, Picker, ImagePicker } from "antd-mobile";
import { request } from "../utils/axios";
import Css from "./index.module.scss";
let cityId = "";
const Send = (props) => {
  const alert = Modal.alert;
  const icon = [
    { icon: "icon-wardrobe", name: "衣柜" },
    { icon: "icon-wash", name: "洗衣机" },
    { icon: "icon-air ", name: "空调" },
    { icon: "icon-gas", name: "天然气" },
    { icon: "icon-ref", name: "冰箱" },
    { icon: "icon-Heat", name: "暖气" },
    { icon: "icon-vid", name: "电视" },
  ];
  let sendtitle = React.createRef();
  const [houseTitle, setHouseTitle] = useState();
  const [picker, setPicker] = useState({});
  const [headImg, setHeadImg] = useState([]);
  useEffect(() => {
    // 判断选择数据picker为空对象
    getPickerInfo();
  }, []);
  // 提示点击取消是否取消发布
  const showAlert = () => {
    const alertInstance = alert("提示", "放弃发布房源吗?", [
      {
        text: "取消",
        onPress: () => props.history.goBack(),
        style: "default",
      },
      { text: "继续编剧", onPress: () => console.log("ok") },
    ]);
  };
  // 获取picker选择器的数据
  async function getPickerInfo() {
    // 获取城市id
    const { value } = (await request.get("/area/info?name=上海")).data.body;
    cityId = value;
    console.log(cityId);
    // 获取picker帅选条件
    const { body } = (await request.get("/houses/condition?id=" + value)).data;
    let picker = {
      floor: body.floor,
      oriented: body.oriented,
      roomType: body.roomType,
    };
    setPicker(picker);
  }
  let pickerImg = function (files, type, index) {
    setHeadImg(files);
  };
  return (
    <div className={Css.send}>
      {/* 1. 导航栏开始 */}
      <div className={Css.navbar}>
        <NavBar
          style={{ background: "#eee" }}
          mode="light"
          icon={<Icon style={{ color: "#333" }} type="left" />}
          onLeftClick={() => props.history.goBack()}
        >
          发布房源
        </NavBar>
      </div>
      {/* 1. 导航栏结束 */}
      {/* 2. 主体开始 */}
      <div className={Css.main}>
        <div className={Css.title}>房源信息</div>
        <div
          className={Css.house_name}
          onClick={() => {
            props.history.push("/search/" + cityId);
          }}
        >
          <span>小区名称</span>
          <span>请输入小区名称 ></span>
        </div>
        <div className={Css.price}>
          <List>
            <InputItem
              //   {...getFieldProps("preice")}
              placeholder="请输入租金/月"
              extra="¥/月"
            >
              租 &nbsp;&nbsp;&nbsp;&nbsp; 金
            </InputItem>
          </List>
        </div>
        <div className={Css.area}>
          <List>
            <InputItem
              //   {...getFieldProps("preice")}
              placeholder="请输入建筑面积"
              extra="m²"
            >
              建筑面积
            </InputItem>
          </List>
        </div>
        <div className={Css.house_type}>
          <Picker data={picker.oriented} cols={1} className="forss">
            <List.Item arrow="horizontal">
              户 &nbsp;&nbsp;&nbsp;&nbsp; 型
            </List.Item>
          </Picker>
        </div>
        <div className={Css.house_floor}>
          <Picker data={picker.floor} cols={1} className="forss">
            <List.Item arrow="horizontal">所在楼层</List.Item>
          </Picker>
        </div>
        <div className={Css.orientation}>
          <Picker data={picker.oriented} cols={1} className="forss">
            <List.Item arrow="horizontal">
              朝 &nbsp;&nbsp;&nbsp;&nbsp; 向
            </List.Item>
          </Picker>
        </div>
        <div className={Css.house_title}>房屋标题</div>
        <div className={Css.write_titile}>
          <InputItem
            ref={(ref) => (sendtitle = ref)}
            placeholder="请输入标题(例如: 整租 小区名 2室)"
            onBlur={(e) => setHouseTitle(e)}
          />
        </div>
        <div className={Css.head_img}>房屋图像</div>
        <div className={Css.img_picker}>
          <ImagePicker
            files={headImg}
            onChange={pickerImg}
            selectable={headImg.length < 3}
          />
        </div>
        <div className={Css.deplay}>房屋配置</div>
        <div className={Css.icon}>
          {icon.map((v, i) => (
            <i key={v.name} className={`iconfont ${v.icon}`}>
              <span> {v.name}</span>
            </i>
          ))}
        </div>
        <div className={Css.describe}>房屋描述</div>
        <div className={Css.write_describe}>
          <textarea maxLength="150" type="text" placeholder="请输入内容" />
        </div>
      </div>
      {/* 2. 主体结束 */}
      {/* 3. 底部按钮开始 */}
      <div className={Css.btn}>
        <span onClick={showAlert}>取消</span>
        <span>确定</span>
      </div>
      {/* 3. 底部按钮结束 */}
    </div>
  );
};
export default Send;
