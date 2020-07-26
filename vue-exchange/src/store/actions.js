import getAgents from '../apis/localbitcoinsAPI'

export const getAllAgents = ({commit}, payload) => {
  let market = payload.market

  commit('LOADING_AGENT', market)

  getAgents.all(payload.currency, market)
  .then(response => {
    commit('SET_AGENT', { response, market })
  })
  .catch(e => console.log(e))
}
