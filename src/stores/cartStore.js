import { ref, computed } from 'vue'
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
    //计算属性
    //1.总的数量 所有项的count之和
    const allCount = computed(() => cartList.value.reduce((a, c) => a + c.count, 0))
    //2.总的价格 所有项的count*price之和
    const allPrice = computed(() => cartList.value.reduce((a, c) => a + c.count * c.price, 0))
    return {
        cartList,
        allCount,
        allPrice,
        addCart,
        delCart
    }
}, {
    //持久化配置 存入ls
    persist: true

})