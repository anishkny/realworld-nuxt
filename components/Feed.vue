<template>
<div>
  <div v-for="article in articles" class="article-preview">
    <div class="article-meta">
      <nuxt-link class="" :to="'/profile/' + article.author.username">
        <img :src="article.author.image || 'https://static.productionready.io/images/smiley-cyrus.jpg'">
      </nuxt-link>
      <div class="info">
        <nuxt-link class="author" :to="'/profile/' + article.author.username">
          {{article.author.username}}
        </nuxt-link>
        <span class="date">{{article.updatedAtDisplay}}</span>
      </div>
      <div class="pull-xs-right">
        <button class="btn btn-sm btn-outline-primary">
            <i class="ion-heart"></i>&nbsp;{{article.favoritesCount}}
          </button>
      </div>
    </div>
    <nuxt-link class="preview-link" :to="'/article/' + article.slug">
      <h1>{{article.title}}</h1>
      <p>{{article.description}}</p>
      <span>Read more...</span>
      <ul class="tag-list">
        <li v-for="tag in article.tagList" class="tag-default tag-pill tag-outline">
          {{tag}}
        </li>
      </ul>
    </nuxt-link>
  </div>

  <nav>
    <ul class="pagination">
      <li v-for="pageNumber in Math.ceil(articlesCount/10)" :class="{'page-item': true, 'active': pageNumber == currentPage}">
        <a href="" class="page-link" @click.prevent.stop="currentPage=pageNumber;">{{pageNumber}}</a>
      </li>
    </ul>
  </nav>

</div>
</template>

<script>
import moment from 'moment';

export default {

  props: ['filter'],

  data() {
    return {
      articles: [],
      articlesCount: 0,
      currentPage: 0,
    }
  },

  mounted() {
    this.currentPage = 1; // Force currentPage watcher to fire
  },

  watch: {
    currentPage() {
      this.getArticles();
    },
    filter() {
      this.currentPage = 1;
      this.getArticles();
    },
  },

  methods: {

    async getArticles() {
      if (this.currentPage <= 0) {
        return;
      }
      const offset = (this.currentPage - 1) * 10;
      let url = '';
      if (this.filter == 'feed') {
        url = `/articles/feed?limit=10&offset=${offset}`;
      } else {
        url = `/articles?limit=10&offset=${offset}&${this.filter}`;
      }
      const res = (await this.$axios.get(url)).data;
      res.articles.forEach(a => a.updatedAtDisplay = moment(a.updatedAt).format('ddd MMM D YYYY'));
      this.articles = res.articles;
      this.articlesCount = res.articlesCount;
    },

  },

}
</script>
