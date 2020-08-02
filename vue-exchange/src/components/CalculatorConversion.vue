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
            )
        b-col(cols="7" sm="6" md="4").pt-3
          b-input-group
            b-input-group-prepend
              span.input-group-text
                font-awesome-icon(icon='money-check-alt')
            b-form-input(
              type="number"
              placeholder="Client Amount"
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
            )
</template>

<script>
export default {
  name: 'CalculatorConversion'
}
</script>

<style>

</style>
