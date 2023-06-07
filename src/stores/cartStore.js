import { ref } from 'vue'
import { defineStore } from 'pinia'
export const useCartStore = defineStore('cart', () => {
    //1.定义state-cart list
    const cartList = ref([])
    //2.定义action-add Cart
    const addCart = (goods) => {
        //已添加过 count + 1
        //没有添加过 直接push
        //思路：通过匹配传递过来的商品对象中skuId能不能再cailist中找到，找到了就是添加过
        const item = cartList.value.find((item) => goods.skuId === item.skuId)
        if (item) {
            //找到了
            item.count++
        } else {
            //没找到
            cartList.value.push(goods)
        }
    }
    const delCart = (skuId) => {
        const idx = cartList.value.findIndex((item) => skuId === item.skuId)
        cartList.value.splice(idx, 1)
    }
    return {
        cartList,
        addCart,
        delCart
    }
}, {
    //持久化配置 存入ls
    persist: true

})