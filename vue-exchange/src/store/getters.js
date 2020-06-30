export const agentsFilterByAmount = (state) => {
  let clientAmount = parseInt(state.filterClient.byAmount)
  return state.seller.filterByAmount = state.seller.all.filter(seller => { return clientAmount >= parseInt(seller.data.min_amount) })
}

export const agentsFilter = (state) => {
  return state.seller.all = state.seller.all.filter(seller => {
    return 98 <= seller.data.profile.feedback_score || 100 > parseInt(seller.data.profile.trade_count.replace('+', '').replace(' ', ''))
  })
}
