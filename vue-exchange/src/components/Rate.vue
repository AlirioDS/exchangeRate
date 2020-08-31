<template lang="pug">
  b-table(
    bordered=''
    responsive=''
    :items="rates"
    :fields="fieldsRates"
    class="bg-maastricht-blue"
  ).text-center
</template>

<script>
export default {
  name: 'cardAgent',
  data() {
    return {
      fieldsRates: [
        {
          key: 'rate',
          label: 'Rate'
        },
        {
          key: 'tenPorcent',
          label: '10%'
        },
        {
          key: 'eightPorcent',
          label: '8%'
        },
        {
          key: 'sixPorcent',
          label: '6%'
        },
        {
          key: 'threePorcent',
          label: '3%'
        }
      ]
    }
  },
  computed: {
    rates: {
      get() {
        if(this.$store.state.seller.select.length !== 0 && this.$store.state.buyer.select.length !== 0) {
          return [ this.$store.state.rates ]
        }
      },
    }
  }
}
</script>

<style>
  .bg-maastricht-blue {
    background-color: #011627!important;
  }
  table.table-bordered > thead > tr > th{
    border: 3px solid #FF9F1C;
  }
  table > thead > tr > th {
    padding: 0.40rem!important;
    color: #FF9F1C;
  }
  .bg-maastricht-blue > table.table-bordered > tbody > tr > td {
    padding: 0.40rem!important;
    border: 3px solid #FF9F1C;
  }
  .bg-maastricht-blue > table > tbody > tr > td {
    color: #FF9F1C;
  }
</style>
