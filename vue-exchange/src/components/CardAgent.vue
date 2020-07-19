<template lang="pug">
  b-card-group(deck)
    b-card(
      no-body
      header-tag="header"
    )
      template(v-slot:header)
        b-container
          b-row(align-h="between")
            b-col(cols="6")
              h4 {{ agentelectedIs() ? "BUY" : "SELL" }}
            b-col(cols="6")
              div(class="d-flex justify-content-end")
                b-button(
                  :variant="changeColor()"
                  target='_blank'
                  :href='`${agentelectedIs() ? agentSelect.seller[0].actions.public_view : agentSelect.buyer[0].actions.public_view}`'
                ) Link
      b-table(
        stacked
        :fields='fields'
        :items='agentelectedIs() ? agentSelect.seller : agentSelect.buyer'
      )
        template(v-slot:cell(data.bank_name)="data")
          b.text-secondary {{ agentelectedIs() ? agentSelect.seller[0].data.bank_name.replace(/[^a-zA-Z]+/g, ' ') : agentSelect.buyer[0].data.bank_name.replace(/[^a-zA-Z]+/g, ' ') }}
        template(v-slot:cell(data.max_amount)="data")
          b.text-secondary {{ haveData( agentelectedIs() ? agentSelect.seller[0].data.max_amount : agentSelect.buyer[0].data.max_amount, agentelectedIs() ? agentSelect.seller[0].data.currency : agentSelect.buyer[0].data.currency ) }}
        template(v-slot:cell(data.min_amount)="data")
          b.text-secondary {{ haveData( agentelectedIs() ? agentSelect.seller[0].data.min_amount : agentSelect.buyer[0].data.min_amount, agentelectedIs() ? agentSelect.seller[0].data.currency : agentSelect.buyer[0].data.currency ) }}
</template>

<script>
export default {
  name: 'cardAgent',
  props: ['agentSelect'],
  data() {
    return {
      fields: [
        {
          key: 'data.bank_name',
          label: 'Bank'
        },
        {
          key: 'data.max_amount',
          label: 'Max Amount'
        },
        {
          key: 'data.min_amount',
          label: 'Min Amount'
        }
      ]
    }
  },
  methods: {
    haveData(dataAmount, currency ) {
      return dataAmount != null 
      ? `${dataAmount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} ${currency}`
      : "------------"
    },
    agentelectedIs() {
      return Object.keys(this.agentSelect)[0] === 'seller' ? true : false
    },
    changeColor() {
      return Object.keys(this.agentSelect)[0] === 'seller' ? 'success' : 'danger'
    }
  }
}
</script>

<style>

</style>
