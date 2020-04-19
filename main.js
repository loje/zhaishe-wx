import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false

import Bmob from './static/js/Bmob-2.2.4.min.js'
Bmob.initialize("4dcf39d90a4913b4", "900620", "b7bbafa0f02dd8b6d4e93fea9efd96aa");
Vue.prototype.$Bmob = Bmob;

App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
