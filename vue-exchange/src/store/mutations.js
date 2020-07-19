
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
  }
}
