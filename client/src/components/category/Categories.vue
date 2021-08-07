<template>
  <div class="container">
    <div class="row">
      <div class="col-12 mb-5 card mt-5 shadow">
        <div class="card-body">
          <h3>
            Categories

            <transition
              enter-class=""
              enter-active-class="animate__animated animate__swing animate__repeat-2"
              appear
            >
              <span
                key="sa"
                style="font-size: 1.35rem; cursor: pointer; color: seagreen"
                class="float-right mt-2"
                :class="swing"
                @click="addNewRow"
                v-if="!isNewButtonClicked"
                >Add New
                <i class="fas fa-plus-circle"></i>
              </span>

              <span
                style="font-size: 1.35rem; cursor: pointer; color: seagreen"
                class="float-right mr-2"
                @click="saveCategory"
                v-else
              >
                Save Category
                <i class="fas fa-check"></i>
              </span>
            </transition>
          </h3>

          <hr />

          <table
            class="table table-hover table-striped table-bordered"
            v-if="getAllCategories && !getAllCategories.length == 0"
          >
            <thead class="text-center">
              <th>Category id</th>
              <th>Category Name</th>
              <th>Product Count</th>
              <th>Delete</th>
            </thead>

            <tbody name="slide" is="transition-group">
              <tr v-if="isNewButtonClicked" key="newCategoryRow">
                <td class="align-middle text-center">
                  Generated automatically.
                </td>
                <td class="align-middle text-center">
                  <input
                    type="text"
                    class="myInputBox text-center"
                    v-model="newCategoryName"
                  />
                </td>
                <td class="align-middle text-center">None</td>
                <td class="align-middle text-center">
                  <span
                    style="font-size: 1.3rem; color: darkred; cursor: pointer"
                    @click="cancelNewCategory"
                  >
                    <i class="fas fa-times"></i>
                  </span>
                </td>
              </tr>

              <tr :key="index" v-for="(category, index) in getAllCategories">
                <td class="align-middle text-center">
                  <span class="badge badge-info">{{ category.id }}</span>
                </td>
                <td class="align-middle text-center" v-if="isEditMode && selectedCategoryToEdit == category.id">
                  <input type="text" class="myInputBox text-center" v-model="editedName"/>

                  <span
                    style="font-size: 1.3rem; cursor: pointer; color: seagreen"
                    class="float-right mr-2"
                    @click="applyChanges(category.id)"
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
                <td class="align-middle text-center" v-else>
                  {{ category.name }}
                  <span
                    style="font-size: 1.3rem; cursor: pointer"
                    class="float-right mr-2"
                    @click="editCategory(category)"
                  >
                    <i class="far fa-edit" />
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

          <div v-else>
            <div
              class="alert alert-warning"
              @mouseenter="isMouseOver = !isMouseOver"
              @mouseleave="isMouseOver = !isMouseOver"
            >
              <strong>There is no record here yet</strong>
              <br />
              <small>Click add new button to get started </small>
            </div>

            <transition name="fade">
              <table
                class="table table-hover table-striped table-bordered"
                v-if="isNewButtonClicked"
              >
                <thead class="text-center">
                  <th>Category id</th>
                  <th>Category Name</th>
                  <th>Product Count</th>
                  <th>Delete</th>
                </thead>

                <tbody>
                  <tr>
                    <td class="align-middle text-center">
                      Generated automatically.
                    </td>
                    <td class="align-middle text-center">
                      <input
                        type="text"
                        class="myInputBox text-center"
                        v-model="newCategoryName"
                      />
                    </td>
                    <td class="align-middle text-center">None</td>
                    <td class="align-middle text-center">
                      <span
                        style="
                          font-size: 1.3rem;
                          color: darkred;
                          cursor: pointer;
                        "
                        @click="cancelNewCategory"
                      >
                        <i class="fas fa-times"></i>
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </transition>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { confirmDeletion, mySweetAlert } from "../../mySweetAlert";

export default {
  name: "Categories",
  data() {
    return {
      isEditMode: false,
      nameBeforeEdit: "",
      editedName: "",
      isNewButtonClicked: null,
      newCategoryName: null,
      isMouseOver: null,
      selectedCategoryToEdit: null
    };
  },
  computed: {
    ...mapGetters(["getAllCategories"]),
    swing: function () {
      return {
        "float-right mt-2 animate__animated animate__swing animate__repeat-2":
          this.isMouseOver,
        "float-right mt-2": !this.isMouseOver,
      };
    },
  },
  methods: {
    editCategory(category) {
      this.selectedCategoryToEdit = category.id
      this.isEditMode = true;
      this.nameBeforeEdit = category.name;
      this.editedName = category.name;
    },
    deleteCategory(category) {
      confirmDeletion(category);
    },
    applyChanges(categoryId) {
      this.isEditMode = false;
      this.$store.dispatch("updateCategory", {
        id: categoryId,
        name: this.editedName,
      });
    },
    cancelChanges() {
      this.isEditMode = false;
    },
    addNewRow() {
      this.isNewButtonClicked = !this.isNewButtonClicked;
    },
    saveCategory() {
      if (this.newCategoryName == null || this.newCategoryName.trim() === "") {
        mySweetAlert.fire({
          icon: "warning",
          title: "Name can not be empty!",
        });
      } else {
        this.isNewButtonClicked = false;
        this.$store.dispatch("saveCategory", this.newCategoryName);
        this.newCategoryName = null;
      }
    },
    cancelNewCategory() {
      this.isNewButtonClicked = false;
      this.newCategoryName = null;
    },
  },
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

/* New category animation */
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

@keyframes slide-in {
  from {
    transform: translateY(-20px);
  }
  to {
    transform: translateY(0px);
  }
}

/* New category animation */

/* Empty Table */
.fade-enter {
  opacity: 0;
}

.fade-enter-active {
  animation: slide-in 1s ease-out forwards;
  transition: opacity 0.5s;
}

.fade-leave {
}

.fade-leave-active {
  animation: slide-out 1s ease-out forwards;
  transition: opacity 0.5s;
  opacity: 0;
}

/* Empty Table */
</style>
