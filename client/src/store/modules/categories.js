import Vue from "vue";
import {router} from "../../router";
import {mySweetAlert} from "../../mySweetAlert";

const state = {
  categories: [],
}

const getters = {
  getAllCategories(state) {
    return state.categories
  }
}

const mutations = {
  updateCategoryList(state, category) {
    state.categories.push(category)
  },
  removeDeletedCategory(state, category) {
    for (let i = 0; i < state.categories.length; i++) {
      if (state.categories[i].id == category.id) {
        state.categories.splice(i, 1)
      }
    }
  }
}

const actions = {
  getAllCategories({commit}) {
    Vue.http.get('http://localhost:8080/api/v1/categories')
      .then(res => {
        let categories = res.body.categories

        for (let i = 0; i < categories.length; i++) {
          commit('updateCategoryList', categories[i])
        }
      })
  },
  deleteCategory({commit, dispatch}, category) {
    Vue.http.delete('http://localhost:8080/api/v1/categories/' + category.id)
      .then(res => {
        commit('removeDeletedCategory', category)
        dispatch('initApp')
      }).catch(err => {
        mySweetAlert.fire({
          icon: 'error',
          title: 'Something went wrong. Try again later.'
        })
    })
  }
}

export default {
  state, actions, mutations, getters
}
