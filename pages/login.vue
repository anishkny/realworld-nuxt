<template>
<div class="auth-page">
  <div class="container page">
    <div class="row">
      <div class="col-md-6 offset-md-3 col-xs-12">
        <h1 class="text-xs-center">Sign In</h1>
        <p class="text-xs-center">
          <nuxt-link class="" to="/register">Need an account?</nuxt-link>
        </p>
        <form>
          <fieldset>
            <fieldset class="form-group">
              <input v-model="email" type="email" class="form-control form-control-lg" placeholder="Email">
            </fieldset>
            <fieldset class="form-group">
              <input v-model="password" type="password" class="form-control form-control-lg" placeholder="Password">
            </fieldset>
            <button @click.stop.prevent="handleLogin" class="btn btn-lg btn-primary pull-xs-right" type="submit">
              Sign in
            </button>
          </fieldset>
        </form>
      </div>
    </div>
  </div>
</div>
</template>

<script>
export default {
  data() {
    return {
      email: '',
      password: '',
    }
  },
  methods: {
    handleLogin() {
      this.$axios.post('/users/login', {
        user: {
          email: this.email,
          password: this.password,
        },
      }).then(res => {
        this.$store.commit('setUser', res.data.user);
        this.$router.push('/');
      });
    },
  },
}
</script>
