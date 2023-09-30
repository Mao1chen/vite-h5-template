import COS from "cos-js-sdk-v5";
import {nanoid} from "nanoid";

/**
 * @File     src/utils/tencent-cos.js
 * @Author   wangc
 * @Date     2023/7/13 14:14
 * @Desc     file description
 * @Demo     https://github.com/tencentyun/cos-js-sdk-v5/blob/master/demo/vueDemo/index.js
 */
/** 存储桶 */
export const Bucket = 'rrsb-1317970267';
/** 存储桶所在地域，必须字段 */
export const Region = 'ap-chengdu';
// SecretId 和 SecretKey请登录 https://console.cloud.tencent.com/cam/capi 进行查看和管理
export const cos = new COS({
  SecretId: 'AKID41rW3SiyNh0KgxCYyCAsYBsQnGfEuRp1',
  SecretKey: '65xVNCuTp06FMJf5McosoX4Rgu1sQp27',
});
const Prefix = 'cddyh-cos-'
// 超时设置
const MAX_TIMEOUT = 15 * 1000


export function upload(files) {
  let _MAX_TIMEOUT_TIMER = null
  const uploadFileList = [...files].map((file) => {
    const path = file.webkitRelativePath || file.name;
    return {
      Bucket,
      Region,
      Key: Prefix + nanoid(10) + '-' + path,
      Body: file,
    }
  });
  return new Promise((resolve, reject) => {
    cos.uploadFiles({
      files: uploadFileList,
      SliceSize: 1024 * 1024 * 2,    /* 设置大于2MB采用分块上传 */
      onProgress: function (info) {
        if (!_MAX_TIMEOUT_TIMER) {
          _MAX_TIMEOUT_TIMER = setTimeout(() => {
            console.log('文件上传超时')
            reject('文件上传超时')
          }, MAX_TIMEOUT)
        }
        let percent = parseInt(info.percent * 10000) / 100;
        let speed = parseInt(info.speed / 1024 / 1024 * 100) / 100;
        console.log('进度：' + percent + '%; 速度：' + speed + 'Mb/s;');
      },
      onFileFinish: function (err, data, options) {
        console.log(options.Key + '上传' + (err ? '失败' : '完成'));
        if (_MAX_TIMEOUT_TIMER) {
          clearTimeout(_MAX_TIMEOUT_TIMER)
        }
        if (err) {
          reject(err)
        }
      },
    }, (err, data) => {
      if (err) {
        console.log('上传失败', err);
        // return;
        reject(err)
      }
      // console.log(data)
      if (import.meta.env.VITE_ASSETS_PATH) {
        data.files.forEach(i => {
          // console.log(i.data.Location)
          // console.log(import.meta.env.VITE_ASSETS_PATH)
          // console.log(new URL(i.data.Location.replaceAll(/.+\//ig, ''), import.meta.env.VITE_ASSETS_PATH))
          i.data.Location = new URL(i.data.Location.replaceAll(/.+\//ig, ''), import.meta.env.VITE_ASSETS_PATH).href
        })
      }

      resolve(data)
      // 刷新列表前初始化
      // this.getFileList();
    })
  })
}
