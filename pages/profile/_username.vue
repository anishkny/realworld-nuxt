<template>
<div class="profile-page">

  <div class="user-info">
    <div class="container">
      <div class="row">
        <div class="col-xs-12 col-md-10 offset-md-1">
          <img :src="profile.image || 'https://static.productionready.io/images/smiley-cyrus.jpg'" class="user-img">
          <h4>{{$route.params.username}}</h4>
          <p>{{profile.bio}}</p>

          <button v-if="$store.getters.user && $store.getters.user.username == $route.params.username" @click.stop.prevent="$router.push('/settings')" class="btn btn-sm action-btn btn-outline-secondary">
            <i class="ion-gear-a"></i>&nbsp;
            Edit profile settings
          </button>
          <button v-else class="btn btn-sm action-btn btn-outline-secondary">
            <i class="ion-plus-round"></i>&nbsp;
            <span v-if="profile.following">Unfollow</span>
            <span v-else>Follow</span>
            {{$route.params.username}}
          </button>

        </div>
      </div>
    </div>
  </div>

  <div class="container">
    <div class="row">
      <div class="col-xs-12 col-md-10 offset-md-1">
        <div class="articles-toggle">
          <ul class="nav nav-pills outline-active">
            <li class="nav-item">
              <a href="" @click.stop.prevent="selectedTab = 'MY_ARTICLES'" class="nav-link" :class="{active: selectedTab == 'MY_ARTICLES'}">My Articles</a>
            </li>
            <li class="nav-item">
              <a href="" @click.stop.prevent="selectedTab = 'FAVORITED_ARTICLES'" class="nav-link" :class="{active: selectedTab == 'FAVORITED_ARTICLES'}">Favorited Articles</a>
            </li>
          </ul>
        </div>
        <feed :filter="filter"></feed>
      </div>
    </div>
  </div>

</div>
</template>

<script>
import Feed from '@/components/Feed';

export default {
  components: {
    Feed,
  },
  data() {
    return {
      selectedTab: 'MY_ARTICLES',
      profile: {
        username: this.$route.params.username,
        bio: '',
        image: '',
        following: false,
      },
    }
  },
  computed: {
    filter() {
      if (this.selectedTab == 'MY_ARTICLES') {
        return `author=${this.$route.params.username}`;
      } else {
        return `favorited=${this.$route.params.username}`;
      }
    },
  },
  mounted() {
    this.$axios.get(`/profiles/${this.$route.params.username}`)
      .then(res => {
        this.profile = res.data.profile;
      });
  },
}
</script>
