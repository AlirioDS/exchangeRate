import axios from "axios"

const URLCurrencySellers = window.location.href.includes('localhost') ? `http://localhost:3000/api/v1/localbitcoins/service/sellers` : `https://exchange111pr.herokuapp.com/api/v1/localbitcoins/service/sellers`

const URLCurrencyBuyers = window.location.href.includes('localhost') ? `http://localhost:3000/api/v1/localbitcoins/service/buyers` : `https://exchange111pr.herokuapp.com/api/v1/localbitcoins/service/buyers`

async function getSellers(currency) {
  return await axios.post(URLCurrencySellers, {
    currency: currency
  }).then(response => response.data)
  .catch(e => e)
}

async function getBuyers(currency) {
  return await axios.post(URLCurrencyBuyers, {
    currency: currency
  }).then(response => response.data)
  .catch(e => e)
}

export default { getSellers, getBuyers }
