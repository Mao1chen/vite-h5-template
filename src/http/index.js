import axios from "axios";
import {BASE_URL_USER, BASE_URL_DECLARE} from "./config";
import nprogress from "nprogress";
import "nprogress/nprogress.css";
import {showFailToast, showToast} from "vant";

const userServiceInstance = axios.create({
  baseURL: BASE_URL_USER,
  timeout: 10000,
  headers: {
    "X-Requested-With": "XMLHttpRequest",
    "Content-Type": "application/json; charset=UTF-8",
  },
});
userServiceInstance.interceptors.request.use(
  config => {
    nprogress.start();
    const token = sessionStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = "Bearer " + token;
    }
    return config;
  },
  error => Promise.reject(error)
);

userServiceInstance.interceptors.response.use(
  response => {
    const {code, data, msg} = response.data;
    nprogress.done();
    switch (code) {
      case 200:
        return data;
      case 401:
        return Promise.reject({message: msg, msg: '用户信息过期\n请刷新页面后再试', redirect: '/'});
      case 500:
        return Promise.reject({message: msg, msg});
      default:
        return Promise.reject({message: msg, msg: "网络超时"});
    }
  },
  error => {
    nprogress.done();
    return Promise.reject({message: error, msg: '网络异常\n请稍后再试'});
  }
);

class $UserServiceHttp {
  constructor() {
  }

  static async get(url) {
    return userServiceInstance.get(url);
  }

  static async post(url, params = {}) {
    return userServiceInstance.post(url, params);
  }

  static async delete(url) {
    return userServiceInstance.delete(url);
  }

  static async put(url, params = {}) {
    return userServiceInstance.put(url, params);
  }
}

const declareServiceInstance = axios.create({
  baseURL: BASE_URL_DECLARE,
  timeout: 5000,
  headers: {
    "X-Requested-With": "XMLHttpRequest",
    "Content-Type": "application/json; charset=UTF-8",
  },
});
declareServiceInstance.interceptors.request.use(
  config => {
    nprogress.start();

    // if (import.meta.env.MODE === 'dev') {
    //   sessionStorage.setItem("token", "eyJhbGciOiJIUzUxMiJ9.eyJvcGVuaWQiOiJvU3RoWTFiWmtuY2xobkwwN3A0WXdDUzRCRUc4IiwidXNlcklkIjoxNTk3MzM0fQ.kI7--GIXq5kdztEQ4n9EVN5rXFyysDutkBxh20xYb1IRjfZtAEdbvm4Di7YRarVZHpWuO9P8ga74DiDAQ-pfnw");
    // }

    const token = sessionStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = ("Bearer " + token).replaceAll("\"", '');
    }
    return config;
  },
  error => Promise.reject(error)
);

declareServiceInstance.interceptors.response.use(
  response => {
    const {code, data, msg} = response.data;
    nprogress.done();
    switch (code) {
      case 200:
        return data;
      case 401:
        showFailToast({
          message: msg,
          onClose: function () {
            window.location.href = '/'
          }
        })
        return Promise.reject({message: msg, msg: '用户信息过期\n请刷新页面后再试', redirect: '/'});
      case 500:
        return Promise.reject({message: msg, msg});
      default:
        return Promise.reject({message: msg, msg: "网络超时"});
    }
  },
  error => {
    nprogress.done();
    return Promise.reject({message: error, msg: '网络异常\n请稍后再试'});
  }
);

class $DeclareServiceHttp {
  constructor() {
  }

  static async get(url) {
    return declareServiceInstance.get(url);
  }

  static async post(url, params = {}) {
    return declareServiceInstance.post(url, params);
  }

  static async delete(url) {
    return declareServiceInstance.delete(url);
  }

  static async put(url, params = {}) {
    return declareServiceInstance.put(url, params);
  }
}

export {$UserServiceHttp, $DeclareServiceHttp};
