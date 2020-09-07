<template lang='pug'>
  b-card.text-center(
    header="Conversion Calculator"
    header-text-variant="white"
    no-body=''
    class="bg-maastricht-blue"
  )
    .bg-light.text-dark.pb-3.px-3
      b-row
        b-col(cols="5" sm="6" md="3").pt-3
          b-input-group
            b-input-group-prepend
              span.input-group-text
                font-awesome-icon(icon='coins')
            b-form-input(
              type="number"
              placeholder="Rate"
              id="rateInput"
              v-model="inputRate"
            )
        b-col(cols="7" sm="6" md="4").pt-3
          b-input-group
            b-input-group-prepend
              span.input-group-text
                font-awesome-icon(icon='money-check-alt')
            b-form-input(
              type="number"
              placeholder="Client Amount"
              id="clientAmountInput"
              v-model="clientAmount"
            )
        b-col(cols="7" sm="6" md="5").pt-3
          b-input-group
            b-input-group-prepend
              span.input-group-text
                font-awesome-icon(:icon="['fab', 'bitcoin']")
            b-form-input(
              type="number"
              placeholder="BTC Mount"
              disabled=''
              v-model="this.btcToBuy"
            )
        b-col(cols="5" sm="6" md="3").pt-3
          b-input-group
            b-input-group-prepend
              span.input-group-text
                font-awesome-icon(icon='hand-holding-usd')
            b-form-input(
              type="number"
              placeholder="Profit"
              disabled=''
              v-model="this.profit"
            )
        b-col(cols="12" sm="6" md="4").pt-3
          b-input-group
            b-input-group-prepend
              span.input-group-text
                font-awesome-icon(icon='sign-in-alt').text-success
            b-form-input(
              type="number"
              placeholder="Mount to Transfer Purchase"
              disabled=''
              v-model="this.mountToTransferSell"
            )
        b-col(cols="12" sm="6" md="5").pt-3
          b-input-group
            b-input-group-prepend
              span.input-group-text
                font-awesome-icon(icon='sign-out-alt').text-danger
            b-form-input(
              type="number"
              placeholder="Mount to Transfer Sale"
              disabled=''
              v-model="this.localCurrencySeller"
            )
</template>

<script>
export default {
  name: 'CalculatorConversion',
  data() {
    return {
      inputRate: '',
      clientAmount: '',
      btcToBuy: '',
      localCurrencySeller: '',
      mountToTransferSell: '',
      profit: ''
    }
  },
  watch: {
    inputRate(event) {
      this.conversionCalculate()
    },
    clientAmount(event){
      this.conversionCalculate()
    }
  },
  methods: {
    conversionCalculate() {
      if(this.inputRate.length !== 0 && this.clientAmount.length !== 0 ) {
        this.$store.state.seller.select[0].data.currency === "COP" && this.$store.state.buyer.select[0].data.currency === "VES"
          ? this.mountToTransferSell = (this.clientAmount / this.inputRate).toFixed(2)
          : this.mountToTransferSell = (this.inputRate * this.clientAmount).toFixed(2)

        this.btcToBuy = (this.mountToTransferSell / parseFloat(this.$store.state.buyer.select[0].data.temp_price)).toFixed(10)

        this.localCurrencySeller = (this.btcToBuy * parseFloat(this.$store.state.seller.select[0].data.temp_price)).toFixed(2)
        
        this.profit = (this.clientAmount - this.localCurrencySeller).toFixed(2)
      }
    }
  }
}
</script>

<style>

</style>
