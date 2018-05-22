<template>
<div class="home-page">
  <banner v-if="!$store.state.user"></banner>

  <div class="container page">
    <div class="row">

      <div class="col-md-9">
        <div class="feed-toggle">
          <ul class="nav nav-pills outline-active">
            <li v-if="$store.state.user" class="nav-item">
              <a href="" @click.stop.prevent="" class="nav-link">Your Feed</a>
            </li>
            <li class="nav-item">
              <a href="" @click.stop.prevent="currentTag=''; filter='';" :class="{ 'nav-link': true, 'active': !currentTag }">
                Global Feed
              </a>
            </li>
            <li v-if="currentTag" class="nav-item active">
              <a href="" class="nav-link active">
                <i class="ion-pound"></i>{{currentTag}}
              </a>
            </li>
          </ul>
        </div>
        <feed :filter="filter"></feed>
      </div>

      <div class="col-md-3">
        <div class="sidebar">
          <p>Popular Tags</p>
          <div class="tag-list">
            <a v-for="tag in tags" @click.stop.prevent="currentTag=tag; filter = 'tag=' + tag;" href="" class="tag-default tag-pill">{{tag}}</a>
          </div>
        </div>
      </div>

    </div>
  </div>

</div>
</template>

<script>
import Banner from '@/components/Banner';
import Feed from '@/components/Feed';
import axios from 'axios';

export default {

  components: {
    Banner,
    Feed,
  },

  data() {
    return {
      tags: [],
      currentTag: '',
      filter: '',
    }
  },

  mounted() {
    axios.get('https://conduit.productionready.io/api/tags').then(res =>
      this.tags = res.data.tags);
  },

}
</script>
