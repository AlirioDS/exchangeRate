<template lang="pug">
  #dashboard
    Navbar
    b-container(fluid).pt-3
      b-row
        b-col(cols='12' sm='12').pt-2
         b-alert.pt-3(
          :show="dismissCountDown"
          dismissible
          fade
          variant="danger"
          @dismiss-count-down="countDownChanged"
        )
          | Actualice la Pagina Nuevamente ó Espere {{ dismissCountDown }} Segundos...
      b-row(v-if="rate_hardcode")
        b-col(cols='12' sm='12').pt-2
          | Tasa: {{ rate_hardcode }}
      b-row
        b-col(cols='12' sm='6').pt-2
          b-card.text-center(
            header="Compra / Venta"
            header-text-variant="white"
            no-body=''
            class="bg-maastricht-blue"
            )
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
        b-col.pt-2(cols='12' sm='12' v-if="statusConversion")
          b-card.text-center(
            header="Calculo de Conversion"
            border-variant="dark"
            header-bg-variant="dark"
            header-text-variant="white"
          )
            b-container
              b-row
                b-col(cols="5" sm="5" md="3").pt-3
                  b-input-group
                    b-input-group-prepend
                      span.input-group-text
                        font-awesome-icon(icon='coins')
                    b-form-input(
                      type="number"
                      placeholder="Tasa"
                      v-model='customRate'
                    )
                b-col(cols="7" sm="7" md="5").pt-3
                  b-input-group
                    b-input-group-prepend
                      span.input-group-text
                        font-awesome-icon(icon='money-check-alt')
                    b-form-input(
                      type="number"
                      placeholder="Ingrese Monto del Cliente"
                      v-model='clientAmount'
                    )
                b-col(cols="12" sm="6" md="4").pt-3
                  b-input-group
                    b-input-group-prepend
                      span.input-group-text
                        font-awesome-icon(:icon="['fab', 'bitcoin']")
                    b-form-input(
                      type="number"
                      placeholder="Monto en BTC"
                      disabled=''
                      v-model="dataConversion.btcToBuy"
                    )
                b-col(cols="12" sm="6" md="4").pt-3
                  b-input-group
                    b-input-group-prepend
                      span.input-group-text
                        font-awesome-icon(icon='hand-holding-usd')
                    b-form-input(
                      type="number"
                      placeholder="Ganancia"
                      disabled=''
                      v-model="dataConversion.gain"
                    )
                b-col(cols="12" sm="6" md="6").pt-3
                  b-input-group
                    b-input-group-prepend
                      span.input-group-text
                        font-awesome-icon(icon='sign-in-alt').text-success
                    b-form-input(
                      type="number"
                      placeholder="Monto a Transferir Compra"
                      disabled=''
                      v-model="dataConversion.localCurrencySeller"
                    )
                b-col(cols="12" sm="6" md="6").pt-3
                  b-input-group
                    b-input-group-prepend
                      span.input-group-text
                        font-awesome-icon(icon='sign-out-alt').text-danger
                    b-form-input(
                      type="number"
                      placeholder="Monto a Transferir Venta"
                      disabled=''
                      v-model=`dataConversion["mountToTransferSell"]`
                    )
      b-row
        b-col(cols='6' sm='6').pt-3
          b-card(v-if='statusSellers' ,bg-variant="success", text-variant="white")
            .search-bar
              b-form-input(
                v-model='filterSellers'
                type='search'
                id='filtersellers'
                placeholder='Buscar'
              )
              span.search-icon
                font-awesome-icon(icon='search').text-success
            b-form-group.mb-0.pt-2(label='Filtrar Por:', label-cols-sm='3', label-align-sm='right', label-size='sm')
              b-form-checkbox-group.mt-1(v-model='filterOnSellers')
              b-form-checkbox(value='data.bank_name') Nombre de Banco
              b-form-checkbox(value='data.min_amount') Monto Minimo

        b-col(cols='6' sm='6').pt-3
          b-card(v-if='statusBuyers' ,bg-variant="danger", text-variant="white")
            .search-bar
              b-form-input(
                v-model='filterBuyers'
                filter-ignored-fields="data.min_amount"
                type='search'
                id='filterBuyers'
                placeholder='Buscar'
              )
              span.search-icon
                font-awesome-icon(icon='search').text-danger
            b-form-group.mb-0.pt-2(label='Filtrar Por:', label-cols-sm='3', label-align-sm='right', label-size='sm')
              b-form-checkbox-group.mt-1(v-model='filterOnBuyers')
              b-form-checkbox(value='data.bank_name') Nombre de Banco
              b-form-checkbox(value='data.min_amount') Monto Minimo
      b-row
        b-col(cols='6' sm='6').pt-3
          b-table(
            hover=''
            responsive=''
            :items="sellers"
            :busy="sellersLoading"
            :fields="fields"
            :filter="filterSellers"
            :filterIncludedFields="filterOnSellers"
            ref="selectableTable"
            selectable
            :select-mode="selectMode"
            selected-variant="success"
            @row-selected="onRowSelectedSeller"
          )
            template(v-slot:table-busy='')
              .text-center.text-success.my-2
                b-spinner(style='width: 10rem; height: 10rem;', label='Large Spinner', type='grow')
            
            template(v-slot:cell(data.bank_name)="bankName")
              b.text-secondary {{ bankName.value.replace(/[^a-zA-Z]+/g, ' ') }}
            
            template(v-slot:cell(data.min_amount)="minAmount")
              b.text-secondary {{ minAmount.value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") }}
            
            template(v-slot:cell(data.max_amount)="maxAmount")
              b.text-secondary {{ maxAmount.value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") }}
            
            template(v-slot:cell(actions.public_view)="url")
              b-button(class="btn-success" :href="url.value", target="_blank") Ir
        
        b-col(cols='6' sm='6').pt-3
          b-table(
            hover=''
            responsive=''
            :items='buyers'
            :busy='buyersLoading'
            :fields="fields"
            :filter='filterBuyers'
            :filterIncludedFields="filterOnBuyers"
            ref="selectableTable"
            selectable
            :select-mode="selectMode"
            selected-variant="danger"
            @row-selected="onRowSelectedBuyer"
          )
            template(v-slot:table-busy='')
              .text-center.text-danger.my-2
                b-spinner(style='width: 10rem; height: 10rem;', label='Large Spinner', type='grow')
            
            template(v-slot:cell(data.bank_name)="bankName")
              b.text-secondary {{ bankName.value.replace(/[^a-zA-Z]+/g, ' ') }}
            
            template(v-slot:cell(data.min_amount)="data")
              b.text-secondary {{ data.value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") }}
            
            template(v-slot:cell(data.max_amount)="data")
              b.text-secondary {{ data.value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") }}
            
            template(v-slot:cell(actions.public_view)="url")
              b-button(class="btn-danger" :href="url.value", target="_blank") Ir
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
          { name: 'PEN', value: 'pen' },
          { name: 'COP', value: 'cop' },
          { name: 'USD', value: 'usd' }
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
          {
            key: 'threePorcent',
            label: '3%'
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
        selectedBuyers: [],
        statusConversion: false,
        customRate: '',
        clientAmount: '',
        dataConversion: [],
        filterOnSellers: [],
        filterOnBuyers: [],
        updatePage: false,
        dismissSecs: 10,
        dismissCountDown: 0,
        rate_hardcode: 0
      }
    },
    methods: {
      sellersData() {
        const self = this
        this.sellersLoading = true
        self.statusSellers = false
        let only_one = false
        serviceApi.getSellers(this.selectSeller)
          .then((sellers) => {
            if (sellers.isAxiosError != true) {
              self.sellersLoading = false
              sellers.forEach(
                (seller, index)=>{
                  if(seller.data.profile.feedback_score <= 96 ){
                    delete seller[index]
                  } else if (parseInt(seller["data"]["profile"]["trade_count"].replace("+", "").replace(" ", "")) < 100 ){
                    delete seller[index]
                  } else if (seller.data.currency === "CLP" && seller.data.bank_name.toLowerCase().includes('banco estado')){
                    let min_amount = parseInt(seller.data.min_amount)
                    let max_amount = parseInt(seller.data.max_amount)
                    let six_porcent = (6*max_amount) / 100
                    let btc = parseFloat(seller.data.min_amount) / parseFloat(seller.data.temp_price)
                    let usd_amount = btc * parseFloat(seller.data.temp_price_usd)
                    
                    if (min_amount <= six_porcent && usd_amount <= 15 && !only_one) {
                      only_one = true
                      this.selectedSellers = seller
                      console.log(seller.actions.public_view)
                    }
                  }
                }
              )
              self.sellers = sellers
              self.statusSellers = true
            } else {
              self.updatePage = true
            }
        })
      },
      buyersData() {
        const self = this
        this.buyersLoading = true
        self.statusBuyers = false
        let only_one = false
        serviceApi.getBuyers(this.selectBuyer)
          .then((buyers)=>{
            if (buyers.isAxiosError != true) {
              self.buyersLoading = false
              buyers.forEach(
                (buyer, index)=>{
                  if(buyer["data"]["profile"]["feedback_score"] <= 96 ){
                    delete buyer[index]
                  } else if (parseInt(buyer["data"]["profile"]["trade_count"].replace("+", "").replace(" ", "")) < 100 )
                  {
                    delete buyer[index]
                  } else if (buyer.data.currency === "VES" && buyer.data.bank_name.toLowerCase().includes('banesco') && self.selectSeller === "clp"){
                    let min_amount = parseInt(buyer.data.min_amount)
                    let max_amount = parseInt(buyer.data.max_amount)
                    let six_porcent = (10*max_amount) / 100
                    let btc = parseFloat(buyer.data.min_amount) / parseFloat(buyer.data.temp_price)
                    let usd_amount = btc * parseFloat(buyer.data.temp_price_usd)
                    if (min_amount <= six_porcent && usd_amount <= 24 && !only_one) {
                      only_one = true
                      this.rate_hardcode = ((buyer.data.temp_price / this.selectedSellers.data.temp_price) - (buyer.data.temp_price / this.selectedSellers.data.temp_price * 0.03)).toString().split('.')[0]
                      console.log(buyer.actions.public_view)
                    }
                  }
                }
              )
              self.buyers = buyers
              self.statusBuyers = true
            } else {
              self.updatePage = true
            }
          })
      },
      onRowSelectedSeller(sellers) {
        this.selectedSellers = sellers
        if (this.selectedBuyers.length && this.selectedSellers.length) {
          this.rates = [calculateRate.getRate(this.selectedSellers, this.selectedBuyers)]
          this.statusConversion = true
        } else {
          this.rates = []
        }
      },
      onRowSelectedBuyer(buyers) {
        this.selectedBuyers = buyers
        if (this.selectedSellers.length && this.selectedBuyers.length) {
          this.rates = [calculateRate.getRate(this.selectedSellers, this.selectedBuyers)]
          this.statusConversion = true
        } else {
          this.rates = []
        }
      },
      conversionCalculate() {
        if (this.clientAmount.length && this.customRate.length && this.customRate != 0) {
          this.dataConversion =
            calculateRate.customRate(this.clientAmount, this.customRate, this.selectedSellers, this.selectedBuyers)
        }
        else {
          this.dataConversion = []
        }
      },
      countDownChanged(dismissCountDown) {
        this.dismissCountDown = dismissCountDown
        if (this.dismissCountDown == 0) {
          location.reload()
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
      clientAmount(){
        this.conversionCalculate()
      },
      customRate(){
        this.conversionCalculate()
      },
      updatePage(){
        this.dismissCountDown = this.dismissSecs
      }
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
  .bg-maastricht-blue {
    background-color: #011627;
  }
  .bg-dark {
    background-color: #011627 !important;
  }
  .bg-danger {
    background-color: #E71D36 !important;
  }
  .bg-success {
    background-color: #2EC4B6 !important;
  }
  .text-success {
    color: #2EC4B6 !important;
  }
</style>
