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
      return element.code == key
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
  sellProduct({state, commit, dispatch}, payload) {
    console.log(payload)
    console.log(state.products)
    let product = state.products.filter(el => {
      return el.code == payload.code
    })

    if (product) {
      let totalCount = product.count - payload.count

      Vue.http.post('http://localhost:8080/api/v1/products/sell-product/' + payload.code, {stockSold: parseInt(payload.count)})
        .then(res => {
          product[0].count = totalCount
          router.replace('/')
          mySweetAlert.fire({
            icon: "success",
            title: 'The sale is successful.'
          })
        }).catch(err => {
        router.replace('/')
        mySweetAlert.fire({
            icon: 'error',
            title: 'Something went wrong. Try later.'
          })
      })
    }
  }
}

export default {
  state, actions, mutations, getters
}
