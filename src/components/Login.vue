<template>
  <v-container>
    <v-row class="text-center">
      <v-col cols="12">

        <main class="form-signin w-100 m-auto">
          <form @submit.prevent.stop="login">
            <img class="mb-4" :src="require('../assets/logo.svg')" alt="" width="72" height="57">
            <h1 class="h3 mb-3 fw-normal">Vue Store</h1>
            <div class="inputs-container d-flex flex-column col-lg-6 mx-auto gap-3">

              <div class="form-floating">
                <input type="email" class="form-control" id="floatingInput" placeholder="name@example.com" v-model="user.email">
                <label for="floatingInput">Email address</label>
              </div>
              <div class="form-floating">
                <input type="password" class="form-control" id="floatingPassword" placeholder="Password" v-model="user.password">
                <label for="floatingPassword">Password</label>
              </div>

              <div class="checkbox mb-3">
                <label>
                  <input type="checkbox" value="remember-me"> Remember me
                </label>
              </div>
              <button class="w-100 btn btn-lg btn-primary" type="submit">Sign in</button>
              <p class="mt-5 mb-3 text-muted">© 2017–2023</p>
            </div>
          </form>
        </main>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  
  name: 'Login',

  data: () => ({
    user: {
      email: '',
      password: '',
      name: 'Peter Samir'
    }
  }),
  methods: {
    ...mapActions(['login']),
    login() {
      try {
        // Set user object in the state
        this.$store.commit('setUser', this.user)
      } catch (error) {
        console.error(error)
      }
    }
  }
}
</script>
