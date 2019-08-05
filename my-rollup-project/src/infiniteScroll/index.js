class InfiniteScroll {
    constructor(options) {
        this.options = Object.assign({}, options)
        this.$el = document.getElementById(this.options.$el);
        this.downThread = this.options.downThread || 20;
        this.init();
    }
    init() {
        this.$el.addEventListener('scroll', () => {
            this.scrollLoad();
        });
    }
    scrollLoad() {
        this.scrollTop = +this.$el.scrollTop;
        this.clientHeight = +this.$el.clientHeight;
        this.scrollHeight = +this.$el.scrollHeight;

        if (this.scrollHeight - this.clientHeight - this.scrollTop <= this.downThread) {
            this.load();
        }
    }
    load() {
        return this.options.load();
    }
    destroy() {
        this.$el = null;
        this.downThread = 20;
        document.getElementById(this.$el).removeEventListener('scroll', () => {
            this.scrollLoad();
        });
    }
}
// export default function createInfiniteScroll(options) {
//     return new InfiniteScroll(options)
// }

window.createInfiniteScroll = function (options) {
    new InfiniteScroll(options);
}