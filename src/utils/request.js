import axios from "axios";
import { Promise } from "core-js";
import store from "@/store";
const request = axios.create({
    // baseURL:'http://ttapi.research.itcast.cn/'
    // 备用地址
    // baseURL:'http://toutiao-app.itheima.net/'
    baseURL: 'http://api-toutiao-web.itheima.net/'
})



// 请求拦截器
request.interceptors.request.use(
    // 请求发起会经过这个函数
    function (config) {
        const { user } = store.state
        if (user && user.token) {
            config.headers.Authorization = `Bearer ${store.state.user.token}`
        } return config
    },
    // 请求出错（还没有发出去）进入这个函数
    function (error) {
        return Promise.reject(error)

    }
)

export default request