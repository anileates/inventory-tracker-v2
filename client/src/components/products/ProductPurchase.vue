<template>
  <div class="container">
    <div class="loading" :style="isLoading">
      <div class="lds-ripple">
        <div></div>
        <div></div>
      </div>
    </div>
    <div class="row" style="margin-bottom: 50px">
      <div class="col-6 offset-3 pt-3 card mt-5 mb-5 shadow">
        <div class="card-body">
          <h3>Add New Product/Purchase</h3>
          <hr>
          <div class="form-group">
            <div class="another">

              <label >Product Name</label>
              <span id="clearIcon" class="float-right" v-if="isProductSelected" @click="deselectProduct">
                <i class="fas fa-times" style="color: darkred!important;"/>
                Clear
              </span>

              <input v-model="product.name" type="search" class="form-control" placeholder="Enter A Product Name" @keyup="searchProduct($event)" :disabled="isProductAlreadyExist"/>
              <ul class="list-group" v-show="!isProductSelected" v-for="(product, index) in productsFound">
                <li class="list-group-item myListItem" v-if="productsFound" @click="selectProduct(product)">{{
                    product.name
                  }}
                </li>
              </ul>

            </div>
          </div>
          <div class="form-group">
            <label>Category ID</label>

            <select v-model="product.category" class="form-control" :disabled="isProductAlreadyExist">
              <option :value="productSelected.category" v-if="productSelected" selected>
                {{ productSelected.category.id }} - {{
                  productSelected.category.name
                }}
              </option>

              <option v-for="category in getAllCategories" :value="category">{{ category.id }} - {{
                  category.name
                }}
              </option>
            </select>
          </div>
          <div class="form-group">
            <label>Count</label>
            <input v-model="product.stock" type="number" min="0" step="1" class="form-control"
                   placeholder="Enter Purchase Count">
          </div>
          <div class="form-group">
            <label>Unit Purchase Price</label>
            <input v-model="product.unitPurchasePrice" type="number" min="0" step="1" class="form-control"
                   placeholder="Enter Unit Price">
          </div>
          <div class="form-group">
            <label>Unit Sale Price</label>
            <input v-model="product.unitSalePrice" type="number" min="0" step="1" class="form-control"
                   placeholder="Enter Sale Price">
          </div>
          <div class="form-group">
            <label>Image Url</label>
            <input v-model="product.imageUrl" type="url" class="form-control" placeholder="Enter Image Url"
                   :disabled="isProductAlreadyExist">
          </div>
          <div class="form-group">
            <label>Description</label>
            <textarea cols="30" rows="2" placeholder="Enter A Description"
                      v-model="product.description" class="form-control" :disabled="isProductAlreadyExist"></textarea>
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
        unitPurchasePrice: null,
        unitSalePrice: null,
        description: '',
        categoryId: null,
        category: null,
        imageUrl: null,
        code: null
      },
      isSaveButtonClicked: null,
      isProductAlreadyExist: false,
      productSelected: null,
      isProductSelected: null,
      productsFound: []
    }
  },
  methods: {
    saveProduct() {
      this.isSaveButtonClicked = true
      this.product.categoryId = this.product.category.id

      this.$store.dispatch('saveProduct', this.product)
    },
    searchProduct(event) {
      this.productsFound = []

      this.getProducts.filter(product => {
        if (event.target.value.trim() !== "" && product.name.toLowerCase().includes(event.target.value.trim().toLowerCase())) {
          this.productsFound.push(product)
        }
      })
      console.log(this.productsFound)
    },
    selectProduct(product) {
      this.productSelected = product
      this.product = {...this.productSelected}
      this.isProductAlreadyExist = true
      this.isProductSelected = true
    },
    deselectProduct(){
      this.isProductAlreadyExist = false
      this.isProductSelected = false

      this.product = {
        name: '',
        stock: null,
        unitPurchasePrice: null,
        unitSalePrice: null,
        description: '',
        categoryId: null,
        category: null,
        imageUrl: null,
        code: null
      }
    }
  },
  computed: {
    ...mapGetters(['getAllCategories', "getProducts"]),
    saveEnabled() {
      if (this.product.name.length > 0 && this.product.stock > 0 && this.product.unitPurchasePrice >= 0 && this.product.description.length > 0) {
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
    },
    test() {

    }
  },
  beforeRouteLeave(to, from, next) {
    if ((this.product.name.length > 0 || this.product.stock > 0 || this.product.unitPurchasePrice > 0 || this.product.description.length > 0) && !this.isSaveButtonClicked) {
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

.myListItem:hover {
  cursor: pointer;
  background-color: slategray;
}

.mySelectBox {
  background-color: transparent;
  border-top: none;
  border-right: none;
  border-left: none;
  border-bottom: solid gray;
  width: 90%;
  height: 50%;
}

.mySelectBox:focus {
  outline: none;
  border-bottom: solid #563f7a;
  width: 90%;
  height: 50%;
}

#clearIcon {
  color: dodgerblue;
}

#clearIcon:hover {
  cursor: pointer;
}

</style>
