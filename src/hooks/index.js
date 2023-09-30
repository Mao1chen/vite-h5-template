/**
 * @File     src/hooks/index.js
 * @Author   wangc
 * @Date     2023/7/17 19:11
 * @Desc     file description
 */

import {getCurrentInstance} from 'vue'

export function useGlobalProperties() {
  const {emit, appContext: {app: {config: {globalProperties}}}} = getCurrentInstance()
  return {...globalProperties}
}
