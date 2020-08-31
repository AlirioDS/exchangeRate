import axios from "axios"

const localBitcoinsURL = axios.create({
  baseURL: "https://cors-anywhere.herokuapp.com/https://localbitcoins.com/",
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, GET, PUT, OPTIONS, DELETE',
    'Access-Control-Allow-Headers': 'Access-Control-Allow-Methods, Access-Control-Allow-Origin, Origin, Accept, Content-Type',
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  },

})

export default {
  async all(currency, market) {
    let agents = []

    let URLToAgents = market === "sell-bitcoins-online"
      ? `${market}/${currency}/c/bank-transfers/.json`
      : `${market}/${currency}/transfers-with-specific-bank/.json`

    const getAgents = async () => {
      await localBitcoinsURL.get(URLToAgents)
      .then(async res => {
        if (res.data.pagination !== undefined) {
          await paginateGetAgents()
        } else {
          return agents.push.apply(agents, res.data.data.ad_list) 
        }
      }).catch( error => {
        console.log(error)
        return error
      })
    }

    const paginateGetAgents = async (page = 1) => {
      await localBitcoinsURL.get(`${URLToAgents}?page=${page}`)
      .then(async res => {
        if(res.data.pagination.next !== undefined) {
          await paginateGetAgents(
            page+1,
            agents.push.apply(agents, res.data.data.ad_list)
          )
        } else {
          return agents
        } 
      }).catch(error => {
        console.log(error)
        return error
      })
    }

    await getAgents()

    return agents
  }
}
