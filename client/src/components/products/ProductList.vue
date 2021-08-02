<template>
  <div class="container">
    <div class="row">
      <div class="col-12 mb-5 card mt-5 shadow">
        <div class="card-body">
          <h3>Ürün Listesi</h3>
          <hr>
          <table class="table table-hover table-striped table-bordered" v-if="getProducts">
            <thead>
            <th>id</th>
            <th>Category Name</th>
            <th>Ürün Adı</th>
            <th>Adet</th>
            <th>Fiyat</th>
            <th>Açıklama</th>
            </thead>
            <tbody>
            <tr v-for="product in getProducts">
              <td class="align-middle text-center"><span class="badge badge-info">{{ product.code }}</span></td>
              <td class="align-middle text-center">{{ product.category.name }}</td>
              <td class="align-middle text-center">{{ product.name }}</td>
              <td class="align-middle text-center" :class="getStockAlert(product.stock)">{{ product.stock }}</td>
              <td style="width: 120px;">{{ product.unitPrice | currency }}</td>
              <td class="align-middle">{{ product.description }}</td>
            </tr>
            </tbody>
          </table>
          <div class="alert alert-warning" v-else>
            <strong>Henüz Burada Bir Kayıt Bulamadık</strong>
            <br>
            <small>Kayıt Eklemek için Ürün İşlemleri menüsünden yararlanabilirsiniz
            </small>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
import {getAlertMessage} from "../../store/getters";


export default {
  name: "ProductList",
  computed: {
    ...mapGetters(['getProducts']),
  },
  methods: {
    // Computed'lara parametre vermediğimiz için metod olarak yaptık.
    getStockAlert(count) {
      return {
        'btn-danger text-white': count == 0 || count == null,
        'btn-success text-white': count > 0
      }
    }
  }
}
</script>

<style scoped>

</style>
