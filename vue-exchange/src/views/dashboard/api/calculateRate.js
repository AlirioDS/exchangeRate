var tempPriceSeller
var tempPriceBuyer
var btc
var rate
var tenPorcent
var eightPorcent
var sixPorcent
var rates

export default function calculateRate(seller, buyer) {
  tempPriceSeller = JSON.parse(seller[0]["data"]["temp_price"]).toFixed(2)
  
  tempPriceBuyer = JSON.parse(buyer[0]["data"]["temp_price"]).toFixed(2)
  
  btc = (1 / tempPriceSeller)
  
  rate = (btc * tempPriceBuyer).toFixed(2)
  
  tenPorcent = (rate * 0.1)
  tenPorcent = (rate - tenPorcent).toFixed(2)

  eightPorcent = (rate * 0.08)
  eightPorcent = (rate - eightPorcent).toFixed(2)

  sixPorcent = (rate * 0.06)
  sixPorcent = (rate - sixPorcent).toFixed(2)

  rates = { rate: rate, tenPorcent: tenPorcent, eightPorcent: eightPorcent, sixPorcent: sixPorcent}

  return rates
}
