/**
 * @File     src/utils/index.js
 * @Author   wangc
 * @Date     2023/7/16 11:51
 * @Desc     file description
 */
import axios from 'axios'

/**
 * 获取图片地址
 * @param path 前面不带斜杆的地址,比如:form/bg.png
 * @param isLocal 强制获取本地资源
 * @return {string}
 */
export function getImgUrl(path, isLocal = false) {
  if (import.meta.env.MODE === 'dev' || isLocal) {
    return new URL(`../assets/images/${path}`, import.meta.url).href
  }
  if (import.meta.env.VITE_ASSETS_PATH && !isLocal) {
    return `${import.meta.env.VITE_ASSETS_PATH}/images/${path}`
  }
  return new URL(`../assets/images/${path}`, import.meta.url).href
}

/**
 * 获取地图POI
 * @param locationStr 39.984154,116.307490
 * @return {Promise<axios.AxiosResponse<any>>}
 */
export function getPOI(locationStr) {
  let key = import.meta.env.VITE_MAP_KEY
  let url = ''
  if (!locationStr) {
    return Promise.reject('error')
  }
  if (import.meta.env.MODE === 'dev') {
    url = `/ws/geocoder/v1/?location=${locationStr}&key=${key}&get_poi=0`
  } else {
    url = `https://apis.map.qq.com/ws/geocoder/v1/?location=${locationStr}&key=${key}&get_poi=0`
  }
  return axios.get(url).then(resp => {
    return resp.data.result
  })
}

/**
 * 延时
 * @param duration 毫秒-ms
 * @return {Promise<unknown>}
 */
export function sleep(duration) {
  return new Promise((resolve) => {
    setTimeout(resolve, duration)
  })
}

/**
 * 范围随机数
 * @param max
 * @param min
 * @return {number}
 */
export function randomNum(max, min = 0) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}
