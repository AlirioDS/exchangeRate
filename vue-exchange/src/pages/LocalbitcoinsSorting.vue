<template lang="pug">
  b-container(fluid).pt-3
    b-row(align-h="center")
      b-col(cols='11').pt-2
        CurrencySelector
    b-row
      b-col(
        cols='12' sm='6' md='6'
        v-if="this.$store.state.seller.select.length != 0"
      ).pt-2
        Card(:agentSelect='seller')
      b-col(
        cols='12' sm='6' md='6'
        v-if="this.$store.state.buyer.select.length != 0"
      ).pt-2
        Card(:agentSelect='buyer')
    b-row
      ModalSortingOptions
      ModalAgentsSelection

</template>

<script>
import test from '../components/Test.vue'

import CurrencySelector from '../components/CurrencySelector.vue'
import ModalSortingOptions from '../components/modals/SortingOptions.vue'
import ModalAgentsSelection from '../components/modals/TableAgents.vue'
import Card from '../components/CardAgent.vue'

export default {
  name: 'LocalbitcoinsSorting',
  components: { CurrencySelector, ModalSortingOptions, ModalAgentsSelection, Card },
  computed: {
    seller() {
      return {seller: this.$store.state.seller.select}
    },
    buyer() {
      return {buyer: this.$store.state.buyer.select}
    },
  }
}
</script>

<style>
</style>
