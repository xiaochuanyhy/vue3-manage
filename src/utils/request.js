import axios from 'axios'
import cookie from 'js-cookie'
import notification from 'ant-design-vue'
// 允许只触发一次的错误提示，避免触发多次不必要的错误提示
import { debounce } from 'throttle-debounce'
const errorMessage = debounce(500, () => {
  {
    notification.error({
      message: '出错啦',
      duration: 5,

    })
  }
})

// 是否允许跨域携带 cookie 值
axios.defaults.withCredentials = false
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'

// 创建axios
// 请求头可以在数据代理中进行设置  可以查看 config.js
// 这样做方便在各种环境下进行配置 只需要更改数据代理即可
const service = axios.create({
  baseURL:'http://127.0.0.1:3007',
  timeout:30000
})

// 请求拦截器
service.interceptors.request.use(
  // 成功的回调
  (config) => {
    // if(config.data === undefined || config.data === null){
    //   config.data ={}
    // }
    config.headers.Authorization = cookie.get('token')
    return config
  },
  // 失败的回调
  (error) => {
    errorMessage()
    console.log(error);
    return Promise.reject(error)
  }
)

// 响应拦截器
service.interceptors.response.use(
  // 成功的回调
  (response) =>{
    if(response){
      return response
    }
    else{
      return Promise.reject(res)
    }
  },
  // 失败的回调
  (err) =>{
    errorMessage()
    console.log(err);
    return Promise.reject(err)

  }
)

// 记得导出创建的axios 否则会报错
export default service