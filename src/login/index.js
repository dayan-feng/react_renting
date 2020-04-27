import React, { Component } from "react";
import { NavBar, Icon } from "antd-mobile";
import Css from "./index.module.scss";
import { connect } from "react-redux";
import { actionToken } from "../store/actionCreator";
import { Toast, WhiteSpace, WingBlank, Button } from "antd-mobile";
import axios from "axios";
class Login extends Component {
  state = {
    username: "",
    password: "",
  };
  login = () => {
    const { username, password } = this.state;
    this.props.handleToken({ username, password }).then((res) => {
      if (res) {
        Toast.success("登录成功", 1);
        this.props.history.goBack();
      } else {
        Toast.fail("账号或密码错误", 1);
      }
    });
  };
  inputUsername = (e) => {
    this.setState({ username: e.currentTarget.value });
  };
  inputPassword = (e) => {
    this.setState({ password: e.currentTarget.value });
  };
  render() {
    return (
      <div className={Css.login}>
        <div className={Css.login_navbar}>
          <NavBar
            mode="light"
            icon={<Icon type="left" />}
            onLeftClick={() => {
              this.props.history.goBack();
            }}
          >
            账号登录
          </NavBar>
        </div>
        <div className={Css.login_form}>
          <input
            value={this.state.username}
            onChange={(e) => this.inputUsername(e)}
            placeholder="账号admin"
            type="text"
          />
          <input
            value={this.state.password}
            onChange={(e) => this.inputPassword(e)}
            placeholder="密码admin"
            type="password"
          />
        </div>
        <div onClick={this.login} className={Css.login_btn}>
          登 录
        </div>
      </div>
    );
  }
}
const tokenStateToProps = (state) => ({ token: state.tokenReducer.token });
const tokenDispatchToProps = (dispatch) => {
  return {
    handleToken(data) {
      return dispatch(actionToken(data)).then((res) => {
        return res;
      });
    },
  };
};

export default connect(tokenStateToProps, tokenDispatchToProps)(Login);
