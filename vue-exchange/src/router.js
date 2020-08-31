import Vue from 'vue'
import Router from 'vue-router'

import Home from './pages/Home.vue'
import LocalbitcoinsSorting from './pages/LocalbitcoinsSorting.vue'
import SortingOptions from './components/modals/SortingOptions.vue'
import TableAgents from './components/modals/TableAgents.vue'

Vue.use(Router)

export default new Router({
  mode: 'hash',
  routes: [
    {
      path: '/',
      name: 'home_path',
      component: Home,
      meta: {
        reload: true
      }
    },
    {
      path: '/localbitcoinSorting',
      name: 'localbitcoins_sorting_path',
      component: LocalbitcoinsSorting,
      meta: {
        reload: true
      }
    }
  ]
})
