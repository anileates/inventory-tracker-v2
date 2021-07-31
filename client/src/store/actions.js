import Vue from "vue"

export const setTradeResult = ({ state, commit }, tradeResult) => {
    console.log('--- tradeResult 👉' , tradeResult)

    commit('updateTradeResults', tradeResult)
    let tradeData = {
        purchase: state.purchase,
        sale: state.sale
    }
    console.log('--- Actıona geri döndü 👉' , tradeData)

    Vue.http.put('https://vue-product-c82ad-default-rtdb.europe-west1.firebasedatabase.app/trade-result.json', tradeData)
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
