<template lang="pug">
  b-navbar(toggleable='lg' type='dark' class='navbar')
    b-navbar-brand(to='/') PasserIT
    b-navbar-nav(v-if="$route.path === '/'" class="ml-auto")
      router-link(to='/localbitcoinSorting')
        b-button(size='sm' class='my-2 my-sm-0' variant='danger') Localbitcoins Sorting
</template>

<script>
export default {
  name: 'Navbar'
}
</script>

<style>
 .navbar {
  background-color: #011627!important;
 }
</style>
