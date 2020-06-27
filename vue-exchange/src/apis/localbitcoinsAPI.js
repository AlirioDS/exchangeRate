import axios from "axios"

const localBitcoinsURL = axios.create({
  baseURL: 'https://localbitcoins.com/'
})

export default {
  async all(currency, market) {
    let response = await localBitcoinsURL.get(`${market}/${currency}/transfers-with-specific-bank/.json`)

    if(response.data.pagination != null) {
      let agents = ""
      let nextAgents = ""
      let pagination = 1

      while(true) {
        response = await localBitcoinsURL.get(`${market}/${currency}/transfers-with-specific-bank/.json?page=${pagination}`)

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
