"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var timer = null;
var defaultSetting = {
    "width": 600,
    "height": 400
};

var Swiper = function () {
    function Swiper(options) {
        var _this = this;

        _classCallCheck(this, Swiper);

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
        this.thumbWrapper = this.thumbs.getElementsByTagName('ul')[0];
        this.thumbRect = this.thumbs.getElementsByClassName('rectangle')[0];
        this.thumbsLength = this.setting.thumbs.num;
        this.thumbsItem = this.thumbs.getElementsByClassName('thumbs-item');
        this.thumbsItemWidth = +((this.setting.width - (this.thumbsLength - 1) * 10) / this.thumbsLength).toFixed(2);

        for (var i = 0; i < this.thumbsItem.length; i++) {
            this.thumbsItem[i].style.width = this.thumbsItemWidth + 'px';
        }
        this.thumbRect.style.width = this.thumbsItemWidth + 'px';

        // 动态创建dom
        for (var _i = 0; _i < this.length; _i++) {
            var bulletDom = document.createElement('span');
            if (_i === 0) {
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

        this.prev.addEventListener('click', function () {
            _this.movePrev();
        }, false);

        this.next.addEventListener('click', function () {
            _this.moveNext();
        }, false);

        this.swiperMain.addEventListener('mouseover', function () {
            _this.stopPlay();
        }, false);
        this.swiperMain.addEventListener('mouseout', function () {
            _this.autoPlay();
        }, false);

        //  第几个按钮点击，还有更好的写法吗？
        var self = this;
        for (var _i2 = 0; _i2 < this.bullet.length; _i2++) {
            this.bullet[_i2].index = _i2;
            this.bullet[_i2].onclick = function () {
                self.moveToIndex(this.index);
            };
        }

        for (var _i3 = 0; _i3 < this.thumbsLength; _i3++) {
            this.thumbsItem[_i3].index = _i3;
            this.thumbsItem[_i3].onclick = function () {
                self.selectThumb(this.index);
            };
        }
    }

    _createClass(Swiper, [{
        key: "init",
        value: function init() {
            var copyFirstItem = this.swiperItem[0].cloneNode(true);
            var copyLastItem = this.swiperItem[this.length - 1].cloneNode(true);
            this.list.appendChild(copyFirstItem);
            this.list.insertBefore(copyLastItem, this.swiperItem[0]);
            this.initNum = 1;
            this.left = this.initNum * this.offsetX;
            this.list.style.transform = "translateX(" + -this.left + "px)";
            this.autoPlay();
        }
    }, {
        key: "moveNext",
        value: function moveNext() {
            this.moveStep(1);
            var num = this.initNum === this.length + 1 ? 1 : this.initNum;
            this.highlightBullet(num);
        }
    }, {
        key: "movePrev",
        value: function movePrev() {
            this.moveStep(-1);
            var num = this.initNum === 0 ? this.length : this.initNum;
            this.highlightBullet(num);
        }
    }, {
        key: "moveStep",
        value: function moveStep(num) {
            var _this2 = this;

            if (this.initNum === this.length + 1 || this.initNum === 0) {
                if (this.initNum === this.length + 1) {
                    this.initNum = 1;
                } else {
                    this.initNum = this.length;
                }
                this.list.style.transition = "none";
                this.list.style.transform = "translateX(" + -this.initNum * this.offsetX + "px)";
            }
            this.initNum = this.initNum + num;
            this.left = this.initNum * this.offsetX;
            setTimeout(function () {
                _this2.list.style.transition = "all .8s ease";
                _this2.list.style.transform = "translateX(" + -_this2.left + "px)";
            }, 20);
        }
    }, {
        key: "moveToIndex",
        value: function moveToIndex(index) {
            var currentIndex = index + 1;
            var currentNum = this.initNum;
            var diff = 0;
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
    }, {
        key: "highlightBullet",
        value: function highlightBullet(num) {
            this.pagination.getElementsByClassName('active')[0].classList.remove('active');
            this.pagination.children[num - 1].classList.add('active');
            this.selectThumb(num - 1);
        }
    }, {
        key: "autoPlay",
        value: function autoPlay() {
            var _this3 = this;

            timer = setInterval(function () {
                _this3.moveNext();
            }, 3000);
        }
    }, {
        key: "stopPlay",
        value: function stopPlay() {
            clearInterval(timer);
        }
    }, {
        key: "selectThumb",
        value: function selectThumb(index) {
            var offsetX = this.thumbsItem[index].offsetLeft;
            if (offsetX > this.setting.width) {
                this.thumbWrapper.style.transform = "translateX(" + (this.setting.width - offsetX - this.thumbsItemWidth) + "px)";
            } else if (offsetX === 0) {
                this.thumbWrapper.style.transform = "translateX(0px)";
            }
            this.thumbRect.style.left = offsetX + 'px';

            this.moveToIndex(index);
        }
    }]);

    return Swiper;
}();
