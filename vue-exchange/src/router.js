import Vue from 'vue'
import Router from 'vue-router'
import Sorting from './pages/Sorting.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'sorting_path',
      component: Sorting
    }
  ],
  mode: 'history'
})
