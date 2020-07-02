
export const LOADING_AGENT = (state, agent) => {
  if(agent === "buy-bitcoins-online") {
    state.agent.loading = true
  } else {
    state.agent.loading = true
  }
}

export const SET_AGENT = (state, payload) => {
  if(payload.market === "buy-bitcoins-online"){
    state.seller.all = payload.response
  } else {
    state.buyer.all = payload.response
  }
  state.agent.loading = false
}

export const CUSTOMER_AMOUNT = (state, customerAmount) => {
  state.filterClient.byAmount = customerAmount
}

export const FILTER_CLIENT_IS_ACTIVE = (state, filterClientIsActive) => {
  state.filterClient.isActive = filterClientIsActive
}

export const MODALS = (state, modalIs) => {
  state.modals.openModalSortingOptions = modalIs
}

export const AGENT_SELECT = (state, agentSelect) => {
  state.seller.isSelect ? state.seller.select = agentSelect : state.buyer.select = agentSelect
}
