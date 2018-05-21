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
      <div>
        <div v-for="article in articles" class="article-preview">
          <div class="article-meta">
            <a class="" :href="'profile/' + article.author.username">
              <img :src="article.author.image">
            </a>
            <div class="info">
              <a class="author" :href="'profile/' + article.author.username">
                {{article.author.username}}
              </a>
              <span class="date">{{article.updatedAtDisplay}}</span>
            </div>
            <div class="pull-xs-right">
              <button class="btn btn-sm btn-outline-primary">
                <i class="ion-heart"></i>&nbsp;{{article.favoritesCount}}
              </button>
            </div>
          </div>
          <a class="preview-link" :href="'article/' + article.slug">
            <h1>{{article.title}}</h1>
            <p>{{article.description}}</p>
            <span>Read more...</span>
            <ul class="tag-list"></ul>
          </a>
        </div>
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
import moment from 'moment';

export default {

  data() {
    return {
      tags: [],
      articles: [],
    }
  },

  async created() {
    const tags = (await axios.get('https://conduit.productionready.io/api/tags')).data.tags;
    this.tags = tags;
    const articles = (await axios.get('https://conduit.productionready.io/api/articles?limit=10&offset=0')).data.articles;
    articles.forEach(a => a.updatedAtDisplay = moment(a.updatedAt).format('ddd MMM D YYYY'));
    this.articles = articles;
  },

}
</script>
