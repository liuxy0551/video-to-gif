import 'element-ui/lib/theme-chalk/index.css'
import { Input, Loading, Notification, Message } from 'element-ui'
import Vue from 'vue'

Vue.use(Input)
Vue.use(Loading.directive)
Vue.prototype.$loading = Loading.service
Vue.prototype.$notify = Notification
Vue.prototype.$message = Message
