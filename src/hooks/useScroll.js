import {
    onDeactivated,
    onMounted,
    onUnmounted,
    ref
} from 'vue';
import {
    throttle
} from 'underscore'

export default function useScroll(elRef) {
    let el = window

    const isReachBottom = ref(false)

    const clientHeight = ref(0)
    const scrollTop = ref(0)
    const scrollHeight = ref(0)

    // 节流
    const scrollListenerHandler = throttle(() => {
        if (el === window) {  //区分是window在滚动还是元素在滚动
            clientHeight.value = document.documentElement.clientHeight
            scrollTop.value = document.documentElement.scrollTop
            scrollHeight.value = document.documentElement.scrollHeight
        } else {
            clientHeight.value = el.clientHeight
            scrollTop.value = el.scrollTop
            scrollHeight.value = el.scrollHeight
        }
      
        //因为scrollTop是一个非整数，而scrollHeight和clientHeight是四舍五入的，因此确定滚动区域是否滚动到底的唯一方法是查看滚动量是否足够接近某个阈值
        if (Math.abs(scrollHeight.value - clientHeight.value - scrollTop.value) < 1) {
            console.log("滚动到底部了")
            isReachBottom.value = true
        }
    }, 100)

    onMounted(() => {
        if (elRef) el = elRef.value
        el.addEventListener("scroll", scrollListenerHandler)
    })


    onUnmounted(() => {
        window.removeEventListener("scroll", scrollListenerHandler)
    })

    return {
        isReachBottom,
        clientHeight,
        scrollTop,
        scrollHeight
    }
}