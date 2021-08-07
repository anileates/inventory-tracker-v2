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
  },
  updateCategoryName(state, category) {
    for (let i = 0; i < state.categories.length; i++) {
      if (state.categories[i].id == category.id) {
        state.categories[i].name = category.name
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
  },
  updateCategory({commit, dispatch}, category) {
    Vue.http.put('http://localhost:8080/api/v1/categories/' + category.id, {name: category.name})
      .then(res => {
        let updatedCategory = res.body.updatedCategory
        commit('updateCategoryName', updatedCategory)

        mySweetAlert.fire({
          icon: 'success',
          title: 'Category has been updated.'
        })
      }).catch(err => {
      mySweetAlert.fire({
        icon: 'error',
        title: 'Something went wrong. Try again later.'
      })
    })
  },
  saveCategory({commit, dispatch}, categoryName) {
    Vue.http.post('http://localhost:8080/api/v1/categories/', {category_name: categoryName})
      .then(res => {
        Vue.swal.fire(
          'OK!',
          'Category has been added.',
          "success"
        )
        let category = res.body.data
         commit('updateCategoryList', {...category, _count: {products: 0}})
      }).catch(err => {
      Vue.swal.fire(
        'Oopss!',
        'Something went wrong. Try later.',
        'error'
      )
    })
  }
}

export default {
  state, actions, mutations, getters
}
