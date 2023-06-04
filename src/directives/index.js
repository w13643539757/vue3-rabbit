//定义懒加载
import { useIntersectionObserver } from '@vueuse/core'
export const lazyPlugin = {
    install (app) {
//定义全局变量
app.directive('img-lazy', {
    mounted (el, binding) {
        //el:指令绑定的元素 img
        //binding: binding.value 指令等于后面绑定的表达式的值 图片地址
       const {stop} = useIntersectionObserver(
            el,
            ([{
                isIntersecting
            }]) => {
                if(isIntersecting){
                    //进入视口区域
                    el.src = binding.value
                    stop()
                }
            }
        )
    }
})

    }
}