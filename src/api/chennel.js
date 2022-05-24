import request from "@/utils/request";
export const getAllChennels = () => {
    return request({
        method: 'GET',
        url: '/app/v1_0/channels'
    })
} 