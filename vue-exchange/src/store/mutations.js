
export const LOADING_AGENT = (state, agent) => {
  agent === "buy-bitcoins-online"
    ? state.agent.loading = true
    : state.agent.loading = true
}

export const SET_AGENT = (state, payload) => {
  payload.market === "buy-bitcoins-online"
    ? state.seller.all = payload.response
    : state.buyer.all = payload.response

  state.agent.loading = false
}

export const CUSTOMER_AMOUNT = (state, customerAmount) => {
  state.filterClient.byAmount = customerAmount
}

export const FILTER_CLIENT_IS_ACTIVE = (state, filterClientIsActive) => {
  state.filterClient.isActive = filterClientIsActive
}

export const MODALS = (state, openModalOption) => {
  state.seller.isSelect && !state.buyer.isSelect
    ? state.modals.openModalSortingOptions = openModalOption
    : state.modals.openModalTable = openModalOption
}

export const AGENT_SELECT = (state, agentSelect) => {
  if(state.seller.isSelect && !state.buyer.isSelect) {
    state.seller.select = agentSelect
    state.seller.disabledSelect = false
    state.buyer.disabledSelect = true
  } else {
    state.buyer.select = agentSelect
    state.buyer.disabledSelect = true
    state.seller.disabledSelect = true

    let rate = parseFloat(
      state.buyer.select[0].data.temp_price) / parseFloat(state.seller.select[0].data.temp_price
    )
    
    let currency = state.buyer.select[0].data.currency
  
    state.rates.rate = rate.toFixed(rate > 1 ? 2 : 4)
    
    state.rates.tenPorcent = (
      currency === 'COP' ? (rate + (rate * 0.1)) : (rate - (rate * 0.1))
    ).toFixed(rate > 1 ? 2 : 4)
    
    state.rates.eightPorcent = (
      currency === 'COP' ? (rate + (rate * 0.08)) : (rate - (rate * 0.08))
    ).toFixed(rate > 1 ? 2 : 4)
    
    state.rates.sixPorcent = (
      currency === 'COP' ? (rate + (rate * 0.06)) : (rate - (rate * 0.06))
    ).toFixed(rate > 1 ? 2 : 4)
    
    state.rates.threePorcent = (
      currency === 'COP' ? (rate + (rate * 0.03)) : (rate - (rate * 0.03))
    ).toFixed(rate > 1 ? 2 : 4)
  }
}

export const RESET_ALL = (state) => {
  debugger
}
