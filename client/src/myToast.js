import Vue from 'vue'
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

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

Vue.use(VueSweetalert2, mixinOptions);

export const myToast = Vue.swal.mixin(mixinOptions)
