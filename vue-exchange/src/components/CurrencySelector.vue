<template lang='pug'>
  b-card.text-center(
    header-text-variant="white"
    no-body=''
    class="bg-maastricht-blue"
  )
    .bg-light.text-dark.px-2
      .d-flex.flex-row.justify-content-center.py-3
        SelectCurrency(
          v-for="market in markets"
          :market="market"
          :key="market.id"
        ) 
</template>

<script>
  import SelectCurrency from './SelectCurrency.vue'
  
  export default {
    name: 'CurrencySelector',
    components: { SelectCurrency },
    computed: {
      markets() {
        return this.$store.state.markets
      }
    }
  }
</script>

<style>
  .bg-maastricht-blue {
    background-color: #011627!important;
  }
</style>
