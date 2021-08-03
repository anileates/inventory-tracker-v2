<template>
  <div class="container">
    <div class="loading" :style="isLoading">
      <div class="lds-ripple">
        <div></div>
        <div></div>
      </div>
    </div>
    <div class="row">
      <div class="col-6 offset-3 pt-3 card mt-5 shadow">
        <div class="card-body">
          <h3>Add New Product/Purchase</h3>
          <hr>
          <div class="form-group">
            <label>Product Name</label>
            <input v-model="product.name" type="text" class="form-control" placeholder="Enter A Product Name">
          </div>
          <div class="form-group">
            <label>Category ID</label>

            <select v-model="product.category" class="form-control">
              <option v-for="category in getAllCategories" :value="category">{{ category.id }} - {{
                  category.name
                }}
              </option>
            </select>

          </div>
          <div class="form-group">
            <label>Count</label>
            <input v-model="product.stock" type="number" class="form-control" placeholder="Enter Purchase Count">
          </div>
          <div class="form-group">
            <label>Unit Price</label>
            <input v-model="product.unitPrice" type="number" class="form-control" placeholder="Enter Unit Price">
          </div>
          <div class="form-group">
            <label>Image Url</label>
            <input v-model="product.imageUrl" type="url" class="form-control" placeholder="Enter Image Url">
          </div>
          <div class="form-group">
            <label>Description</label>
            <textarea cols="30" rows="2" placeholder="Enter A Description"
                      v-model="product.description" class="form-control"></textarea>
          </div>
          <hr>
          <button class="btn btn-primary" :disabled="saveEnabled" @click="saveProduct">Save</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'

export default {
  name: "ProductPurchase",
  data() {
    return {
      product: {
        name: '',
        stock: null,
        unitPrice: null,
        description: '',
        categoryId: null,
        category: null,
        imageUrl: null,
        code: null
      },
      isSaveButtonClicked: false
    }
  },
  methods: {
    saveProduct() {
      this.isSaveButtonClicked = true
      this.product.categoryId = this.product.category.id
      this.$store.dispatch('saveProduct', this.product)
    }
  },
  computed: {
    ...mapGetters(['getAllCategories']),
    saveEnabled() {
      if (this.product.name.length > 0 && this.product.stock > 0 && this.product.unitPrice >= 0 && this.product.description.length > 0) {
        return false
      } else {
        return true
      }
    },
    isLoading() {
      if (this.isSaveButtonClicked) {
        return {
          display: "block"
        }
      } else {
        return {
          display: "none"
        }
      }
    }
  },
  beforeRouteLeave(to, from, next) {
    if ((this.product.name.length > 0 || this.product.stock > 0 || this.product.unitPrice > 0 || this.product.description.length > 0) && !this.isSaveButtonClicked) {
      if (confirm('There is unsaved changes. You want to leave?')) {
        next()
      } else {
        next(false)
      }
    } else {
      next()
    }
  },
}

</script>

<style scoped>

</style>
