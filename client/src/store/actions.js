import Vue from "vue"

export const setTradeResult = ({state, commit}, tradeResult) => {
  commit('updateTradeResults', tradeResult)

  let tradeData = {
    purchase: state.purchase,
    sale: state.sale
  }

  Vue.http.put('http://localhost:8080/api/v1/trade-results/', tradeData)
    .then(res => {
    })
}

export const getTradeResult = ({commit}) => {
  Vue.http.get('http://localhost:8080/api/v1/trade-results/')
    .then(res => {
      commit('updateTradeResults', res.body.tradeResult)
    })
}
