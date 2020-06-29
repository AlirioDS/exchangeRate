export const SET_SELLERS = (state, sellers) => {
  state.seller.all = sellers
}

export const SET_BUYERS = (state, buyers) => {
  state.buyer.all = buyers
}

export const CUSTOMER_AMOUNT = (state, customerAmount) => {
  state.customerAmount = customerAmount
}

export const LOADING_AGENTS = (state, sellerIsSelect) => {
  state.sellerIsSelect = sellerIsSelect
}

export const MODALS = (state, modalIs) => {
  state.modals.openModalSortingOptions = modalIs
}

export const ALL_AGENTS = (state, sellers) => {
  state.seller.all = sellers
}
