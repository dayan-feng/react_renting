import React, { useState, useRef, useEffect } from "react";
import {
  Toast,
  NavBar,
  Icon,
  Modal,
  List,
  InputItem,
  Picker,
  ImagePicker,
} from "antd-mobile";
import { request } from "../utils/axios";
import Css from "./index.module.scss";
import { connect } from "react-redux";
import { actionSendHouse, actionToken } from "../store/actionCreator";
import loginPopUp from "../utils/loginPopUp";
let cityId = "";
// 销毁时替代useState的houseContent存入redux
let house = {};
// useEffect 第一次不触发
let i = 0;
const Send = (props) => {
  const { state } = props.history.location;
  const itemRef = useRef([]);
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
  const [picker, setPicker] = useState({});
  const [headImg, setHeadImg] = useState([]);
  const [houseContent, setHouseContent] = useState(props.house);
  useEffect(() => {
    itemRef.current[0].state.value = props.house.price;
    itemRef.current[1].state.value = props.house.size;
    itemRef.current[2].state.value = props.house.title;
    itemRef.current[3].value = props.house.description;
    // 判断路由有无传值
    state && handleHouseContentValue({ community: state.community });
    getPickerInfo();
    return () => {
      // 离开页面保留已填写数据存入redux
      props.dispathSendHouse(house);
      i = 0;
    };
  }, []);
  useEffect(() => {
    house = houseContent;
  }, [houseContent]);
  // 一开始不触发,点击发送按钮触发
  useEffect(() => {
    if (i++ === 0) return;
    // 判断填写完整信息
    const houseList = Object.keys(houseContent);
    for (let i = 0; i < houseList.length; i++) {
      if (!houseContent[i]) {
        Toast.info("请填写完整信息", 2);
        return;
      }
    }
    const asyncAwait = async () => {
      const res = await request.post("/user/houses", { ...houseContent });
      const { status, description } = res.data;
      if (status === 400) {
        loginPopUp(props.dispathLoginToken);
      } else if (status === 200 && description === "请求成功") {
        Toast.info("发布成功", 2);
        props.history.replace("/rentOut");
      }
    };
    asyncAwait();
  }, [houseContent.houseImg]);
  // 上传图片
  const uploadingImg = async () => {
    if (headImg.length === 0) {
      Toast.info("请填写完整信息", 2);
      return;
    }
    let formData = new FormData();
    headImg.map((v) => {
      formData.append("file", v.file);
    });
    const { data } = await request.post("/houses/image", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    handleHouseContentValue({
      houseImg: data.body.join("|"),
    });
  };
  // 提示点击取消是否取消发布
  const showAlert = () => {
    const alertInstance = alert("提示", "放弃发布房源吗?", [
      {
        text: "取消",
        onPress: () => props.history.goBack(),
        style: "default",
      },
      {
        text: "继续编剧",
        onPress: () => console.log("ok"),
      },
    ]);
  };
  // 点击确认,发送房源
  const sendFouse = () => {
    uploadingImg();
  };
  // 写入发布需要的信息
  const handleHouseContentValue = (e) => {
    setHouseContent({ ...houseContent, ...e });
  };
  // 获取picker选择器的数据
  async function getPickerInfo() {
    // 获取城市id
    const { value } = (await request.get("/area/info?name=上海")).data.body;
    cityId = value;
    // 获取picker帅选条件
    const { body } = (await request.get("/houses/condition?id=" + value)).data;
    let picker = {
      floor: body.floor,
      oriented: body.oriented,
      roomType: body.roomType,
    };
    setPicker(picker);
  }
  // 选择要上传的图片
  const pickerImg = function (files, type, index) {
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
          <span>{state ? state.communityName : "请输入小区名称"} ></span>
        </div>
        <div className={Css.price}>
          <List>
            <InputItem
              ref={(el) => (itemRef.current[0] = el)}
              placeholder="请输入租金/月"
              extra="¥/月"
              onBlur={(e) => handleHouseContentValue({ price: e })}
            >
              租 &nbsp;&nbsp;&nbsp;&nbsp; 金
            </InputItem>
          </List>
        </div>
        <div className={Css.area}>
          <List>
            <InputItem
              ref={(el) => (itemRef.current[1] = el)}
              onBlur={(e) => handleHouseContentValue({ size: e })}
              placeholder="请输入建筑面积"
              extra="m²"
            >
              建筑面积
            </InputItem>
          </List>
        </div>
        <div className={Css.house_type}>
          <Picker
            onChange={(e) =>
              handleHouseContentValue({
                roomType: e[0],
              })
            }
            data={picker.roomType}
            cols={1}
            value={[houseContent.roomType]}
          >
            <List.Item arrow="horizontal">
              户 &nbsp;&nbsp;&nbsp;&nbsp; 型
            </List.Item>
          </Picker>
        </div>
        <div className={Css.house_floor}>
          <Picker
            onChange={(e) => handleHouseContentValue({ floor: e[0] })}
            data={picker.floor}
            cols={1}
            value={[houseContent.floor]}
            className="forss"
          >
            <List.Item arrow="horizontal">所在楼层</List.Item>
          </Picker>
        </div>
        <div className={Css.orientation}>
          <Picker
            onChange={(e) =>
              handleHouseContentValue({
                oriented: e[0],
              })
            }
            data={picker.oriented}
            cols={1}
            value={[houseContent.oriented]}
            className="forss"
          >
            <List.Item arrow="horizontal">
              朝 &nbsp;&nbsp;&nbsp;&nbsp; 向
            </List.Item>
          </Picker>
        </div>
        <div className={Css.house_title}>房屋标题</div>
        <div className={Css.write_titile}>
          <InputItem
            ref={(el) => (itemRef.current[2] = el)}
            placeholder="请输入标题(例如: 整租 小区名 2室)"
            onBlur={(e) => handleHouseContentValue({ title: e })}
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
          <textarea
            ref={(el) => (itemRef.current[3] = el)}
            maxLength="150"
            type="text"
            placeholder="请输入内容"
            onBlur={(e) => {
              handleHouseContentValue({
                description: e.target.value,
              });
            }}
          />
        </div>
      </div>
      {/* 2. 主体结束 */}
      {/* 3. 底部按钮开始 */}
      <div className={Css.btn}>
        <span onClick={showAlert}>取消</span>
        <span onClick={sendFouse}>确定</span>
      </div>
      {/* 3. 底部按钮结束 */}
    </div>
  );
};
const handleStatePropsToken = (state) => {
  return {
    token: state.tokenReducer.token,
    house: state.sendHouse,
  };
};
const handleDispathSendHouse = (dispath) => {
  return {
    dispathSendHouse(house) {
      dispath(actionSendHouse(house));
    },
    dispathLoginToken(login) {
      return dispath(actionToken(login));
    },
  };
};
export default connect(handleStatePropsToken, handleDispathSendHouse)(Send);
