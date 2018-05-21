<template>
<div class="home-page">
  <banner></banner>
  <div class="container">
    <div class="row">
      <div class="col-md-9">
        <div class="feed-toggle">
          <ul class="nav nav-pills outline-active">
            <li class="nav-item">
              <a href="" @click.stop.prevent="currentTag=''; currentPage=1;" :class="{ 'nav-link': true, 'active': !currentTag }">Global Feed</a>
            </li>
            <li v-if="currentTag" class="nav-item active">
              <a href="" class="nav-link active"><i class="ion-pound"></i>{{currentTag}}</a>
            </li>
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
              <ul class="tag-list">
                <li v-for="tag in article.tagList" class="tag-default tag-pill tag-outline">
                  {{tag}}
                </li>
              </ul>
            </a>
          </div>

          <nav>
            <ul class="pagination">
              <li v-for="pageNumber in Math.ceil(articlesCount/10)" :class="{'page-item': true, 'active': pageNumber == currentPage}">
                <a class="page-link" @click.prevent.stop="currentPage=pageNumber;" href="">{{pageNumber}}</a>
              </li>
            </ul>
          </nav>

        </div>
      </div>

      <div class="col-md-3">
        <div class="sidebar">
          <p>Popular Tags</p>
          <div class="tag-list">
            <a v-for="tag in tags" @click.stop.prevent="currentTag=tag; currentPage=1;" href="" class="tag-default tag-pill">{{tag}}</a>
          </div>
        </div>
      </div>

    </div>
  </div>
</div>
</template>

<script>
import Banner from '@/components/Banner';
import axios from 'axios';
import moment from 'moment';

export default {

  components: {
    Banner,
  },

  data() {
    return {
      tags: [],
      articles: [],
      articlesCount: 0,
      currentPage: 0,
      currentTag: '',
    }
  },

  mounted() {
    this.currentPage = 1; // Force currentPage watcher to fire
    axios.get('https://conduit.productionready.io/api/tags').then(res =>
      this.tags = res.data.tags);
  },

  watch: {
    currentPage() {
      this.getArticles();
    },
    currentTag() {
      this.getArticles();
    },
  },

  methods: {

    async getArticles() {
      if (this.currentPage <= 0) {
        return;
      }
      const offset = (this.currentPage - 1) * 10;
      const url = `https://conduit.productionready.io/api/articles?tag=${this.currentTag}&limit=10&offset=${offset}`;
      console.log(url);
      const res = (await axios.get(url)).data;
      console.log(res);
      res.articles.forEach(a => a.updatedAtDisplay = moment(a.updatedAt).format('ddd MMM D YYYY'));
      this.articles = res.articles;
      this.articlesCount = res.articlesCount;
      console.log(this.articles);
      console.log(this.articlesCount);
    },

  },

}
</script>
