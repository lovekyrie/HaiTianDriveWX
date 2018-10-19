import Vue from 'vue';
import init from 'assets/js/init.js'
import 'muse-ui/lib/styles/base.less';
import { TextField } from 'muse-ui';
import 'muse-ui/lib/styles/theme.less';

Vue.use(init);
Vue.use(TextField);
import App from './App';

new Vue({
  render: h => h(App)
}).$mount('#container')