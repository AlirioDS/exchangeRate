import axios from "axios"

const localBitcoinsURL = axios.create({
  baseURL: 'https://localbitcoins.com/',
  headers: {
    'Content-Type': 'application/json',
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept",
    "Access-Control-Allow-Credentials": "true",
    "Access-Control-Allow-Methods": "GET"
  },
  mode: 'no-cors'
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
