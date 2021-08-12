<template>
  <div class="container">
    <div class="row">
      <div class="col-12 mb-5 card mt-5 shadow">
        <div class="card-body">
          <h3>Product List</h3>
          <hr>
          <table class="table table-hover table-striped table-bordered" v-if="getProducts && !getProducts.length == 0">
            <thead class="text-center">
            <th class="theadId">id</th>
            <th>Category Name</th>
            <th>Product Name</th>
            <th>Stock</th>
<!--            <th>Unit Purchase Price</th>-->
            <th>Unit Sale Price</th>
            <th>Description</th>
            <th>Manage</th>
            </thead>

            <tbody>
            <tr :key="index" v-for="(product, index) in getProducts">
              <template v-if="isEditMode && productBeforeEdit.code === product.code">
                <td class="align-middle text-center td-id">
                  <span class="badge badge-info">{{ product.code }}</span>
                </td>
                <td class="align-middle text-center">
                  <select v-model="productUpdated.category" class=" mySelectBox">
                    <option :value="productBeforeEdit.category" selected disabled>
                      {{ productBeforeEdit.category.id }} - {{ productBeforeEdit.category.name }}
                    </option>

                    <option v-for="category in getAllCategories" :value="category" v-if="category.id !== productBeforeEdit.category.id">
                      {{ category.id }} - {{category.name}}
                    </option>
                  </select>
                </td>
                <td class="align-middle text-center" style="overflow: hidden">
                  <input type="text" class="myInputBox text-center"
                         v-model="productUpdated.name"/>
                </td>
                <td class="align-middle text-center" style="width: 120px">
                  <input type="number" class="myInputBox text-center" @keydown="checkNumberOnly"
                         v-model="productUpdated.stock"/>
                </td>
                <td class="align-middle text-center" style="width: 120px;">
                  <input type="number" class="myInputBox text-center" v-model="productUpdated.unitSalePrice"
                         @keydown="checkNumberOnly"/>
                </td>
                <td class="align-middle text-center">
                  <input type="text" class="myInputBox text-center" v-model="productUpdated.description"/>
                </td>
                <td class="align-middle text-center">
                  <span style="font-size: 1.3rem; color: darkred; cursor: pointer" class="mr-2" @click="cancelEdit()">
                    <i class="fas fa-times"/>
                </span>
                  <span style="font-size: 1.3rem; color: seagreen; cursor: pointer" class="ml-2"
                        @click="saveChanges()">
                <i class="fas fa-check"/>
                </span>
                </td>
              </template>
              <template v-else>
                <td class="align-middle text-center">
                  <span class="badge badge-info">{{ product.code }}</span>
                </td>

                <td class="align-middle text-center td-id">{{ product.category.name }}</td>
                <td class="align-middle text-center">{{ product.name }}</td>
                <td class="align-middle text-center" style="width: 120px" :class="getStockAlert(product.stock)">
                  {{ product.stock }}
                </td>
                <td class="align-middle text-center" style="width: 120px">{{ product.unitSalePrice | currency }}</td>
                <td class="align-middle text-center">{{ product.description }}</td>
                <td class="align-middle text-center">
                <span style="font-size: 1.3rem; cursor: pointer" class="mr-2" @click="editProduct(product)">
                    <i class="far fa-edit"/>
                </span>

                  <span style="font-size: 1.3rem; color: red; cursor: pointer" class="ml-2"
                        @click="deleteProduct(product.code)">
                    <i class="far fa-trash-alt"></i>
                </span>
                </td>
              </template>
            </tr>
            </tbody>
          </table>
          <div class="alert alert-warning" v-else>
            <strong>There is no record here yet.</strong>
            <br>
            <small>You can use Add Product Tab to add new record.
            </small>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
import {confirmProductDeletion, confirmProductUpdate, mySweetAlert} from "../../mySweetAlert";

export default {
  name: "ProductList",
  data() {
    return {
      isEditMode: false,
      productBeforeEdit: null,
      productUpdated: null
    }
  },
  computed: {
    ...mapGetters(['getProducts', 'getAllCategories'])
  },
  methods: {
    // Computed'lara parametre vermediğimiz için metod olarak yaptık.
    getStockAlert(count) {
      return {
        'btn-danger text-white': count == 0 || count == null,
        'btn-success text-white': count > 0
      }
    },
    deleteProduct(productId) {
      confirmProductDeletion(productId)
    },
    editProduct(product) {
      this.productBeforeEdit = product
      this.productUpdated = product
      this.isEditMode = true
    },
    cancelEdit() {
      this.isEditMode = false
      this.productUpdated = null
    },
    saveChanges() {
      if (this.productUpdated.name.trim().length > 0 && this.productUpdated.stock > 0 && this.productUpdated.unitSalePrice >= 0
        && this.productUpdated.description.trim().length > 0 && this.productUpdated.category) {

        this.$store.dispatch('updateProduct', this.productUpdated)
        this.isEditMode = false
      } else {
        mySweetAlert.fire({
          icon: 'warning',
          title: 'All places must be filled'
        })
      }

    },
    checkNumberOnly(event) {
      let invalidChars = [
        "-",
        "+",
        "e",
      ];

      if (invalidChars.includes(event.key)) event.preventDefault()
    }
  },
  created() {
    this.$store.dispatch('initApp')
  }
}


</script>

<style scoped>
.myInputBox {
  background-color: transparent;
  border-top: none;
  border-right: none;
  border-left: none;
  border-bottom: solid gray;
  width: 80%;
  height: 50%;
}

.myInputBox:focus {
  outline: none;
  border-bottom: solid #563f7a;
  width: 80%;
  height: 50%;
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

th {
  width: 120px !important;
  padding: .35rem !important;
}

table td {
  padding: .25rem !important;
}

@keyframes slide-in {
  from {
    transform: translateY(-20px);
  }
  to {
    transform: translateY(0px);
  }
}

.slide-enter {
  opacity: 0;
}

.slide-enter-active {
  animation: slide-in 1s ease-out forwards;
  transition: opacity 0.5s;
}

.slide-leave {
}

.slide-leave-active {
  animation: slide-out 1s ease-out forwards;
  transition: opacity 1s;
  opacity: 0;
  position: absolute;
}

.slide-move {
  transition: transform 1s;
}

</style>
