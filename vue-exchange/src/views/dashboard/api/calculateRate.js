function getRate(seller, buyer) {
  let rate = 0
  let tenPorcent = 0
  let eightPorcent = 0
  let sixPorcent = 0
  let threePorcent = 0

  let tempPriceSeller = JSON.parse(seller[0]["data"]["temp_price"]).toFixed(2)
  
  let tempPriceBuyer = JSON.parse(buyer[0]["data"]["temp_price"]).toFixed(2)

  if (seller[0].data.currency === "COP" && buyer[0].data.currency === "VES") {
    rate = (tempPriceSeller / tempPriceBuyer)
    tenPorcent = (rate + (rate * 0.1))
    eightPorcent = (rate + (rate * 0.08))
    sixPorcent = (rate + (rate * 0.06))
    threePorcent = (rate + (rate * 0.03))
  } else {
    rate = (tempPriceBuyer / tempPriceSeller)
    tenPorcent = (rate - (rate * 0.1))
    eightPorcent = (rate - (rate * 0.08))
    sixPorcent = (rate - (rate * 0.06))
    threePorcent = (rate - (rate * 0.03))
  }

  if (rate >= 1) {
    const rates = { rate: rate.toFixed(2), tenPorcent: tenPorcent.toFixed(2), eightPorcent: eightPorcent.toFixed(2), sixPorcent: sixPorcent.toFixed(2), threePorcent: threePorcent.toFixed(2)}
    return rates
  } else {
    const rates = { rate: rate.toFixed(4), tenPorcent: tenPorcent.toFixed(4), eightPorcent: eightPorcent.toFixed(4), sixPorcent: sixPorcent.toFixed(4), threePorcent: threePorcent.toFixed(4)}
    return rates
  }

}

function customRate(clientAmount, customRate, seller, buyer) {
  let mountToTransferSell = 0
  let sellerTemPrice = JSON.parse(seller[0]["data"]["temp_price"]).toFixed(2)
  let buyerTempPrice = JSON.parse(buyer[0]["data"]["temp_price"]).toFixed(2)

  if (seller[0].data.currency === "COP" && buyer[0].data.currency === "VES") {
    mountToTransferSell = (clientAmount / customRate).toFixed(2)
  } else {
    mountToTransferSell = customRate * clientAmount
  }

  let btcToBuy = (mountToTransferSell / buyerTempPrice).toFixed(10)
  let localCurrencySeller = (btcToBuy * sellerTemPrice).toFixed(2)
  let gain = (clientAmount - localCurrencySeller).toFixed(2)

  const customRates = { btcToBuy, localCurrencySeller, mountToTransferSell, gain }
  return customRates
}

export default { getRate, customRate }
