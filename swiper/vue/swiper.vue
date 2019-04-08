<template>
    <div class="swiper-main">
        <div class="container" id="swiperContainer">
            <ul class="swiper-wrapper">
                <li class="swiper-item" 
                    v-for="(item, index) in imageList" 
                    :key="index" 
                    :data-index='index'>
                    <img :src="item">
                </li>
            </ul>
            <div class="pagination"></div>
            <div class="btn prev-btn" id="swiperPrev"></div>
            <div class="btn next-btn" id="swiperNext"></div>
        </div>
        <div class="thumbs" id="swiperThumbs">
            <ul class="thumbs-wrapper">
                <li class="thumbs-item" 
                    :class="{'active': currentIndex === index}" 
                    v-for="(item, index) in imageList" 
                    :key="index">
                    <img :src="item">
                </li>
                <div class="rectangle"></div>
            </ul>
        </div>
    </div>    
</template>

<script>
export default {
    data() {
        return {
            currentIndex: 0
        }
    },
    props: ['imageList']
}
</script>
<style>
    ul, li {
        list-style: none;
        padding: 0;
        margin: 0;
    }
    .container {
        width: 600px;
        height: 400px;
        overflow: hidden;
        position: relative;
        margin: 10px auto 0;
    }
    .swiper-wrapper {
        /* width: 3600px; */
        height: 100%;
        /* transition: all 0.5s ease; */
        position: relative;
    }
    .swiper-item {
        width: 600px;
        height: 400px;
        float: left;
    }
    .swiper-item img {
        width: 100%;
        height: 100%;
    }
    .pagination {
        position: absolute;
        bottom: 10px;
        width: 100%;
        text-align: center;
    }

    .bullet {
        width: 8px;
        height: 8px;
        display: inline-block;
        border-radius: 100%;
        background: #000;
        opacity: .2;
        cursor: pointer;
        margin-right: 6px;
    }
    .bullet.active {
        opacity: 1;
        background: #4680ff;
    }
    .btn {
        width: 30px;
        height: 55px;
        background: rgba(23, 23, 23, 0.65);
        position: absolute;
        top: 50%;
        margin-top: -27px;
        cursor: pointer;
    }
    .prev-btn{
        left: 0;
    }
    .next-btn {
        right: 0;
    }
    .thumbs {
        width: 600px;
        height: 133px;
        background: #fff;
        margin: 0 auto;
        padding-top: 10px;
        overflow: hidden;
    }
    .thumbs-wrapper {
        width: 805px;
        height: 100%;
        position: relative;
        transition: all 0.5s ease;
    }
    .thumbs-item {
        width: 200px;
        height: 133px;
        float: left;
        margin-left: 10px;
        box-sizing: border-box;
        cursor: pointer;
    }

    .thumbs-item:first-child {
        margin-left: 0;
    }

    .thumbs-item img {
        width: 100%;
        height: 100%;
    }
    .rectangle {
        width: 200px;
        height: 133px;
        border: 2px solid #fe8f60;
        box-sizing: border-box;
        position: absolute;
        left: 0;
        top: 0;
        transition: all 0.5s ease;
    }
</style>


