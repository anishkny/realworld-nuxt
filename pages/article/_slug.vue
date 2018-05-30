<template>
<div class="article-page">
  <div class="banner">
    <div class="container">
      <h1>{{article.title}}</h1>
      <div class="article-meta">
        <nuxt-link :to="'/profile/' + article.author.username">
          <img :src="article.author.image || 'https://static.productionready.io/images/smiley-cyrus.jpg'">
        </nuxt-link>
        <div class="info">
          <nuxt-link :to="'/profile/' + article.author.username" class="author">
            {{article.author.username}}
          </nuxt-link>
          <span class="date">{{article.updatedAtDisplay}}</span>
        </div>
        <span></span>
      </div>
    </div>
  </div>

  <div class="container page">
    <div class="row article-content">
      <div class="col-xs-12">
        <div>
          <p v-html="$md.render(article.body)"></p>
        </div>
        <ul class="tag-list">
          <li v-for="tag in article.tagList " class="tag-default tag-pill tag-outline">{{tag}}</li>
        </ul>
      </div>
    </div>
    <hr>
    <div class="article-actions"></div>

    <div class="row">
      <div class="col-xs-12 col-md-8 offset-md-2">

        <form v-if="$store.getters.user" class="card comment-form">
          <div class="card-block">
            <textarea v-model="newCommentText" class="form-control" placeholder="Write a comment..." rows="3">
            </textarea>
          </div>
          <div class="card-footer">
            <img :src="$store.getters.user.image || 'https://static.productionready.io/images/smiley-cyrus.jpg'" class="comment-author-img">
            <button @click.stop.prevent="handlePostComment" class="btn btn-sm btn-primary" type="submit">
              Post Comment
            </button>
          </div>
        </form>

        <p v-else>
          <nuxt-link to="/login">Sign in</nuxt-link> &nbsp;or&nbsp;
          <nuxt-link to="/register">sign up</nuxt-link> &nbsp;to add comments on this article.
        </p>

        <div>

          <div v-for="comment in comments" class="card">
            <div class="card-block">
              <p class="card-text">{{comment.body}}</p>
            </div>
            <div class="card-footer">
              <nuxt-link :to="'/profile/' + comment.author.username">
                <img :src="comment.author.image || 'https://static.productionready.io/images/smiley-cyrus.jpg'" class="comment-author-img">
              </nuxt-link>
              &nbsp;
              <nuxt-link :to=" '/profile/' + comment.author.username " class="comment-author">
                {{comment.author.username}}
              </nuxt-link>
              <span class="date-posted">{{comment.updatedAtDisplay}}</span>
              <span v-if="$store.getters.user && comment.author.username == $store.getters.user.username" class="mod-options">
                <i @click="handleDeleteComment(comment.id)" class="ion-trash-a"></i>
              </span>
            </div>
          </div>

        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import moment from 'moment';

export default {
  data() {
    return {
      article: {
        title: '',
        slug: '',
        body: '',
        createdAt: '',
        updatedAt: '',
        tagList: [],
        description: '',
        author: {
          username: '',
          bio: '',
          image: 'https://static.productionready.io/images/smiley-cyrus.jpg',
          following: false,
        },
        favorited: false,
        favoritesCount: 0,
      },
      comments: [],
      newCommentText: '',
    }
  },

  methods: {

    handlePostComment() {
      this.$axios.post(`/articles/${this.$route.params.slug}/comments`, {
        comment: { body: this.newCommentText }
      }).then(this.getComments);
      this.newCommentText = '';
    },

    getComments() {
      this.$axios.get(`/articles/${this.$route.params.slug}/comments`)
        .then(res => {
          this.comments = res.data.comments;
          this.comments.forEach(c => c.updatedAtDisplay = moment(c.updatedAt).format('ddd MMM D YYYY'));
        });
    },

    handleDeleteComment(commentId) {
      this.$axios.delete(`/articles/${this.$route.params.slug}/comments/${commentId}`)
        .then(this.getComments);
    },

  },

  mounted() {
    this.$axios.get(`/articles/${this.$route.params.slug}`)
      .then(res => {
        this.article = res.data.article;
        this.article.updatedAtDisplay = moment(this.article.updatedAt).format('ddd MMM D YYYY');
      });
    this.getComments();
  },

}
</script>
