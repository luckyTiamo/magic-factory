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
        this.length = this.container.getElementsByClassName('swiper-item').length;
        this.prev = document.getElementById('swiperPrev');
        this.next = document.getElementById('swiperNext');

        this.pagination = document.getElementsByClassName('pagination');

        this.left = 0;
        this.offsetX = this.setting.width;
        this.index = 0;

        this.prev.onclick = function () {
            self.move('left');
        }
        this.next.onclick = function () {
            self.move('right');
        }
    }
    Swiper.prototype = {
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
            self.list.style.transform = 'translateX('+ -self.left + 'px)';
        },
        highlightBullet: function() {
            
        }
    }

    window.Swiper = Swiper;
}(window));

