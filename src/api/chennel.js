import request from "@/utils/request";
export const getAllChennels = () => {
    return request({
        method: 'GET',
        url: '/app/v1_0/channels'
    })
}



export const addUserChannel = (channel) => {
    return request({
        method: 'PATCH',
        url: '/app/v1_0/user/channels',
        data: {
            channels: [channel]
        }
    })
} 


export const delUserChannel = (channel) => {
    return request({
        method: 'DELETE',
        url: `/app/v1_0/user/channels/${channel}`,
       
    })
}