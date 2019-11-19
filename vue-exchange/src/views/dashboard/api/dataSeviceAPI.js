import axios from "axios"

const URLCurrencySellers = `https://exchange111.herokuapp.com/api/v1/localbitcoins/service/sellers`
const URLCurrencyBuyers = `https://exchange111.herokuapp.com//api/v1/localbitcoins/service/buyers`

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
