import axios from "axios"

const localBitcoinsURL = axios.create({
  baseURL: 'https://localbitcoins.com/',
  headers: {
    'Content-Type': 'application/json',
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept",
    "Access-Control-Allow-Credentials": "true",
    "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS"
  },
  mode: 'no-cors'
})

export default {
  async all(currency, market) {
    let response
    market === "sell-bitcoins-online"
      ? response = await localBitcoinsURL.get(`${market}/${currency}/c/bank-transfers/.json`)
      : response = await localBitcoinsURL.get(`${market}/${currency}/transfers-with-specific-bank/.json`)

    if(response.data.pagination != null) {
      let agents = ""
      let nextAgents = ""
      let pagination = 1

      while(true) {
        market === "sell-bitcoins-online"
          ? response = await localBitcoinsURL.get(`${market}/${currency}/c/bank-transfers/.json?page=${pagination}`)
          : response = await localBitcoinsURL.get(`${market}/${currency}/transfers-with-specific-bank/.json?page=${pagination}`)

        if(agents != "") {
          nextAgents = JSON.stringify(response.data.data.ad_list).split("[")[1].split("]")[0]
          agents = agents.concat(","+nextAgents)
        } else {
          agents = JSON.stringify(response.data.data.ad_list).split("[")[1].split("]")[0]
        }
        
        pagination++

        if(response.data.pagination.next === undefined) {
          return JSON.parse(`[${agents}]`)
        }
      }
    } else {
      return response.data.data.ad_list
    }

  }
}
