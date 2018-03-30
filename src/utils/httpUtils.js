import Axios from 'axios'
import Qs from 'qs'
import $ from 'jquery'
import { getMsg } from '@/utils/httpReponseCode.js'
import { Message } from 'element-ui'
let baseURL = process.env.NODE_ENV === 'production' ? '' : '/api'

Axios.defaults.baseURL = baseURL

function handlerError (status, code) {
  switch (status) {
    case 404:
      /* let msg404 = getMsg(status, code)
      if (msg404) {
        Message.error(msg404)
      } */
      break
    case 401:
      let msg401 = getMsg(status, code)
      if (msg401) {
        Message.error(msg401)
      }
      break
    case 403:
      let msg403 = getMsg(status, code)
      if (msg403) {
        Message.error(msg403)
      }
      break
    case 409:
      let msg409 = getMsg(status, code)
      if (msg409) {
        Message.error(msg409)
      }
      break
    case 500:
      let msg500 = getMsg(status, code)
      if (msg500) {
        Message.error(msg500)
      }
      break
  }
}

Axios.interceptors.request.use((config) => {
  config.data = Qs.stringify(config.data)
  return config
}, function (error) {
  return Promise.reject(error)
})
// 添加响应拦截器
Axios.interceptors.response.use(function (response) {
  // 对响应数据做点什么
  return response
}, function (error) {
  // 对响应错误做点什么
  if (error.response) {
    handlerError(error.response.status, error.response.data.code)
  }
  return Promise.reject(error)
})
/**
 * 封装get方法
 * @param url
 * @param data
 * @returns {Promise}
 */
export function get (url, params = {}) {
  return new Promise((resolve, reject) => {
    Axios.get(url, {
      params: params
    }).then(response => {
      resolve(response)
    }).catch(err => {
      reject(err)
    })
  })
}

/**
 * 同步获取后台返回的数据
 * @param url
 * @param params
 * @returns {Promise}
 */
export function getSync (url, params = {}) {
  let resultData
  $.ajax({
    url: baseURL + url,
    data: params,
    type: 'GET',
    cache: false,
    async: false,
    success: function (data, textStatus) {
      resultData = data
    },
    error: function (XMLHttpRequest, textStatus, errorThrown) {
      if (XMLHttpRequest) {
        handlerError(XMLHttpRequest.status, XMLHttpRequest.responseText.code)
      }
    }

  })
  return resultData
}
/**
 * 封装post请求
 * @param url
 * @param data
 * @returns {Promise}
 */

export function post (url, data = {}) {
  return new Promise((resolve, reject) => {
    Axios.post(url, data)
      .then(response => {
        resolve(response)
      }, err => {
        reject(err)
      })
  })
}
/**
 * 封装put请求
 * @param url
 * @param data
 * @returns {Promise}
 */

export function put (url, data = {}) {
  return new Promise((resolve, reject) => {
    Axios.put(url, data)
      .then(response => {
        resolve(response)
      }, err => {
        reject(err)
      })
  })
}
/**
 * 封装del方法
 * @param url
 * @param data
 * @returns {Promise}
 */
export function del (url, params = {}) {
  return new Promise((resolve, reject) => {
    Axios.delete(url, {
      params: params
    }).then(response => {
      resolve(response)
    }).catch(err => {
      reject(err)
    })
  })
}
const http = {
  get: get,
  post: post,
  delete: del,
  put: put,
  getSync: getSync
}
export default http
