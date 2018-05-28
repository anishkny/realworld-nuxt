<template>
<div class="settings-page">
  <div class="container page">
    <div class="row">
      <div class="col-md-6 offset-md-3 col-xs-12">
        <h1 class="text-xs-center">Your Settings</h1>
        <form>
          <fieldset>
            <fieldset class="form-group">
              <input v-model="image" type="text" class="form-control" placeholder="URL of profile picture">
            </fieldset>
            <fieldset class="form-group">
              <input v-model="username" type="text" class="form-control form-control-lg" placeholder="Username">
            </fieldset>
            <fieldset class="form-group">
              <textarea v-model="bio" class="form-control form-control-lg" rows="8" placeholder="Short bio about you"></textarea>
            </fieldset>
            <fieldset class="form-group">
              <input v-model="email" type="email" class="form-control form-control-lg" placeholder="Email">
            </fieldset>
            <fieldset class="form-group">
              <input type="password" class="form-control form-control-lg" placeholder="New Password">
            </fieldset>
            <button @click.stop.prevent="handleUpdateSettings" class="btn btn-lg btn-primary pull-xs-right" type="submit">
              Update Settings
            </button>
          </fieldset>
        </form>
        <hr>
        <button @click.stop.prevent="handleLogout" class="btn btn-outline-danger">
          Or click here to logout.
        </button>
      </div>
    </div>
  </div>
</div>
</template>

<script>
export default {

  data() {
    const user = this.$store.getters.user;
    if (!user) {
      this.$router.push('/login');
    }
    return {
      image: '',
      username: '',
      bio: '',
      email: '',
      password: '',
    }
  },

  mounted() {
    this.getSettings();
  },

  methods: {

    getSettings() {
      const user = this.$store.getters.user;
      if (!user) {
        this.$router.push('/login');
      }
      console.log(user.bio);
      this.image = user.image;
      this.username = user.username;
      this.bio = user.bio;
      this.email = user.email;
      this.password = '';
    },

    handleUpdateSettings() {
      const data = {
        user: {
          image: this.image,
          username: this.username,
          bio: this.bio,
          email: this.email,
        },
      };
      if (this.password) {
        data.user.password = this.password;
      }
      this.$axios.put(`/user`, data).then(res => {
        this.$store.commit('setUser', res.data.user);
        this.$router.push(`/profile/${res.data.user.username}`);
      });
    },

    handleLogout() {
      this.$store.commit('setUser', null);
      this.$router.push('/');
    },

  },

}
</script>
