<template>
  <nav class="navbar navbar-expand-lg navbar-dark" style="background-color: #563F7A">
    <router-link
      to="/"
      tag="a"
      class="navbar-brand">
      Product List
    </router-link>

    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav mr-auto">
        <router-link active-class="active" to="/urun-islemleri" tag='li' class="nav-item">
          <a class="nav-link" href="#">Add Product</a>
        </router-link>

        <router-link active-class="active" to="/urun-cikisi" tag='li' class="nav-item">
          <a class="nav-link" href="#">Sell Product</a>
        </router-link>

        <router-link active-class="active" to="/manage-categories" tag='li' class="nav-item">
          <a class="nav-link" href="#">Categories</a>
        </router-link>
      </ul>
    </div>
  </nav>

</template>

<script>
export default {
  name: "Header"
}
</script>

<style scoped>

</style>
