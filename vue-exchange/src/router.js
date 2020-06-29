import Vue from 'vue'
import Router from 'vue-router'

import Home from './pages/Home.vue'
import LocalbitcoinsSorting from './pages/LocalbitcoinsSorting.vue'
import SortingOptions from './components/modals/SortingOptions.vue'
import TableAgents from './components/modals/TableAgents.vue'

import Sorting from './pages/Sorting.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home_path',
      component: Home
    },
    {
      path: '/localbitcoinSorting',
      name: 'localbitcoins_sorting_path',
      component: LocalbitcoinsSorting
    },
    {
      path: '/sorting',
      name: 'sorting_path',
      component: Sorting
    }
  ],
  mode: 'history'
})
