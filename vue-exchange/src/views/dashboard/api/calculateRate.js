function getRate(seller, buyer) {
  let tempPriceSeller = JSON.parse(seller[0]["data"]["temp_price"]).toFixed(2)
  
  let tempPriceBuyer = JSON.parse(buyer[0]["data"]["temp_price"]).toFixed(2)
  
  let btc = (1 / tempPriceSeller)
  
  let rate = (btc * tempPriceBuyer).toFixed(2)
  
  let tenPorcent = (rate * 0.1)
  tenPorcent = (rate - tenPorcent).toFixed(2)

  let eightPorcent = (rate * 0.08)
  eightPorcent = (rate - eightPorcent).toFixed(2)

  let sixPorcent = (rate * 0.06)
  sixPorcent = (rate - sixPorcent).toFixed(2)

  let threePorcent = (rate * 0.03)
  threePorcent = (rate - threePorcent).toFixed(2)

  const rates = { rate: rate, tenPorcent: tenPorcent, eightPorcent: eightPorcent, sixPorcent: sixPorcent, threePorcent: threePorcent}
  return rates
}

function customRate(clientAmount, customRate, seller, buyer) {
  let mountToTransferSell = customRate * clientAmount

  let buyerTempPrice = JSON.parse(buyer[0]["data"]["temp_price"]).toFixed(2)
  let sellerTemPrice = JSON.parse(seller[0]["data"]["temp_price"]).toFixed(2)

  let btcBuyer = (mountToTransferSell / buyerTempPrice).toFixed(10)
  let localCurrencySeller = (btcBuyer * sellerTemPrice).toFixed(2)


  const customRates = { btcBuyer: btcBuyer, localCurrencySeller: localCurrencySeller, mountToTransferSell: mountToTransferSell }
  return customRates
}

export default { getRate, customRate }
