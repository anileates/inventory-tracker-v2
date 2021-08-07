<template>
  <nav class="navbar fixed-bottom  navbar-light" style="background-color: #e3f2fd; ">
    <span class="navbar-text mr-auto">
        <strong>Anıl Erdem Ateş</strong> | Design is inspired by 👉 <a href="https://www.udemy.com/course/sifirdan-ileri-seviye-vuejs-2-vuex-vue-router-egitim-seti/">Here</a>
    </span>
    <span class="navbar-text navbar-nav my-2 my-lg-0 mr-3">
        <strong>Alış Tutarı : </strong>
        <span class="badge badge-danger">{{ getTradeResults.purchase | currency }}</span>
    </span>
    <span class="navbar-text navbar-nav my-2 my-lg-0 mr-3">
        <strong>Satış Tutarı : </strong>
        <span class="badge badge-success">{{ getTradeResults.sale | currency }}</span>
    </span>
    <span class="navbar-text navbar-nav my-2 my-lg-0">
        <strong>Bakiye : </strong>
        <span class="badge badge-primary">{{ getTradeResults.balance | currency }}</span>
    </span>
  </nav>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: "Footer",
  computed: mapGetters(['getTradeResults'])
}
</script>

<style scoped>

</style>
