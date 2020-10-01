import Vue from './vue.esm.browser.js';

const app = new Vue({
    el: '#app',

    data() {
        return {
            buttonNum: 0
        }
    },

    methods: {
        increaseNum() {
            this.buttonNum++;
        }
    }
})
// Рекомендуется использовать МЕТОД в качестве обработчика события
