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

  sellers: [],
  sellersLoading: false,
  sellerIsSelect: false,
  buyers: [],
  buyersLoading: false
}
