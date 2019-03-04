(function(){
    var defaultSetting = {
        "width": 600,
        "height": 400
    }
    function Swiper(options) {
        var self = this;
        this.setting = Object.assign(defaultSetting, options);
        this.container = document.getElementById('swiperContainer');
        this.list = this.container.getElementByTagName('ul')[0];
        this.prev = document.getElementById('swiperPrev');
        this.next = document.getElementById('swiperNext');

        this.prev.onclick = function () {
            self.move('left');
        }
        this.next.onclick = function () {
            self.move('right');
        }
        this.left = 0;
    }
    Swiper.prototype = {
        move: function(direction) {
            var self = this;
            if (direction === 'right') {
                
            }
        }
    }

    window.Swiper = Swiper;
}(window));

