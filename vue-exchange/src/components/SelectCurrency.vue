<template lang='pug'>
  b-form-select.mx-1(
    :id="`${Object.keys(this.market)[1]}`"
    :value="this.market.id === 1 ? this.market.currencySeller : this.market.currencyBuyer"
    @change="getCurrency"
    :options="currencies"
    :disabled="Object.keys(this.market)[1] === 'currencyBuyer' ? !this.$store.state.sellerIsSelect : this.$store.state.sellerIsSelect"
  )
</template>

<script>
  export default {
    props: [ 'market' ],
    computed: {
      currencies() {
        return this.$store.state.currencies
      }
    },
    methods: {
      getCurrency(currency) {
        let market = this.$el.id === "currencySeller" ? 'buy-bitcoins-online' : "sell-bitcoins-online"

        if(currency != "") {
          this.$store.dispatch('getAllAgents', { currency, market })
          
          let openModalOption = true
          this.$store.commit('MODALS', openModalOption)
        }
      }
    }
  }
</script>

<style>

</style>
