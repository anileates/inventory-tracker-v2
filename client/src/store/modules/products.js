import Vue from "vue";
import {router} from "../../router";
import {mySweetAlert} from "../../mySweetAlert";

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
    Vue.http.get('http://localhost:8080/api/v1/products')
      .then(response => {
        state.products = []
        let products = response.body.products

        for (let i = 0; i < products.length; i++) {
          commit('updateProductList', products[i])
        }
      })
  },

  saveProduct({dispatch, commit, state}, product) {
    Vue.http.post("http://localhost:8080/api/v1/products/", product)
      .then((res) => {
        product.code = res.body.productCreated.code
        commit('updateProductList', product)
        router.replace('/')
        mySweetAlert.fire({
          icon: 'success',
          title: 'Product succesfully added.'
        })
      }).catch(err => {
        router.replace('/')
        mySweetAlert.fire({
          icon: 'error',
          title: 'Something went wrong. Please try again.'
        })
    })
  },
  // sellProduct({state, commit, dispatch}, payload) {
  //   let product = state.products.filter(element => {
  //     return element.key == payload.key
  //   })
  //
  //   if (product) {
  //     let totalCount = product[0].count - payload.count
  //     Vue.http.patch('https://vue-product-c82ad-default-rtdb.europe-west1.firebasedatabase.app/products/' + payload.key + '.json', {count: totalCount})
  //       .then(res => {
  //         product[0].count = totalCount
  //         let tradeResult = {
  //           purchase: 0,
  //           sale: product[0].price,
  //           count: payload.count
  //         }
  //
  //         dispatch('setTradeResult', tradeResult)
  //         router.replace('/')
  //       })
  //   }
  // }
}

export default {
  state, actions, mutations, getters
}
