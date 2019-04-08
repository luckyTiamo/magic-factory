<template>
    <div class="main">
        <swiper 
            :imageList="imageList"
        ></swiper>
    </div>
</template>
<script>
import Swiper from './vue/Swiper.vue'
export default {
    data() {
        return {
            imageList: ['../image/1.jpg', '../image/2.jpg', '../image/3.jpg', '../image/4.jpg']
        }
    },
    components: {
        Swiper
    }
}
</script>
