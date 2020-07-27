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
      "buy-bitcoins-online": '' 
    }, 
    { 
      id: 2,
      "sell-bitcoins-online": '' 
    }
  ],

  filterClient: {
    isActive: false,
    byAmount: "",
  },

  agent: {
    loading: false
  },

  seller: {
    disabledSelect: true,
    isSelect: false,
    all: [],
    filterByAmount: [],
    select: []
  },

  buyer: {
    disabledSelect: false,
    isSelect: false,
    all: [],
    filterByAmount: [],
    select: []
  },

  rates: {
    rate : "",
    tenPorcent: "",
    eightPorcent: "",
    sixPorcent: "",
    threePorcent: ""
  },

  modals: {
    openModalSortingOptions: false,
    openModalTable: false
  }
}
