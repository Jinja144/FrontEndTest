import vue from 'vue';
import app from './App.vue';

new vue({
    el: '#app',
    render: h => h(app),
}).$mount('#app');
