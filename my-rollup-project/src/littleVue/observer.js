class Observer{
    constructor(value) {
        this.walk(value);
    }

    walk(obj) {
        
        let defineReactive = (obj, key, value) => {
            Object.defineProperty(obj, key, {
                set(newVal) {
                    if (newVal === value) {
                        return;
                    }
                    value = newVal;
                    observer(newVal);
                },
                get() {
                    return value;
                }
            })
        }

        Object.keys(obj).forEach((key) => {
            if (typeof obj[key] === 'object') {
                this.walk(obj[key]);
            }
            defineReactive(obj, key, obj[key]);
        })
    }
}

export default function observer(value) {
    if (!value || typeof value !== 'object') {
        return;
    }
    return new Observer(value);
}