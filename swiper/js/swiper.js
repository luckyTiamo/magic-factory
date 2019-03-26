(function(){
    var defaultSetting = {
        "width": 600,
        "height": 400
    }
    var timer = null;
    function Swiper(options) {
        var self = this;
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

        this.prev.onclick = function(){
            self.movePrev();
        }    
        this.next.onclick = function () {
            self.moveNext();
        }
        this.init();
        this.list.addEventListener('mouseover', self.stopPlay);
        this.list.addEventListener('mouseout', function() {
            self.autoPlay();
        }, false);

        for (var i = 0; i < this.pagination.length; i++) {
            //利用立即调用函数，解决闭包的副作用，传入相应的index值
            (function (i) {
                this.pagination[i].onclick = function () {
                    console.log(i);
                } 
            })(i);
        }
    }
    Swiper.prototype = {
        init() {
            var self = this;
            var copyFirstItem = self.swiperItem[0].cloneNode(true);
            var copyLastItem = self.swiperItem[self.length - 1].cloneNode(true);
            self.list.appendChild(copyFirstItem);
            self.list.insertBefore(copyLastItem, self.swiperItem[0]);
            self.initNum = 1;
            self.left = self.initNum * self.offsetX;
            self.list.style.left = - self.left + 'px';
            self.autoPlay();
        },
        moveNext() {
            var self = this;
            self.moveStep(1);
            var num = self.initNum === self.length + 1 ? 1 : self.initNum;
            self.highlightBullet(num);
        },
        movePrev() {
            var self = this;
            self.moveStep(-1);
            var num = self.initNum === 0 ? self.length : self.initNum;
            self.highlightBullet(num);
        },
        moveStep(num) {
            var self = this;
            if (self.initNum === self.length + 1 || self.initNum === 0) {
                if (self.initNum === self.length + 1) {
                    self.initNum = 1;
                } else {
                    self.initNum = self.length;
                }
                self.list.style.transition = "none";
                self.list.style.left = - self.initNum * self.offsetX + 'px';
            }
            self.initNum = self.initNum + num;
            self.left = self.initNum * self.offsetX;
            setTimeout(function () {
                self.list.style.transition = "all .5s ease";
                self.list.style.left = -self.left + 'px';
            }, 20);
        },
        highlightBullet(num) {
            var self = this;
            self.pagination.getElementsByClassName('active')[0].classList.remove('active');
            self.pagination.children[num - 1].classList.add('active');
        },
        autoPlay(){
            var self = this;
            timer = setInterval(function(){
                self.moveNext();
            }, 1500)
        },
        stopPlay() {
            clearInterval(timer);
        }
    }

    window.Swiper = Swiper;
}(window));

