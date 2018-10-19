// require ('assets/css/index.less');
// require ('assets/css/common.css');

require ('assets/css/reset.css');
require ('assets/css/help.css');
require ('assets/css/mobile.less');
require ('assets/css/project.less');
import 'assets/js/ScreenAdaptive.js';

import 'element-ui/lib/theme-default/index.css';
import ElementUI from 'element-ui';

import "babel-polyfill";// 解决 IE11 Promise对象未定义
// import axios from 'axios';
import './vueFilter';  	//全局过滤器
import {until,reg,app} from 'assets/js/until'
import {msg,confirm,loading} from 'hero'
import 'assets/js/wconfig.js';
import './iconfont'  //字体库
import './wconfig.js'
import {Query} from 'assets/js/query'

// import 'assets/js/Ios';
// import 'assets/js/WebViewJavascriptBridge';

//YDUI
import {DateTime} from 'vue-ydui/dist/lib.rem/datetime';
import {TimeLine, TimeLineItem} from 'vue-ydui/dist/lib.rem/timeline';
import {Radio, RadioGroup} from 'vue-ydui/dist/lib.rem/radio';
import {Tab, TabPanel} from 'vue-ydui/dist/lib.rem/tab';
import { Confirm, Alert, Toast, Notify, Loading } from 'vue-ydui/dist/lib.rem/dialog';
import {CellGroup, CellItem} from 'vue-ydui/dist/lib.rem/cell';
import {TextArea} from 'vue-ydui/dist/lib.rem/textarea';
const hostUrl='http://ht.jiaxiangtech.com';

export default{
  install(Vue){
    Vue.use(ElementUI)
    // Vue.prototype.axios = axios;
    Vue.prototype.hostUrl=hostUrl;
    Vue.prototype.until = new until();
    Vue.prototype.app=new app();
    Vue.prototype.reg = new reg();
    Vue.use(msg);
    Vue.use(confirm);
    Vue.use(loading);
    Vue.prototype.Query = Query;
    Vue.component(DateTime.name, DateTime);
    Vue.component(TimeLine.name, TimeLine);
    Vue.component(TimeLineItem.name, TimeLineItem);
    Vue.component(Radio.name, Radio);
    Vue.component(RadioGroup.name, RadioGroup);
    Vue.component(Tab.name, Tab);
    Vue.component(TabPanel.name, TabPanel);
    Vue.component(CellGroup.name, CellGroup);
    Vue.component(CellItem.name, CellItem);
    Vue.component(TextArea.name, TextArea);

    Vue.prototype.$dialog = {
      confirm: Confirm,
      alert: Alert,
      toast: Toast,
      notify: Notify,
      loading: Loading,
    };
    /* ===调用=== */
    // this.$dialog.confirm({ /* 参数 */ });
    // this.$dialog.alert({ /* 参数 */ });
    // this.$dialog.toast({ /* 参数 */ });
    // this.$dialog.notify({ /* 参数 */ });
    // this.$dialog.loading({ /* 参数 */ });

  }
}


