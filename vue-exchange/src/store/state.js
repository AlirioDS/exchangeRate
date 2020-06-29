export default {
  currencies: [
    { value: '', text: 'Currency' },
    { value: 'clp', text: "CLP" },
    { value: 'ves', text: "VES" },
    { value: 'pen', text: "PEN" },
    { value: 'cop', text: "COP" },
    { value: 'usd', text: "USD" }
  ],

  markets: [ 
    { 
      id: 1,
      currencySeller: '' 
    }, 
    { 
      id: 2,
      currencyBuyer: '' 
    }
  ],

  customerAmount: null,

  seller: [
    { sellersLoading: false },
    { sellerIsSelect: false },
    { all: [] }
  ],

  buyer: [
    { buyersLoading: false },
    { buyerIsSelect: false },
    { all: [] }
  ],

  modals: {
    openModalSortingOptions: false
  }
}
