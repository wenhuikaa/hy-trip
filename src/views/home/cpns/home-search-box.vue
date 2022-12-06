<template>
    <div class="search-box">
        <!--位置信息-->
        <div class="location">
            <div class="city" @click="cityClick">{{ currentCity.cityName }}</div>
            <div class="position" @click="positionClick">
                <span class="text">我的位置</span>
                <img src="@/assets/img/home/icon_location.png" alt="">
            </div>
        </div>
        <!--日期范围-->
        <div class="section date-range bottom-gray-line " @click="showCalendar = true">
            <div class="start">
                <div class="date">
                    <span class="tip">入住</span>
                    <span class="time">{{ startDateStr }}</span>
                </div>
                <div class="stay">共{{ stayCount }}晚</div>
            </div>
            <div class="end">
                <div class="date">
                    <span class="tip">离店</span>
                    <span class="time">{{ endDateStr }}</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import useCityStore from "@/stores/modules/city";
import { storeToRefs } from "pinia";
import { useRouter } from "vue-router"
import { ref } from 'vue';
import { formatMonthDay } from '@/utils/format_date';

const router = useRouter();
const cityClick = () => {
    router.push('/city')
}
const positionClick = () => {
    navigator.geolocation.getCurrentPosition(res => {
        console.log(res)
    }, err => {
        console.log(err)
    })
}

//当前城市
const cityStore = useCityStore()
const { currentCity } = storeToRefs(cityStore)

//日期范围
const showCalendar = ref(false)
const nowDate = new Date()
const startDateStr = ref(formatMonthDay(nowDate))
const newDate = nowDate.setDate(nowDate.getDate() + 1)
const stayCount = ref(0)
const endDateStr = ref(formatMonthDay(newDate))
</script>

<style lang="less" scoped>
.location {
    display: flex;
    align-items: center;
    height: 44px;
    padding: 0 20px;

    .city {
        flex: 1;
        color: #333;
        font-size: 15px;
    }

    .position {
        width: 74px;
        display: flex;
        align-items: center;

        .text {
            position: relative;
            top: 2px;
            font-size: 12px;
        }

        img {
            margin-left: 6px;
            width: 18px;
            height: 18px;
        }
    }
}

.section {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    padding: 0 20px;
    color: #999;
    height: 44px;

    .start {
        flex: 1;
        display: flex;
        height: 44px;
        align-items: center;
    }

    .end {
        min-width: 30%;
        padding-left: 20px;
    }

    .date {
        display: flex;
        flex-direction: column;

        .tip {
            font-size: 12px;
            color: #999;
        }

        .time {
            margin-top: 3px;
            color: #333;
            font-size: 15px;
            font-weight: 500;
        }
    }
}

.date-range {
    height: 44px;

    .stay {
        flex: 1;
        text-align: center;
        font-size: 12px;
        color: #666;
    }
}
</style>