import Vue from "vue";
import {router} from "../../router";

const state = {
  products: []
}

const getters = {
  getProducts(state) {
    return state.products;
  },
  getProduct(state) {
    return key => state.products.filter(element => {
      return element.key == key
    })
  }
}

//  Mutatıons görevi içerde, uygulama içindeki güncellemeyi yapmaktır.
const mutations = {
  updateProductList(state, product) {
    state.products.push(product)
  }
}

// Actions ise async çalışır yani dışarıyla ilgili işi yapar ve mutationları tetikler.
const actions = {
  initApp({commit}) {
    Vue.http.get('https://vue-product-c82ad-default-rtdb.europe-west1.firebasedatabase.app/products.json')
      .then(response => {
        let data = response.body
        for (let key in data) {
          data[key].key = key
          commit('updateProductList', data[key])
        }
      })


  },
  saveProduct({dispatch, commit, state}, product) {
    Vue.http.post("https://vue-product-c82ad-default-rtdb.europe-west1.firebasedatabase.app/products.json", product)
      .then((res) => {
        // Urun listesinin guncellenmesi
        product.key = res.body.name
        commit('updateProductList', product)

        // Alis-satis tutarlarinin guncellenmesi
        let tradeResult = {
          purchase: product.price,
          sale: 0,
          count: product.count
        }

        dispatch('setTradeResult', tradeResult)
        router.replace('/')


      })
  },
  sellProduct({state, commit, dispatch}, payload) {

    //pass by reference
    let product = state.products.filter(element => {
      return element.key == payload.key
    })

    if (product) {
      let totalCount = product[0].count - payload.count
      Vue.http.patch('https://vue-product-c82ad-default-rtdb.europe-west1.firebasedatabase.app/products/' + payload.key + '.json', {count: totalCount})
        .then(res => {
          product[0].count = totalCount
          let tradeResult = {
            purchase: 0,
            sale: product[0].price,
            count: payload.count
          }

          dispatch('setTradeResult', tradeResult)
          router.replace('/')
        })

    }

  }
}

export default {
  state, actions, mutations, getters
}
