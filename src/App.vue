<template>
  <div id="appContainer">
    <template v-if="user">
      <Navbar />
      <div class="container-fluid">
        <div class="row">
          <Sidebar />
          <router-view :key="$route.fullPath" class="col-md-9 ms-sm-auto col-lg-10 px-md-4" />
        </div>
      </div>
    </template>
    <template v-else>
      <Login></Login>
    </template>
  </div>
</template>

<script>
import Navbar from './components/Navbar.vue'
import Sidebar from './components/Sidebar.vue'
import Login from './components/Login.vue'
import { mapState } from 'vuex'

export default {
  components: {
    Navbar,
    Sidebar,
    Login
  },
  computed: {
    ...mapState(['user'])
  },
  mounted() {
    // Retrieve user object from local storage
    const user = JSON.parse(window.localStorage.getItem('user'))
    if (user) {
      // Set user object in the state
      this.$store.commit('setUser', user)
    }
  }
}
</script>