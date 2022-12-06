<template>
    <div class="city-group">
        <van-index-bar :index-list="indexList" highlight-color="#ff9587">
            <van-index-anchor index="热门" />
            <div class="list">
                <template v-for="(city, index) in groupData.hotCities">
                    <div class="city" @click="cityClick(city)">
                        {{ city.cityName }}
                    </div>
                </template>
            </div>
            <template v-for="(group, index) in groupData.cities" :key="index">
                <van-index-anchor :index="group.group" />
                <template v-for="(city, indey) in group.cities" :key="indey">
                    <van-cell :title="city.cityName" @click="cityClick(city)" />
                </template>
            </template>
        </van-index-bar>
    </div>
</template>

<script setup>
import useCityStore from '@/stores/modules/city';
import { computed } from 'vue';
import { useRouter } from 'vue-router';

const props = defineProps({
    groupData: {
        type: Object,
        default: () => ({})
    }
})

const indexList = computed(() => {
    let list = props.groupData.cities.map(_ => _.group)
    list.unshift('#')
    return list
})

const router = useRouter()
const cityStore = useCityStore()
const cityClick = (city) => {
    cityStore.currentCity = city
    router.back()
}

</script>

<style lang="less" scoped>
.list {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    padding: 10px;
    padding-right: 25px;

    .city {
        width: 70px;
        height: 28px;
        border-radius: 14px;
        background-color: #fff4ec;
        font-size: 12px;
        color: #000;
        text-align: center;
        line-height: 28px;
        margin: 10px 0;
    }
}
</style>