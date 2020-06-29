<template lang="pug">
  b-container(fluid).pt-3
    b-row(align-h="center")
      b-col(cols='11').pt-2
        CurrencySelector
    b-row
      ModalSortingOptions
      ModalAgentsSelection

</template>

<script>
import test from '../components/Test.vue'

import CurrencySelector from '../components/CurrencySelector.vue'
import ModalSortingOptions from '../components/modals/SortingOptions.vue'
import ModalAgentsSelection from '../components/modals/TableAgents.vue'

export default {
  name: 'LocalbitcoinsSorting',
  components: { CurrencySelector, ModalSortingOptions, ModalAgentsSelection, test }
}
</script>

<style>
</style>
