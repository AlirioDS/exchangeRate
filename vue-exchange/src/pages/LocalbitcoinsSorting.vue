<template lang="pug">
  b-container(fluid).pt-3
    b-row(align-h="center")
      b-col(cols='11').pt-2
        CurrencySelector
    b-row
      b-col(
        cols='12' sm='6' md='6'
        v-if="this.$store.state.seller.select.length != 0"
      ).pt-3.pb-2
        Card(:agentSelect='seller')
      b-col(
        cols='12' sm='6' md='6'
        v-if="this.$store.state.buyer.select.length != 0"
      ).pt-3.pb-2
        Card(:agentSelect='buyer')
    b-row
      b-col(
        cols='12'
        v-if='this.$store.state.rates.rate !== ""'
      ).pt-2
        Rate
    b-row(style='padding-bottom: 6rem;')
      b-col(
        cols='12'
        v-if='this.$store.state.rates.rate !== ""'
      ).pt-2
        CalculateConversion
    b-row
      ModalSortingOptions
      ModalAgentsSelection

</template>

<script>
import test from '../components/Test.vue'

import CurrencySelector from '../components/CurrencySelector.vue'
import Card from '../components/CardAgent.vue'
import Rate from '../components/Rate.vue'
import CalculateConversion from '../components/CalculatorConversion.vue'
import ModalSortingOptions from '../components/modals/SortingOptions.vue'
import ModalAgentsSelection from '../components/modals/TableAgents.vue'

export default {
  name: 'LocalbitcoinsSorting',
  components: { 
    CurrencySelector,
    Card,
    Rate,
    CalculateConversion,
    ModalSortingOptions,
    ModalAgentsSelection 
  },
  computed: {
    seller() {
      return {seller: this.$store.state.seller.select}
    },
    buyer() {
      return {buyer: this.$store.state.buyer.select}
    }
  }
}
</script>
