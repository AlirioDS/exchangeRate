<template lang="pug">
  b-container(fluid).pt-3
    b-row(align-h="center")
      b-col(cols='10').pt-2
        CurrencySelector
</template>

<script>
import CurrencySelector from '../components/CurrencySelector.vue'

export default {
  name: 'LocalbitcoinsSorting',
  components: { CurrencySelector }
}
</script>

<style>
</style>
