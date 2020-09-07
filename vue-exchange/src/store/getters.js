let clientAmount

export const agentsFilterByAmount = (state) => {
  clientAmount = parseInt(state.filterClient.byAmount)
  
  return state.seller.filterByAmount = state.seller.all.filter(
    seller => clientAmount >= parseInt(seller.data.min_amount)
  )
}

export const agentsFilter = (state) => {
  if (state.seller.isSelect && !state.buyer.isSelect) {
    state.seller.all = state.seller.all.filter(seller => {
      return 98 <= seller.data.profile.feedback_score || 100 > parseInt(seller.data.profile.trade_count.replace('+', '').replace(' ', ''))
    })

    if(state.filterClient.isActive) {
      clientAmount = parseInt(state.filterClient.byAmount)

      return state.seller.filterByAmount = state.seller.filterByAmount = state.seller.all.filter(
        seller => clientAmount >= parseInt(seller.data.min_amount)
      )
    } else {
      return state.seller.all
    }

  } else {
    state.buyer.all = state.buyer.all.filter(seller => {
      return 98 <= seller.data.profile.feedback_score || 100 > parseInt(seller.data.profile.trade_count.replace('+', '').replace(' ', ''))
    })

    if(state.filterClient.isActive && state.buyer.all.length !== 0) {
      let isCopToVes = state.seller.select[0].data.currency === 'COP' && state.buyer.all[0].data.currency === 'VES'

      clientAmount = parseInt(state.filterClient.byAmount)
      let sellerTempPrice = parseFloat(state.seller.select[0].data.temp_price)

      return isCopToVes 
        ? state.buyer.filterByAmount = state.buyer.all.filter(buyer => {
          return (clientAmount / (sellerTempPrice / parseFloat(buyer.data.temp_price))) >= parseFloat(buyer.data.min_amount) 
        })
        : state.buyer.filterByAmount = state.buyer.all.filter(buyer => {
          return (parseFloat(buyer.data.temp_price / sellerTempPrice) * clientAmount) >= parseFloat(buyer.data.min_amount)
        })
    } else {
      return state.buyer.all
    }
  }
}

export const agentSelect = (state) => {
  return state.seller.isSelect ? state.seller.select : state.buyer.select
}
