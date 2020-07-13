<template lang='pug'>
  b-form-select.mx-1(
    :id="`${Object.keys(this.market)[1]}`"
    :value="this.market.id === 1 ? this.market['buy-bitcoins-online'] : this.market['sell-bitcoins-online']"
    @change="getCurrency"
    :options="currencies"
    :disabled="enabledBuyer()"
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
        let market = this.$el.id 

        if(currency != "") {
          market  === 'buy-bitcoins-online' 
          ? this.$store.state.seller.isSelect = true 
          : this.$store.state.buyer.isSelect = true

          this.$store.dispatch('getAllAgents', { currency, market })
          
          let openModalOption = true
          this.$store.commit('MODALS', openModalOption )

        }
      },
      enabledBuyer() {
        if (Object.keys(this.market)[1] === 'sell-bitcoins-online') {
          return this.$store.state.seller.disabledSelect
        } else if (Object.keys(this.market)[1] === 'buy-bitcoins-online') {
          return this.$store.state.buyer.disabledSelect
        }
      }
    }
  }
</script>

<style>

</style>
