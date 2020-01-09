import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './utils/validation' // 加载验证插件的初始配置
import './utils/register.vant' // 引入vant组件
import 'amfe-flexible' // 引入REM适配组件
import './styles/index.less' // 引入全局样式

Vue.config.productionTip = false
// 注意：所有初始化的代码都应该在new Vue根实例之前
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
