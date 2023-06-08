import request from "@/utils/http";


//封装加入购物车接口
export const insertCartAPI = ({ skuId, count }) => {
    return request({
        url: '/member/cart',
        method: 'POST',
        data: {
            skuId,
            count
        }
    })
}


//封装最新购物车列表接口
export const findNewCartListAPI = () => {
    return request({
        url: '/member/cart'
    })
} 

//封装删除接口
export const delCartListAPI = (ids) => {
    return request({
        url: '/member/cart',
        method: 'DELETE',
        data: {
            ids
        }
    })
}