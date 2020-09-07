let rate

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

    let isCOPToVES = state.seller.select[0].data.currency === 'COP' && state.buyer.select[0].data.currency === 'VES'

    rate = isCOPToVES 
    ? parseFloat(state.seller.select[0].data.temp_price) / parseFloat(state.buyer.select[0].data.temp_price)
    : parseFloat(state.buyer.select[0].data.temp_price) / parseFloat(state.seller.select[0].data.temp_price)
  
    state.rates.rate = rate.toFixed(rate > 1 ? 2 : 6)
    
    state.rates.tenPorcent = isCOPToVES 
      ? (rate + (rate * 0.1)).toFixed(rate > 1 ? 2 : 6)
      : (rate - (rate * 0.1)).toFixed(rate > 1 ? 2 : 6)
    
    state.rates.eightPorcent = isCOPToVES 
      ? (rate + (rate * 0.08)).toFixed(rate > 1 ? 2 : 6)
      : (rate - (rate * 0.08)).toFixed(rate > 1 ? 2 : 6)
    
    state.rates.sixPorcent = isCOPToVES 
      ? (rate + (rate * 0.06)).toFixed(rate > 1 ? 2 : 6)
      : (rate - (rate * 0.06)).toFixed(rate > 1 ? 2 : 6)
    
    state.rates.threePorcent = isCOPToVES 
      ? (rate + (rate * 0.03)).toFixed(rate > 1 ? 2 : 6)
      : (rate - (rate * 0.03)).toFixed(rate > 1 ? 2 : 6)
  }
}

export const RESET_ALL = (state) => {
  
}
