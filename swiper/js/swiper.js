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
            self.move('left');
        }
        this.next.onclick = function () {
            self.move('right');
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
            self.left = self.offsetX;
            self.list.style.left = - self.left + 'px';
        },
        move: function(direction) {
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

