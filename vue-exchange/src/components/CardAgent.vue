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
                h4 BUY
              b-col(cols="6")
                div(class="d-flex justify-content-end")
                  b-button(
                    variant='success'
                    target='_blank'
                    :href='`${agentSelect[0].actions.public_view}`'
                  ) Link
      b-collapse(id="accordionAgentSelect" visible accordion="accordion" role="tabpanel")
        b-table(
          stacked
          :fields='fields'
          :items='agentSelect'
        )
          template(v-slot:cell(data.bank_name)="data")
            b.text-secondary {{ agentSelect[0].data.bank_name.replace(/[^a-zA-Z]+/g, ' ') }}
          template(v-slot:cell(data.max_amount)="data")
            b.text-secondary {{ haveData(agentSelect[0].data.min_amount, agentSelect[0].data.currency ) }}
          template(v-slot:cell(data.min_amount)="data")
            b.text-secondary {{ haveData(agentSelect[0].data.max_amount, agentSelect[0].data.currency) }}
</template>

<script>
export default {
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
  computed: {
    agentSelect() {
      return this.$store.getters.agentSelect
    }  
  },
  methods: {
    haveData(dataAmount, currency ) {
      return dataAmount != null 
      ? `${dataAmount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} ${currency}`
      : "------------"
    }
  }
}
</script>

<style>

</style>
