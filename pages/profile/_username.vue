<template>
<div class="profile-page">
  <div class="user-info">
    <div class="container">
      <div class="row">
        <div class="col-xs-12 col-md-10 offset-md-1">
          <img :src="profile.image" class="user-img">
          <h4>{{$route.params.username}}</h4>
          <p>{{profile.bio}}</p>
          <button class="btn btn-sm action-btn btn-outline-secondary">
            <i class="ion-plus-round"></i>&nbsp;
            <span v-if="profile.following">Unfollow</span>
            <span v-else>Follow</span>
            {{$route.params.username}}
          </button>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      profile: {
        username: this.$route.params.username,
        bio: '',
        image: '',
        following: false,
      },
    }
  },
  mounted() {
    axios.get(`https://conduit.productionready.io/api/profiles/${this.$route.params.username}`)
      .then(res => {
        console.log(res.data.profile);
        this.profile = res.data.profile;
      });
  },
}
</script>
