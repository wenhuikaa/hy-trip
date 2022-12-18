<template>
    <div class="home" ref="homeRef">
        <HomeNavBar />
        <div class="banner">
            <img src="@/assets/img/home/banner.webp" alt="">
        </div>
        <home-search-box />
        <home-categories />
        <home-content />
        <!-- <div class="search-bar" v-if="isShowSearchBar">
            <search-bar />
        </div> -->
    </div>
</template>

<script setup>
import { onActivated, ref, watch } from 'vue'
import useHomeStore from '@/stores/modules/home';
import HomeNavBar from './cpns/home-nav-bar.vue';
import HomeSearchBox from './cpns/home-search-box.vue';
import HomeCategories from './cpns/home-categories.vue';
import HomeContent from './cpns/home-content.vue';
import SearchBar from '@/components/search-bar/search-bar.vue'

import useScroll from '@/hooks/useScroll'
import { computed } from '@vue/reactivity';

//发送网络请求
const homeStore = useHomeStore()
homeStore.fetchHotSuggestsData()
homeStore.fetchCategoriesData()
homeStore.fetchHouselistData()

//滚动到底部
const homeRef = ref()
const { isReachBottom, scrollTop } = useScroll(homeRef)
watch(isReachBottom, (newValue) => {
    if (newValue) {
        homeStore.fetchHouselistData().then(() => {
            isReachBottom.value = false
        })
    }
})

//搜索框显示的控制
const isShowSearchBar = computed(() => {
    return scrollTop.value >= 360
})

//跳转回home时，保留原来的位置
onActivated(() => {
    homeRef.value?.scrollTop({
        top: scrollTop.value
    })
})
</script>

<style lang="less" scoped>
.home {
    height: 100vh;
    overflow-y: auto;
    box-sizing: border-box;
    padding-bottom: 60px;
}

.banner {
    img {
        width: 100%;
    }
}
</style>