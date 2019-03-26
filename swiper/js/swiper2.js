let timer = null;
const defaultSetting = {
    "width": 600,
    "height": 400
}
class Swiper {
    constructor(options) {
        this.setting = Object.assign(defaultSetting, options);
        this.container = document.getElementById('swiperContainer');
        this.list = this.container.getElementsByTagName('ul')[0];
        this.swiperItem = this.container.getElementsByClassName('swiper-item');
        this.length = this.swiperItem.length;
        this.prev = document.getElementById('swiperPrev');
        this.next = document.getElementById('swiperNext');

        this.pagination = document.getElementsByClassName('pagination')[0];

        this.left = 0;
        this.offsetX = this.setting.width;
        this.initLeft = -this.offsetX;
        this.index = 0;

        this.init();

        this.prev.addEventListener('click', () => {
            this.stopPlay();
            this.movePrev();
        }, false);

        this.next.addEventListener('click', () => {
            this.stopPlay();
            this.moveNext();
        }, false);

        // this.container.addEventListener('click', (e) => {
        //     console.log(e);
        //     if (e.target === '') {

        //     }
        // })

        this.list.addEventListener('mouseover', () => {
            this.stopPlay();
        }, false);
        this.list.addEventListener('mouseout', () => {
            this.autoPlay();
        }, false);
    }
    init() {
        const copyFirstItem = this.swiperItem[0].cloneNode(true);
        const copyLastItem = this.swiperItem[this.length - 1].cloneNode(true);
        this.list.appendChild(copyFirstItem);
        this.list.insertBefore(copyLastItem, this.swiperItem[0]);
        this.initNum = 1;
        this.left = this.initNum * this.offsetX;
        this.list.style.left = - this.left + 'px';
        this.autoPlay();
    }

    moveNext() {
        this.moveStep(1);
        const num = this.initNum === this.length + 1 ? 1 : this.initNum;
        this.highlightBullet(num);
    }

    movePrev() {
        this.moveStep(-1);
        const num = this.initNum === 0 ? this.length : this.initNum;
        this.highlightBullet(num);
    }

    moveStep(num) {
        if (this.initNum === this.length + 1 || this.initNum === 0) {
            if (this.initNum === this.length + 1) {
                this.initNum = 1;
            } else {
                this.initNum = this.length;
            }
            this.list.style.transition = "none";
            this.list.style.left = - this.initNum * this.offsetX + 'px';
        }
        this.initNum = this.initNum + num;
        this.left = this.initNum * this.offsetX;
        setTimeout(() => {
            this.list.style.transition = "all 1s ease-in-out";
            this.list.style.left = -this.left + 'px';
        }, 20);
    }

    highlightBullet(num) {
        this.pagination.getElementsByClassName('active')[0].classList.remove('active');
        this.pagination.children[num - 1].classList.add('active');
    }

    autoPlay() {
        timer = setInterval(() => {
            this.moveNext();
        }, 3000)
    }

    stopPlay() {
        clearInterval(timer);
    }
}