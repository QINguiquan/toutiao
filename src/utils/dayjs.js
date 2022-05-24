import dayjs from "dayjs";
import 'dayjs/locale/zh-cn'
import Vue from 'vue'
// 距离当前时间的插件
import relativeTime from 'dayjs/plugin/relativeTime'
// 配置使用处理时间的插件
dayjs.extend(relativeTime)
// 中文配置
dayjs.locale('zh-cn')
Vue.filter('relativeTime', value => {
    // console.log(value);
    return dayjs().to(dayjs(value))
})
// console.log(dayjs() 