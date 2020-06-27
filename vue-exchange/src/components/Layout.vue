<template lang='pug'>
  div
    Nabvar
    <router-view/>
    Footer
</template>

<script>
  import Nabvar from './Navbar.vue'
  import Footer from './Footer.vue'

export default {
  name: 'Layout',
  components: { Nabvar, Footer }
}
</script>

<style>

</style>
