(function(){
    var defaultSetting = {
        "width": 600,
        "height": 400
    }
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

        this.prev.onclick = function () {
            self.moveStep(-1);
        }
        this.next.onclick = function () {
            self.moveStep(1);
        }
        this.init();
    }
    Swiper.prototype = {
        init: function() {
            var self = this;
            var copyFirstItem = self.swiperItem[0].cloneNode(true);
            var copyLastItem = self.swiperItem[self.length - 1].cloneNode(true);
            self.list.appendChild(copyFirstItem);
            self.list.insertBefore(copyLastItem, self.swiperItem[0]);
            self.initNum = 1;
            self.left = self.initNum * self.offsetX;
            self.list.style.left = - self.left + 'px';
        },
        moveStep: function(num) {
            var self = this;
            self.initNum = self.initNum + num;
            if (self.initNum === 5) {
                self.initNum = 2;
                self.left = self.initNum * self.offsetX;
                self.list.style.transition = 'none';                
                self.list.style.left = -self.left + 'px';
            } else if (self.initNum === 0) {
                self.left = (self.initNum - self.length) * self.offsetX + 'px';
            }
            
            self.left = self.initNum * self.offsetX;
            setTimeout(function () {
                self.list.style.transition = "all .5s ease";
                self.list.style.left = -self.left + 'px';
            }, 20);
            self.highlightBullet();
        },
        moveTo: function(num) {
            var self = this;
            if (direction === 'right') {
                if (self.index === self.length - 1) {
                    return;
                }
                self.left += self.offsetX;
                self.index++;
            } else {
                if(self.index === 0) {
                    return;
                }
                self.left -= self.offsetX;
                self.index--;
            }
            self.list.style.left = -self.left;
            self.highlightBullet();
        },
        highlightBullet: function() {
            var self = this;
            self.pagination.getElementsByClassName('active')[0].classList.remove('active');
            self.pagination.children[self.index].classList.add('active');
        }
    }

    window.Swiper = Swiper;
}(window));

