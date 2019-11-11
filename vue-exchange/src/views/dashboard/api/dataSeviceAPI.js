const URLCurrencySellers = `https://exchange111.herokuapp.com/api/v1/localbitcoins/service/sellers`
const URLCurrencyBuyers = `https://exchange111.herokuapp.com//api/v1/localbitcoins/service/buyers`


function getSellers(currency) {
  return fetch(URLCurrencySellers, {
    method: 'POST',
    headers: {
      "Content_type": "application/json"
    },
    body: JSON.stringify({currency: currency})
  })
    .then(res => res.json())
    .then(json => json)
}

function getBuyers(currency) {
  return fetch(URLCurrencyBuyers, {
    method: 'POST',
    headers: {
      "Content_type": "application/json"
    },
    body: JSON.stringify({currency: currency})
  })
    .then(res => res.json())
    .then(json => json)
}

export default { getSellers, getBuyers }
