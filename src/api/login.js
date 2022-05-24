
import request from "@/utils/request";
export const login = data => {
    return request({
        method: 'POST',
        url: '/app/v1_0/authorizations',
        data
    })
}




// 发送验证码
export const sendSm = mobile => {
    return request({
        method: 'GET',
        url: `/app/v1_0/sms/codes/${mobile}`
    })
}



// 用户自己的信息 
export const getUserInfo = () => {
    return request({
        method: 'GET',
        url: '/app/v1_0/user',
        // Authorization:`Bearer ${store.state.user.token}`
    })
} 

// 获取用户频道列表
export const getUserChannerls = () => {
    return request({
        method: 'GET',
        url:'/app/v1_0/user/channels',
    }) 
} 