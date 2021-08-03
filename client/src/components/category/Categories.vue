<template>
  <div class="container">
    <div class="row">
      <div class="col-12 mb-5 card mt-5 shadow">
        <div class="card-body">
          <h3>Categories</h3>
          <hr />
          <table
            class="table table-hover table-striped table-bordered"
            v-if="getAllCategories"
          >
            <thead class="text-center">
              <th>Category id</th>
              <th>Category Name</th>
              <th>Product Count</th>
              <th>Delete</th>
            </thead>

            <tbody>
              <tr v-for="category in getAllCategories">
                <td class="align-middle text-center">
                  <span class="badge badge-info">{{ category.id }}</span>
                </td>
                <td class="align-middle text-center" v-if="!isEditMode">
                  {{ category.name }}
                  <span
                    style="font-size: 1.3rem; cursor: pointer"
                    class="float-right mr-2"
                    @click="editCategory"
                  >
                    <i class="far fa-edit" />
                  </span>
                </td>
                <td class="align-middle text-center" v-else>
                  <input
                    type="text"
                    class="myInputBox text-center"
                    v-model="category.name"
                  />

                  <span
                    style="font-size: 1.3rem; cursor: pointer; color: seagreen"
                    class="float-right mr-2"
                    @click="applyChanges"
                  >
                    <i class="fas fa-check"></i>
                  </span>

                  <span
                    style="font-size: 1.3rem; cursor: pointer; color: darkred"
                    class="float-right mr-3"
                    @click="cancelChanges"
                  >
                    <i class="fas fa-times"></i>
                  </span>
                </td>
                <td class="align-middle text-center">
                  {{ category._count.products }}
                </td>
                <td class="align-middle text-center">
                  <span
                    style="font-size: 1.3rem; color: Tomato; cursor: pointer"
                    @click="deleteCategory(category)"
                  >
                    <i class="far fa-trash-alt" />
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
          <div class="alert alert-warning" v-else>
            <strong>Henüz Burada Bir Kayıt Bulamadık</strong>
            <br />
            <small
              >Kayıt Eklemek için Ürün İşlemleri menüsünden yararlanabilirsiniz
            </small>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { confirmDeletion } from '../../mySweetAlert'

export default {
  name: "Categories",
  data() {
    return {
      isEditMode: false,
    };
  },
  computed: {
    ...mapGetters(["getAllCategories"]),
  },
  methods: {
    editCategory() {
      this.isEditMode = true;
    },
    deleteCategory(category) {
      confirmDeletion(category)
    },
    applyChanges() {},
    cancelChanges() {
      this.isEditMode = false;
    },
  }
};
</script>

<style scoped>
.myInputBox {
  background-color: transparent;
  border-top: none;
  border-right: none;
  border-left: none;
  border-bottom: solid gray;
}

.myInputBox:focus {
  outline: none;
  border-bottom: solid #563f7a;
}
</style>
