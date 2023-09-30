import {createApp} from "vue";
import "@/assets/styles/main.css";
import "@/assets/styles/tailwind.css";
import App from "./App.vue";
import routes from "@/route/index";
import "vant/lib/index.css";
import * as wx from '@wecom/jssdk'
import dayjs from 'dayjs'
import {createRouter, createWebHistory} from "vue-router";
// import {$UserServiceHttp} from "@/http/index.js";
// import {getPOI} from "@/utils/index.js";

const router = createRouter({
  history: createWebHistory("/"), //or import.meta.env.VITE_BASE_PUBLIC_PATH
  routes,
});

/*if (import.meta.env.MODE === 'dev') {
  new VConsole()
}*/

const loginRequireRoute = ["/form"];
router.beforeEach(async (to, from) => {
  /* 路由发生变化修改页面title */

  /*let wait = dayjs('2023-07-19 00:00:01').unix()
  let now = dayjs().unix()
  if (now < wait && to.path !== '/wait' && !sessionStorage.getItem('nowait')) {
    return '/wait'
  }*/

  to.meta.title && (document.title = to.meta.title);
  if (!sessionStorage.getItem("user_info") && loginRequireRoute.includes(to.path)) {
    if (import.meta.env.MODE === 'dev') {
      return true
    } else {
      return "/apply"
    }
  }
  return true
});


const app = createApp(App)

/*wx.register({
  corpId: 'wxb62da6867b50ec7c',//公众号appid
  jsApiList: ['getLocation'], async getConfigSignature(url) {
    /!**
     * 根据 url 生成 config 签名
     *!/
    let resp = await $UserServiceHttp.get(`/user/initJSSDKConfig?url=${encodeURIComponent(url)}`)
    /!*TODO 需要补充逻辑*!/
    if (resp.signature) {
      let {timestamp, nonceStr, signature} = resp
      return {timestamp, nonceStr, signature}
    } else {
      return Promise.reject('no signature')
    }
    // return { /!*timestamp, nonceStr, signature*!/}
  }, onConfigSuccess() {
    wx.getLocation({
      type: 'gcj02', // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
      success: function (res) {
        let latitude = res.latitude; // 纬度，浮点数，范围为90 ~ -90
        let longitude = res.longitude; // 经度，浮点数，范围为180 ~ -180。
        let speed = res.speed; // 速度，以米/每秒计
        let accuracy = res.accuracy; // 位置精度
        console.log(res)
        sessionStorage.setItem('wx_location', JSON.stringify(res))
        getPOI(`${latitude},${longitude}`).then(resp => {
          sessionStorage.setItem('tx_location', JSON.stringify(resp))
        })
      }
    }).then(r => r)
  }
})*/


app.config.globalProperties.$wx = wx

app.use(router).mount("#app");
