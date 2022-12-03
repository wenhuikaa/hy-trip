<template>
    <div class="city-group">
        <van-index-bar>
            <template v-for="(group,index) in groupData.cities" :key="index">
                <van-index-anchor :index="group.group" />
                <div class="list">
                    <template v-for="(city,indey) in group.cities" :key="indey">
                        <div class="city">
                            <van-cell :title="city.cityName" />
                        </div>
                    </template>
                </div>
            </template>
        </van-index-bar>
    </div>
</template>

<script setup>

defineProps({
    groupData: {
        type: Object,
        default: () => ({})
    }
})

</script>

<style lang="less" scoped>

</style>