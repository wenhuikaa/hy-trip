<template>
    <div class="home">
        <HomeNavBar />
        <div class="banner">
            <img src="@/assets/img/home/banner.webp" alt="">
        </div>
        <homeSearchBoxVue />
    </div>
</template>

<script setup>
import useHomeStore from '@/stores/modules/home';
import HomeNavBar from './cpns/home-nav-bar.vue';
import homeSearchBoxVue from './cpns/home-search-box.vue';

//发送网络请求
const homeStore = useHomeStore()
homeStore.fetchHotSuggestsData()
homeStore.fetchCategoriesData()
homeStore.fetchHouselistData()
</script>

<style lang="less" scoped>
.banner {
    img {
        width: 100%;
    }
}
</style>