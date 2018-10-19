import Vue from 'vue';
import init from 'assets/js/init.js'
import VueSignature from 'vue-signature-pad';
import App from './App';

Vue.use(init);
Vue.use(VueSignature);
Vue.config.productionTip=false;

new Vue({
    el: '#app',
    components: { App },
    template: '<App/>'
});
  