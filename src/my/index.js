import React, { Component } from "react";
import Css from "./index.module.scss";
import img from "../assets/images/my.png";
import { Toast } from "antd-mobile";
import { connect } from "react-redux";
import { request } from "../utils/axios";
import { actionRemoveToken } from "../store/actionCreator";
class My extends Component {
  state = {
    userInfo: {},
  };
  async componentDidMount() {
    const res = await request.get("/user", {
      headers: {
        authorization:
          " eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJJRCI6NCwiaWF0IjoxNTg3OTcyNjc0LCJleHAiOjE1ODc5ODcwNzR9.B5e_Ui0l2VQxYAC_Pc1T4kLAkGxmgjX9FnTzhc25bqI",
      },
    });
    this.setState({ userInfo: res.data.body });
    console.log(res.data.body);
  }
  // 点击退出,删除token
  quitRemoveToken = () => {
    this.props.handleRemoveToken();
    this.setState({
      userInfo: {},
    });
  };
  render() {
    const { userInfo, token } = this.state;
    return (
      <div className={Css.my}>
        {/* 1. 顶部背景图片开始 */}
        <div className={Css.my_img}>
          <img src={img} alt="" />
        </div>
        {/* 1. 顶部背景图片结束 */}
        {/* 2. 头像等个人信息框开始 */}
        <div className={Css.my_login}>
          <div>
            <div className={Css.my_login_img}>
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcReISxdcagqxhCKuSs8_PMzHGCTCC05to4o9RyLKjGD7XhlQT9Y&usqp=CAU"
                alt=""
              />
            </div>
            <div className={Css.my_login_info}>
              {!userInfo.nickname && (
                <div className={Css.my_info_false}>
                  <div>游客</div>
                  <div
                    onClick={() => {
                      this.props.history.push("/login");
                    }}
                  >
                    去登陆
                  </div>
                </div>
              )}

              {userInfo.nickname && (
                <div className={Css.my_info_true}>
                  <div className={Css.my_info_name}>{userInfo.nickname}</div>
                  <div
                    onClick={this.quitRemoveToken}
                    className={Css.my_login_quie}
                  >
                    退出
                  </div>
                  <div className={Css.my_info_edit}>编辑个人信息</div>
                </div>
              )}
            </div>
          </div>
        </div>
        {/* 2. 头像等个人信息框结束 */}
        {/* 3. 租房看房等记录框开始 */}
        <div className={Css.my_info}>
          <div className={Css.my_info_text}>
            <i className="iconfont icon-ind"></i>
            我的出租
          </div>
          <div className={Css.my_info_text}>
            <i className="iconfont icon-record"></i>
            看房记录
          </div>
          <div className={Css.my_info_text}>
            <i className="iconfont icon-identity"></i>
            成为房主
          </div>
          <div className={Css.my_info_text}>
            <i className="iconfont icon-myinfo"></i>
            个人资料
          </div>
          <div
            className={Css.my_info_text}
            onClick={() => {
              Toast.info("0001-********", 2);
            }}
          >
            <i className="iconfont icon-cust"></i>
            联系我们
          </div>
        </div>
        {/* 3. 租房看房等记录框开始 */}
      </div>
    );
  }
}
const tokenStateToprops = (state) => ({
  token: state.tokenReducer.token,
});
const tokenDispathToprops = (dispath) => {
  return {
    handleRemoveToken() {
      dispath(actionRemoveToken);
    },
  };
};
export default connect(tokenStateToprops, tokenDispathToprops)(My);
