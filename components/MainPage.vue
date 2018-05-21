<template>
<div class="container">
  <div class="row">
    <div class="col-md-9">
      <div class="feed-toggle">
        <ul class="nav nav-pills outline-active">
          <li class="nav-item">
            <a href="" class="nav-link active">Global Feed</a>
          </li>
          <!-- <li class="nav-item">
            <a href="" class="nav-link active"><i class="ion-pound"></i>dragons</a>
          </li> -->
        </ul>
      </div>
    </div>
    <div class="col-md-3">
      <div class="sidebar">
        <p>Popular Tags</p>
        <div class="tag-list">
          <a v-for="tag in tags" href="" class="tag-default tag-pill">{{tag}}</a>
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
      tags: [],
    }
  },

  async created() {
    const tags = (await axios.get('https://conduit.productionready.io/api/tags')).data.tags;
    this.tags = tags;
  },

}
</script>
