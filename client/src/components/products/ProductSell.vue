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
          <h3>Sell Product</h3>
          <hr>
          <div class="form-group">
            <label>Product</label>
            <select class="form-control" v-model="selectedProductId" @change="selectProduct">
              <option value="" disabled selected>Select A Product...</option>
              <option
                v-for="product in getProducts"
                :disabled="product.stock == 0"
                :value="product.code"
                v-if="product.name"
              >{{ product.name }}
              </option>
            </select>
          </div>

          <transition name="fade" mode="out-in">
            <div class="card mb-2 border border-danger" v-if="product !== null">
              <div class="card-body">
                <div class="row">
                  <div class="col-12 text-center">
                    <div class="mb-3">
                      <span class="badge badge-info">Stock: {{ product.stock }}</span>
                      <span class="badge badge-primary">Unit Price: {{ product.unitPrice | currency }}</span>
                    </div>
                    <p class="border border-warning p-2 text-secondary">
                      {{ product.description }}
                    </p>
                    <div class="border border-warning p-2 text-secondary" v-if="product.imageUrl">
                      <img :src="product.imageUrl" width="80%" height="80%">
                    </div>
                    <div v-else>
                      No Image
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </transition>

          <form class="form-group needs-validation" novalidate>
            <div class="invalid">
              <label for="validationCustom03" class="form-label">Quantity Sold</label>
              <input type="number" min="0" step="1" :class="isAmountValid" id="validationCustom03" v-model="amount" placeholder="Enter Count..." required>
              <div class="invalid-feedback">
                Insufficient Stock!
              </div>
            </div>
          </form>
          <hr>
          <button class="btn btn-primary" :disabled="saveEnabled" @click="sellProduct">Save</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapGetters} from "vuex";

export default {
  name: "ProductSell",
  data() {
    return {
      selectedProductId: null,
      product: null,
      amount: null,
      isSaveButtonClicked: false
    }
  },
  computed: {
    ...mapGetters(['getProducts']),
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
    saveEnabled() {
      if (this.selectedProductId !== null && parseInt(this.amount) > 0) {
        return parseInt(this.amount) > parseInt(this.product.stock)
      } else {
        return true
      }
    },
    isAmountValid() {
      if (!this.product || !this.amount) {// default
        return {
          'form-control': true
        }
      } else {
        return {
          'form-control': (parseInt(this.amount) <= parseInt(this.product.stock)),
          'form-control is-invalid': (parseInt(this.amount) > parseInt(this.product.stock))
        }
      }
    }
  },
  methods: {
    selectProduct() {
      this.product = this.$store.getters.getProduct(this.selectedProductId)[0]
    },
    sellProduct() {
      this.isSaveButtonClicked = true
      let product = {
        code: this.selectedProductId,
        count: this.amount
      }

      this.$store.dispatch('sellProduct', product)
    }
  },
  beforeRouteLeave(to, from, next) {
    if ((this.selectedProductId !== null || this.amount > 0) && this.saveButtonClicked) {
      if (confirm('Kaydedilmemiş değişiklikler var. Yine de çıkmak istiyor musunuz?')) {
        next()
      } else {
        next(false)
      }
    } else {
      next()
    }
  }
}

</script>

<style scoped>
.border-danger {
  border-style: dashed !important;
}
</style>
