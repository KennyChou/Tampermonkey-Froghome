import Vue from 'vue'
import App from './app.vue'
import axios from 'axios'
import VueAxios from 'vue-axios'

import { isDev } from './config'
import './styles/global.scss'

const id = `app_vue_${Date.now()}`
const root = document.createElement('div')
root.id = id

if (isDev) {
  document.body.appendChild(root)
} else {
  const input = document.getElementsByName('living_type_id')[0]
  const form = document.getElementsByName('CodeForm')[0]
  form.insertBefore(root, input)
}
Vue.use(VueAxios, axios)
new Vue({
  el: `#${id}`,
  render: h => h(App),
})
