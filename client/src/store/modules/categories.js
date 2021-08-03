import Vue from "vue";
import {router} from "../../router";

const state = {
  categories: []
}

const getters = {
  getAllCategories(state) {
    return state.categories
  }
}

const mutations = {
  updateCategoryList(state, category){
    state.categories.push(category)
  }
}

const actions = {
  getAllCategories({commit}){
    Vue.http.get('http://localhost:8080/api/v1/categories')
      .then(res => {
        let categories = res.body.categories

        for(let i = 0; i < categories.length; i++){
          commit('updateCategoryList', categories[i])
        }

      })
  }
}

export default {
  state, actions, mutations, getters
}
