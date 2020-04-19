import axios from "axios";
import { Toast } from "antd-mobile";
export const baseURL = "http://157.122.54.189:9060";
export let request = axios.create({ baseURL });
// 添加请求拦截器
let requestNum = 0;
request.interceptors.request.use(
  function (config) {
    requestNum++;
    // 在发送请求之前做些什么
    Toast.loading("加载中...", 0);
    return config;
  },
  function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  }
);

// 添加响应拦截器
request.interceptors.response.use(
  function (response) {
    requestNum--;
    requestNum || Toast.hide();
    // 对响应数据做点什么
    return response;
  },
  function (error) {
    // 对响应错误做点什么
    return Promise.reject(error);
  }
);
