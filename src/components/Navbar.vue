<template>
  <nav class="navbar navbar-expand-lg bg-body-tertiary border shadow-sm" aria-label="Eleventh navbar example">
    <div class="container-fluid">
      
      <button class="navbar-toggler d-block d-lg-none" data-bs-toggle="offcanvas" data-bs-target="#offcanvasExample" type="button"
        aria-controls="navbarsExample09" aria-expanded="true" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <a class="navbar-brand" href="#">Vue Store</a>
      
      <div class="dropdown">
          <a href="#" class="d-flex align-items-center text-decoration-none dropdown-toggle"
            data-bs-toggle="dropdown" aria-expanded="false">
            <img src="https://github.com/mdo.png" alt="" width="32" height="32" class="rounded-circle me-2">
            <strong class="d-none d-lg-flex">{{ user.name }}</strong>
          </a>
          <ul class="dropdown-menu dropdown-menu-end text-small shadow">
            <li @click="handleLogout"><a class="dropdown-item" href="#">Sign out</a></li>
          </ul>
        </div>
    </div>
  </nav>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  name: 'Navbar',
  props: {

  },
  computed: {
    ...mapState(['user'])
  },
  methods: {
    handleLogout() {
      try {
        
        this.$store.commit('clearUser')
        // Redirect to login page or home page
        
        this.$router.reload();
      } catch (error) {
        console.error(error)
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>
