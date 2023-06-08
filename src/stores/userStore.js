import { ref } from 'vue'
import { loginAPI } from '@/apis/user'
import { defineStore } from 'pinia'
import { useCartStore } from './cartStore'
import { mergeCartAPI } from '@/apis/cart'
export const useUserStore = defineStore('user', () => {
  const cartStore = useCartStore()
  //1.定义管理用户数据的state
  const userInfo = ref({})
  //2.定义获取接口数据的action函数
  const getUserInfo = async ({ account, password }) => {
    const res = await loginAPI({ account, password })
    userInfo.value = res.result
    //合并购物车
    await mergeCartAPI(cartStore.cartList.map(item => {
      return {
        stuId: item.skuId,
        selected: item.selected,
        count: item.count
      }
    }))
    cartStore.updateCartList()
  }
  //退出时清空用户信息
  const clearUserInfo = () => {
    userInfo.value = {}
    //执行清楚购物车的action
    cartStore.clearCart()
  }

  //3.以对象的格式把state和action return
  return {
    userInfo,
    getUserInfo,
    clearUserInfo
  }
}, {
  //持久化配置 存入ls
  persist: true

})