import axios from "axios";

const baseURL = import.meta.env.VITE_APP_BASE_API;
console.log(baseURL);

// 创建 axios 实例
const service = axios.create({
  baseURL: baseURL || "/",
  timeout: 10000,
});

// 请求拦截器
service.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers!["Authorization"] = `Bearer ${token}`; // 设置 Authorization 请求头
    }
    return config;
  },
  (error) => {
    // 处理请求错误
    return Promise.reject(error);
  },
);

// 响应拦截器
service.interceptors.response.use(
  (response) => {
    const res = response.data;
    const { data, code, msg } = res;
    if (code !== 0) {
      window.$message.error(msg);
      return Promise.reject(msg);
    }
    return data;
  },
  (error) => {
    console.error("Response Error:", error);
    return Promise.reject(error);
  },
);

export default service;
