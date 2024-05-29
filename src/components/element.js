import 'element-ui/lib/theme-chalk/index.css'
import { Button, Input, InputNumber, Loading, Notification, Message } from 'element-ui'
import Vue from 'vue'

Vue.use(Button)
Vue.use(Input)
Vue.use(InputNumber)
Vue.use(Loading.directive)
Vue.prototype.$loading = Loading.service
Vue.prototype.$notify = Notification
Vue.prototype.$message = Message
