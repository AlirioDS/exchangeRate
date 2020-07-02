<template lang="pug">
  b-container(fluid).pt-3
    b-row(align-h="center")
      b-col(cols='11').pt-2
        CurrencySelector
    b-row
      b-col(cols='6' sm='6' md='6').pt-2
        Card(v-if="this.$store.state.seller.select.length != 0")
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
  components: { CurrencySelector, ModalSortingOptions, ModalAgentsSelection, Card }
}
</script>

<style>
</style>
