import bable from 'rollup-plugin-babel';
import json from 'rollup-plugin-json';
// import path from 'path';


// const resolveFile = function(filePath) {
//     console.log(path.join(__dirname, '..', filePath));
//     return path.join(__dirname, '..', filePath)
// }
export default {
    input: 'src/littleVue/index.js',
    output: {
        file: 'dist/vue.js',
        format: 'iife',
        name: 'myBundle'
    },
    plugins: [
        json(),
        bable({
            exclude: 'node_modules/**'
        })
    ]
}