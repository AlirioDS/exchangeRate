import getAgents from '../apis/localbitcoinsAPI'

export const getAllAgents = ({commit}, payload) => {
  getAgents.all(payload.currency, payload.market)
  .then(response => {
    console.log(response)
    if(payload.market === "buy-bitcoins-online") {
      commit('SET_SELLERS', response)
    } else {
      commit('SET_BUYERS', response)
    }
  })
  .catch(e => e)
}
