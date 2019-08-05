'use strict';

class InfiniteScroll {
  constructor(options) {
    this.options = Object.assign({}, options);
    this.$el = document.getElementById(this.options.$el);
    this.downThread = this.options.downThread || 20;
    this._scrollHandler = null;
    this.ended = false;
    this.init();
  }

  init() {
    debugger;

    this._scrollHandler = () => {
      this.scrollLoad();
    };

    this.$el.addEventListener('scroll', this._scrollHandler, false);

    this._scrollHandler();
  }

  scrollLoad() {
    this.scrollTop = this.$el.scrollTop;
    this.clientHeight = this.$el.clientHeight;
    this.scrollHeight = this.$el.scrollHeight;

    if (this.scrollHeight - this.clientHeight - this.scrollTop <= this.downThread) {
      console.log('>>>', this.scrollHeight, this.clientHeight, this.scrollTop);
      this.load();
    }
  }

  load() {
    if (this.ended) {
      return;
    }

    if (this.options.load) {
      return Promise.resolve().then(() => this.options.load()).then(result => {
        if (result === false) {
          this.ended = true;
        } else {
          this.scrollLoad();
        }
      });
    }
  }

  destroy() {
    this.$el.removeEventListener('scroll', this._scrollHandler, false);
    this.$el = null;
    this._scrollHandler = null;
    this.downThread = null;
    this.options = null;
    this.ended = null;
  }

} // export default function createInfiniteScroll(options) {
//     return new InfiniteScroll(options)
// }


window.createInfiniteScroll = function (options) {
  new InfiniteScroll(options);
};
