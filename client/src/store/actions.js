import Vue from "vue"

export const setTradeResult = ({ state, commit }, tradeResult) => {
    commit('updateTradeResults', tradeResult)
    let tradeData = {
        purchase: state.purchase,
        sale: state.sale
    }

    Vue.http.put('http://localhost:8080/api/v1/tradeResults/', tradeData)
    .then(res => {
        console.log(res)
    })
}

export const getTradeResult = ({ commit }) => {
    Vue.http.get('https://vue-product-c82ad-default-rtdb.europe-west1.firebasedatabase.app/trade-result.json')
    .then(res => {
        commit('updateTradeResults', res.body)
    })
}
