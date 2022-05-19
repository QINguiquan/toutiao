import axios from "axios";
const request = axios.create({
    // baseURL:'http://ttapi.research.itcast.cn/'
    // 备用地址
    // baseURL:'http://toutiao-app.itheima.net/'
    baseURL:'http://api-toutiao-web.itheima.net/'
})
export default request