export const agentsFilterByAmount = (state) => {
  let clientAmount = parseInt(state.filterClient.byAmount)
  return state.seller.filterByAmount = state.seller.all.filter(seller => { return clientAmount >= parseInt(seller.data.min_amount) })
}

export const agentsFilter = (state) => {
  if (state.seller.isSelect && !state.buyer.isSelect) {
    return state.seller.all = state.seller.all.filter(seller => {
      return 98 <= seller.data.profile.feedback_score || 100 > parseInt(seller.data.profile.trade_count.replace('+', '').replace(' ', ''))
    })
  } else {
    return state.buyer.all = state.buyer.all.filter(seller => {
      return 98 <= seller.data.profile.feedback_score || 100 > parseInt(seller.data.profile.trade_count.replace('+', '').replace(' ', ''))
    })
  }
}

export const agentSelect = (state) => {
  return state.seller.isSelect ? state.seller.select : state.buyer.select
}

export const rates = (state) => {

  let rate = parseFloat(state.buyer.select[0].data.temp_price) / parseFloat(state.seller.select[0].data.temp_price)

  state.rates.rate = rate.toFixed(2)
  state.rates.tenPorcent = (rate + (rate * 0.1)).toFixed(2)
  state.rates.eightPorcent = (rate + (rate * 0.08)).toFixed(2)
  state.rates.sixPorcent = (rate + (rate * 0.06)).toFixed(2)
  state.rates.threePorcent = (rate + (rate * 0.03)).toFixed(2)
  state.rates.isReady = true

  return state.rates
}
