import Vue from 'vue'
import App from './App.vue'
import router from './router.js'
import { Button, Col, Row, NavBar, Toast, Radio, RadioGroup, CellGroup, Cell} from 'vant'
import './assets/iconfont/iconfont.css'
import 'amfe-flexible'


Vue.config.productionTip = false
Vue.use(Button)
Vue.use(Col)
Vue.use(Row)
Vue.use(NavBar)
Vue.use(Toast)
Vue.use(Radio)
Vue.use(RadioGroup)
Vue.use(CellGroup)
Vue.use(Cell)

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
