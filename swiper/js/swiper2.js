let timer = null;
const defaultSetting = {
    "width": 600,
    "height": 400
}
class Swiper {
    constructor(options) {
        this.setting = Object.assign(defaultSetting, options);
        this.container = document.getElementById(this.setting.container);
        this.swiperMain = this.container.parentNode;
        this.list = this.container.getElementsByTagName('ul')[0];
        this.swiperItem = this.container.getElementsByClassName('swiper-item');
        this.length = this.swiperItem.length;
        this.prev = document.getElementById(this.setting.prevBtn);
        this.next = document.getElementById(this.setting.nextBtn);

        this.pagination = document.querySelector(this.setting.pagination);

        this.thumbs = document.getElementById(this.setting.thumbs.el);
        this.thumbRect = this.thumbs.getElementsByClassName('rectangle')[0];
        this.thumbsLength = this.setting.thumbs.num;
        this.thumbsItem = this.thumbs.getElementsByClassName('thumbs-item');
        this.thumbsItemWidth = ((this.setting.width - (this.thumbsLength - 1) * 10) / this.thumbsLength).toFixed(2);

        for (let i = 0; i < this.thumbsItem.length; i++) {
            this.thumbsItem[i].style.width = this.thumbsItemWidth + 'px';
        }
        this.thumbRect.style.width = this.thumbsItemWidth + 'px';
    

        // 动态创建dom
        for (let i = 0; i < this.length; i++) {
            let bulletDom = document.createElement('span');
            if (i === 0) {
                bulletDom.className = 'bullet active';

            } else {
                bulletDom.className = 'bullet';
            }
            this.pagination.append(bulletDom);
        }

        this.bullet = document.getElementsByClassName('bullet');
        this.list.style.width = (this.length + 2) * this.setting.width;

        this.left = 0;
        this.offsetX = this.setting.width;
        this.initLeft = -this.offsetX;
        this.index = 0;

        this.init();

        this.prev.addEventListener('click', () => {
            this.movePrev();
        }, false);

        this.next.addEventListener('click', () => {
            this.moveNext();
        }, false);

        this.swiperMain.addEventListener('mouseover', () => {
            this.stopPlay();
        }, false);
        this.swiperMain.addEventListener('mouseout', () => {
            this.autoPlay();
        }, false);

        //  第几个按钮点击，还有更好的写法吗？
        const self = this;
        for (let i = 0; i < this.bullet.length; i++) {
            this.bullet[i].index = i;
            this.bullet[i].onclick = function () {
                self.moveToIndex(this.index);
            }
        }

        for (let i = 0; i < this.thumbsLength; i++) {
            this.thumbsItem[i].index = i;
            this.thumbsItem[i].onclick = function () {
                self.selectThumb(this.index);
            }
        }
    }

    init() {
        const copyFirstItem = this.swiperItem[0].cloneNode(true);
        const copyLastItem = this.swiperItem[this.length - 1].cloneNode(true);
        this.list.appendChild(copyFirstItem);
        this.list.insertBefore(copyLastItem, this.swiperItem[0]);
        this.initNum = 1;
        this.left = this.initNum * this.offsetX;
        this.list.style.transform = `translateX(${-this.left}px)`;
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
            this.list.style.transform = `translateX(${- this.initNum * this.offsetX}px)`;
        }
        this.initNum = this.initNum + num;
        this.left = this.initNum * this.offsetX;
        setTimeout(() => {
            this.list.style.transition = "all .8s ease";
            this.list.style.transform = `translateX(${-this.left}px)`;
        }, 20);
    }

    moveToIndex(index) {
        let currentIndex = index + 1;
        let currentNum = this.initNum;
        let diff = 0;
        if (currentNum === this.length + 1) {
            currentNum = 1;
        }
        if (currentNum === currentIndex) {
            return;
        } else if (currentIndex > currentNum) {
            diff = currentIndex - currentNum;
        } else {
            diff = Math.abs(currentNum - this.length) + currentIndex;            
        }
        this.moveStep(diff);
        this.highlightBullet(currentIndex);
    }

    highlightBullet(num) {
        this.pagination.getElementsByClassName('active')[0].classList.remove('active');
        this.pagination.children[num - 1].classList.add('active');
        this.selectThumb(num - 1);
    }

    autoPlay() {
        timer = setInterval(() => {
            this.moveNext();
        }, 3000)
    }

    stopPlay() {
        clearInterval(timer);
    }

    selectThumb(index) {
        this.thumbRect.style.left = this.thumbsItem[index].offsetLeft + 'px';
        this.moveToIndex(index);
    }
}