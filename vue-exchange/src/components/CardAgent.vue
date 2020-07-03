<template lang="pug">
  b-card-group(deck)
    b-card(
      border-variant="success"
    )
      b-card-text Bank Name: {{agentSelect[0].data.bank_name.replace(/[^a-zA-Z]+/g, ' ')}}
      b-card-text Max Amount: {{agentSelect[0].data.max_amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}}
      b-card-text Min Amount: {{agentSelect[0].data.min_amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}}
      b-card-text Client Amount: {{this.$store.state.filterClient.byAmount}}

      div(class="d-flex justify-content-end")
          b-button(
            :href="`${agentSelect[0].actions.public_view}`"
            variant="success"
            target="_blank"
          ) Link
</template>

<script>
export default {
  computed: {
    agentSelect() {
      return this.$store.getters.agentSelect
    }  
  }
}
</script>

<style>

</style>
