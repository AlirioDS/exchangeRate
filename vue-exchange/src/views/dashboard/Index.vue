<template lang="pug">
  #dashboard
    Navbar
    b-container(fluid).pt-3
      b-row
        b-col(cols='12' sm='6').pt-2
          b-card.text-center(no-body='')
            .bg-light.text-dark.px-2
              div.d-flex.flex-row.justify-content-center.py-3
                b-form-select.mx-1(v-model='selectSeller')
                  option(v-for="currency in currencies" v-bind:value="currency.value") {{ currency.name }}
                b-form-select.mx-1(v-model='selectBuyer')
                  option(v-for="currency in currencies" v-bind:value="currency.value") {{ currency.name }}
        b-col(cols='12' sm='6').pt-2
          b-table(
            striped=''
            bordered=''
            dark=''
            responsive=''
            :items="rates"
            :fields="fieldsRates"
          ).text-center
      b-row
        b-col(cols='6' sm='6')
          b-card(v-if='statusSellers' ,bg-variant="danger", text-variant="white")
            .search-bar
              b-form-input(
                v-model='filterSellers'
                type='search'
                id='filtersellers'
                placeholder='Buscar'
              )
              span.search-icon
                font-awesome-icon(icon='search').text-danger

        b-col(cols='6' sm='6')
          b-card(v-if='statusBuyers' ,bg-variant="success", text-variant="white")
            .search-bar
              b-form-input(
                v-model='filterBuyers'
                type='search'
                id='filterBuyers'
                placeholder='Buscar'
              )
              span.search-icon
                font-awesome-icon(icon='search').text-success
      b-row
        b-col(cols='6' sm='6').pt-3
          b-table(
            hover=''
            responsive=''
            :items="sellers"
            :busy="sellersLoading"
            :fields="fields"
            :filter="filterSellers"
            ref="selectableTable"
            selectable
            :select-mode="selectMode"
            selected-variant="danger"
            @row-selected="onRowSelectedSeller"
          )
            template(v-slot:table-busy='')
              .text-center.text-danger.my-2
                b-spinner(style='width: 3rem; height: 3rem;', label='Large Spinner', type='grow')

            template(v-slot:cell(data.bank_name)="bankName")
              b.text-secondary {{ bankName.value.replace(/[^a-zA-Z]+/g, ' ') }}

            template(v-slot:cell(data.min_amount)="minAmount")
              b.text-secondary {{ minAmount.value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") }}

            template(v-slot:cell(data.max_amount)="maxAmount")
              b.text-secondary {{ maxAmount.value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") }}

            template(v-slot:cell(actions.public_view)="url")
              b-button(class="btn-danger" :href="url.value", target="_blank") Ir

        b-col(cols='6' sm='6').pt-3
          b-table(
            hover=''
            responsive=''
            :items='buyers'
            :busy='buyersLoading'
            :fields="fields"
            :filter='filterBuyers'
            ref="selectableTable"
            selectable
            :select-mode="selectMode"
            selected-variant="success"
            @row-selected="onRowSelectedBuyer"
          )
            template(v-slot:table-busy='')
              .text-center.text-success.my-2
                b-spinner(style='width: 3rem; height: 3rem;', label='Large Spinner', type='grow')
            template(v-slot:cell(data.bank_name)="bankName")
              b.text-secondary {{ bankName.value.replace(/[^a-zA-Z]+/g, ' ') }}
            template(v-slot:cell(data.min_amount)="data")
              b.text-secondary {{ data.value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") }}
            template(v-slot:cell(data.max_amount)="data")
              b.text-secondary {{ data.value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") }}
            template(v-slot:cell(actions.public_view)="url")
              b-button(class="btn-success" :href="url.value", target="_blank") Ir
</template>

<script>
  import Navbar from "./components/Nabvar"
  import Test from './components/Test'
  
  import serviceApi from './api/dataSeviceAPI'
  import calculateRate from './api/calculateRate'

  export default {
    name: 'dashboard',
    components: { Navbar, Test },
    data() {
      return {
        sellersLoading: false,
        buyersLoading: false,
        statusSellers: false,
        statusBuyers: false,
        currencies: [
          { name: 'Moneda', value: null},
          { name: 'CLP', value: 'clp' },
          { name: 'VES', value: 'ves' },
          { name: 'PEN', value: 'pen' }
        ],
        selectSeller: null,
        selectBuyer: null,
        fieldsRates: [
          {
            key: 'rate',
            label: 'Tasa'
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

        ],
        rates: [],
        sellers: [],
        buyers: [],
        fields: [
          {
            key: 'data.bank_name',
            label: 'Banco'
          },
          {
            key: 'data.min_amount',
            label: 'Minimo'
          },
          {
            key: 'data.max_amount',
            label: 'Maximo'
          },
          {
            key: 'actions.public_view',
            label: 'Link'
          },
        ],
        filterSellers: null,
        filterBuyers: null,
        selectMode: 'single',
        selectedSellers: [],
        selectedBuyers: []
      }
    },
    methods: {
      sellersData() {
        const self = this
        this.sellersLoading = true
        self.statusSellers = false
        serviceApi.getSellers(this.selectSeller)
          .then(function (sellers){
            self.sellersLoading = false
            self.sellers = sellers
            self.statusSellers = true
        })
      },
      buyersData() {
        const self = this
        this.buyersLoading = true
        self.statusBuyers = false
        serviceApi.getBuyers(this.selectBuyer)
          .then(function (buyers){
            self.buyersLoading = false
            self.buyers = buyers
            self.statusBuyers = true
          })
      },
      onRowSelectedSeller(sellers) {
        this.selectedSellers = sellers
        if (this.selectedBuyers.length && this.selectedSellers.length) {
          this.rates = [calculateRate(this.selectedSellers, this.selectedBuyers)]
        } else {
          this.rates = []
        }
      },
      onRowSelectedBuyer(buyers) {
        this.selectedBuyers = buyers
        if (this.selectedSellers.length && this.selectedBuyers.length) {
          this.rates = [calculateRate(this.selectedSellers, this.selectedBuyers)]
        } else {
          this.rates = []
        }
      }
    },
    watch: {
      selectSeller() {
        if (this.selectSeller != null) {
          this.sellersData()
        }
      },
      selectBuyer() {
        if (this.selectBuyer != null) {
          this.buyersData()
        }
      },
    }
  }
</script>

<style scoped>
  .search-bar {
    position: relative;
  }
  .search-bar input {
    padding-left: 30px;
  }
  .search-icon {
    position: absolute;
    top: 8px;
    left: 8px;
  }
</style>
