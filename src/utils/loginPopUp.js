import { Toast, Modal } from "antd-mobile";

const prompt = Modal.prompt;
const loginPopUp = (props) => {
  prompt(
    "请登录",
    "登录已过期,请重新登录",
    async (username, password) => {
      const res = await props({ username, password });
      console.log(res);
      res ? Toast.success("登录成功", 1) : loginPopUp(props);
      res && window.localStorage.setItem("token");
    },
    "login-password",
    null,
    ["请输入账号admin", "请输入密码admin"]
  );
};
export default loginPopUp;
