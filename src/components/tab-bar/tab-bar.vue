<template>
    <div class="tab-bar">
        <van-tabbar v-model="currentIndex" active-color="#ff9854" route>
            <template v-for="(item, index) in tabbarData" :key="index">
                <van-tabbar-item :to="item.path">
                    <span>{{ item.text }}</span>
                    <template #icon>
                        <img v-if="currentIndex !== index" :src="getAssetUrl(item.image)" alt="">
                        <img v-else :src="getAssetUrl(item.imageActive)" alt="">
                    </template>
                </van-tabbar-item>
            </template>
        </van-tabbar>
    </div>
</template>

<script setup>
import tabbarData from '@/assets/data/tabbar'
import { getAssetUrl } from '@/utils/load_assets'
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'

//监听路由改变时，找到对应的索引，设置currentIndex
const route = useRoute()
const currentIndex = ref(0)
watch(route, (newValue) => {
    const index = tabbarData.findIndex(item => item.path === newValue.path)
    if (index === -1) return
    currentIndex.value = index
})

</script>

<style lang="less" scoped>
.tab-bar {
    img {
        height: 28px;
    }
}
</style>