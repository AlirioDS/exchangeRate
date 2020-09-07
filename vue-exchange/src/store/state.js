export default {
  currencies: [
    { value: '', text: 'Currency' },
    { value: 'ars', text: "ARS - Pesos Argentinos" },
    { value: 'clp', text: "CLP - Pesos Chilenos" },
    { value: 'cop', text: "COP - Pesos Colombianos" },
    { value: 'pen', text: "PEN - Soles Peruanos" },
    { value: 'pab', text: "PAB - Dolar Panameño" },
    // { value: 'usd', text: "USD - Dolar Estadounidense" },
    { value: 'ves', text: "VES - Bolivares" },
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
