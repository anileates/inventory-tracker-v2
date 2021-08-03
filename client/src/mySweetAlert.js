import Vue from 'vue'
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
import {store} from './store/store'

const mixinOptions = {
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.addEventListener('mouseenter', Vue.swal.stopTimer)
    toast.addEventListener('mouseleave', Vue.swal.resumeTimer)
  }
}

const confirmOptions = {
  customClass: {
    confirmButton: 'btn btn-success',
    cancelButton: 'btn btn-danger'
  },
  buttonsStyling: false
}

Vue.use(VueSweetalert2);

export const mySweetAlert = Vue.swal.mixin(mixinOptions)
const swalWithBootstrapButtons = Vue.swal.mixin(confirmOptions)


export const confirmDeletion = (category) => {
  swalWithBootstrapButtons.fire({
    title: 'Are you sure?',
    text: "All products in this category will be lost. You won't be able to revert this!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Yes, delete it!',
    cancelButtonText: 'No, cancel!',
    reverseButtons: true
  }).then((result) => {
    if (result.isConfirmed) {
      swalWithBootstrapButtons.fire(
        'Deleted!',
        'Category has been deleted.',
        'success'
      )

      store.dispatch('deleteCategory', category)
    } else if (result.dismiss === Vue.swal.DismissReason.cancel) {
      swalWithBootstrapButtons.fire(
        'Cancelled',
        'Category is safe!',
        'error'
      )
    }
  })


}


