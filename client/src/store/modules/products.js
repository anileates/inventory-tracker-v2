import Vue from "vue";
import {router} from "../../router";
import {mySweetAlert} from "../../mySweetAlert";
import {parse} from "vue-resource/src/lib/url-template";

const state = {
  products: []
}

const getters = {
  getProducts(state) {
    return state.products;
  },
  getProduct(state) {
    return key => state.products.filter(element => {
      return element.code == key
    })
  }
}

//  Mutatıons görevi içerde, uygulama içindeki güncellemeyi yapmaktır.
const mutations = {
  updateProductList(state, product) {
    state.products.push(product)
  },
  removeProductFromList(state, productId) {
    state.products.splice(state.products.findIndex(el => el.code == productId), 1)
  },
  updateProduct(state, product) {
    for (let i = 0; i < state.products.length; i++) {
      if (state.products[i].code == product.code) {
        state.products[i] = product
      }
    }
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

        let tradeResult = {
          purchase: product.unitPrice,
          sale: 0,
          count: product.stock
        }

        dispatch('setTradeResult', tradeResult)
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
  sellProduct({state, commit, dispatch}, payload) {
    let product = state.products.filter(el => {
      return el.code == payload.code
    })

    if (product) {
      let totalCount = product.count - payload.count
      let tradeResult = {
        sale: parseInt(payload.count) * product[0].unitPrice,
        purchase: 0
      }

      Vue.http.post('http://localhost:8080/api/v1/products/sell-product/' + payload.code, {stockSold: parseInt(payload.count)})
        .then(res => {
          product[0].count = totalCount
          router.replace('/')
          mySweetAlert.fire({
            icon: "success",
            title: 'The sale is successful.'
          })

          dispatch('setTradeResult', tradeResult)
        }).catch(err => {
        router.replace('/')
        mySweetAlert.fire({
          icon: 'error',
          title: 'Something went wrong. Try later.'
        })
      })
    }
  },
  deleteProduct({state, commit, dispatch}, productId) {
    Vue.http.delete('http://localhost:8080/api/v1/products/' + productId)
      .then(res => {
        mySweetAlert.fire({
          icon: "success",
          title: 'The sale is successful.'
        })
        commit('removeProductFromList', productId)
      }).catch(err => {
      mySweetAlert.fire({
        icon: 'error',
        title: 'Something went wrong. Try later.'
      })
    })
  },
  updateProduct({state, commit, dispatch}, product){
    console.log('action product', product)

    Vue.http.put("http://localhost:8080/api/v1/products/" + product.code, product)
      .then(res => {
        commit('updateProduct', product)

        mySweetAlert.fire({
          icon: 'success',
          title: 'Product has been successfully edited.'
        })
      })
  }
}

export default {
  state, actions, mutations, getters
}
