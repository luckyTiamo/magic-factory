import observer from './observer';
import proxy from './proxy';

class Vue {
    constructor(options) {
        const vm = this;
        vm.$options = options;
        for (let key in vm._data) {
            proxy(vm, '_data', key);
        }
        let data = vm._data = vm.$options.data;
        observer(vm._data);
    }
}

window.createVue = function(options) {
    new Vue(options);
    console.log(options);
}