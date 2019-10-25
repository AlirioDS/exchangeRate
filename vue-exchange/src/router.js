import Vue from 'vue'
import Router from 'vue-router'
import Dashboard from './views/dashboard/Index'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'dashboard_path',
      component: Dashboard
    },
  ]
})
