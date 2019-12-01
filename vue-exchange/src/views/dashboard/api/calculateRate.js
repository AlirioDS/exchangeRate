function getRate(seller, buyer) {

  let tempPriceSeller = JSON.parse(seller[0]["data"]["temp_price"]).toFixed(2)
  
  let tempPriceBuyer = JSON.parse(buyer[0]["data"]["temp_price"]).toFixed(2)

  let rate = (tempPriceBuyer / tempPriceSeller)
  
  let tenPorcent = (rate - (rate * 0.1))

  let eightPorcent = (rate - (rate * 0.08))

  let sixPorcent = (rate - (rate * 0.06))

  let threePorcent = (rate - (rate * 0.03))

  if (rate >= 1) {
    if (seller[0].data.currency === "COP") {
      const rates = { rate: (rate/100).toFixed(3), tenPorcent: (tenPorcent/100).toFixed(3), eightPorcent: (eightPorcent/100).toFixed(3), sixPorcent: (sixPorcent/100).toFixed(3), threePorcent: (threePorcent/100).toFixed(3)}
      return rates
    } else {
      const rates = { rate: rate.toFixed(2), tenPorcent: tenPorcent.toFixed(2), eightPorcent: eightPorcent.toFixed(2), sixPorcent: sixPorcent.toFixed(2), threePorcent: threePorcent.toFixed(2)}
      return rates
    }
  } else {
    const rates = { rate: rate.toFixed(4), tenPorcent: tenPorcent.toFixed(4), eightPorcent: eightPorcent.toFixed(4), sixPorcent: sixPorcent.toFixed(4), threePorcent: threePorcent.toFixed(4)}
    return rates
  }

}


function customRate(clientAmount, customRate, seller, buyer) {
  if (seller[0].data.currency === "COP" && buyer[0].data.currency === "VES") {
    var mountToTransferSell = (clientAmount / customRate).toFixed(2)
  } else {
    var mountToTransferSell = customRate * clientAmount
  }

  let sellerTemPrice = JSON.parse(seller[0]["data"]["temp_price"]).toFixed(2)
  let buyerTempPrice = JSON.parse(buyer[0]["data"]["temp_price"]).toFixed(2)

  let btcBuyer = (mountToTransferSell / buyerTempPrice).toFixed(10)
  let localCurrencySeller = (btcBuyer * sellerTemPrice).toFixed(2)

  let gain = (clientAmount - localCurrencySeller).toFixed(2)

  const customRates = { btcBuyer: btcBuyer, localCurrencySeller: localCurrencySeller, mountToTransferSell: mountToTransferSell, gain: gain }
  return customRates
}

export default { getRate, customRate }
