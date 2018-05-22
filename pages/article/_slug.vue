<template>
<div class="article-page">
  <div class="banner">
    <div class="container">
      <h1>{{article.title}}</h1>
      <div class="article-meta">
        <nuxt-link :to="'/profile/' + article.author.username">
          <img :src="article.author.image">
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
        <ul class="tag-list ">
          <li v-for="tag in article.tagList " class="tag-default tag-pill tag-outline ">{{tag}}</li>
        </ul>
      </div>
    </div>
    <hr>
    <div class="article-actions "></div>

    <div class="row ">
      <div class="col-xs-12 col-md-8 offset-md-2 ">
        <p><a class=" " href="#login ">Sign in</a>
          <!-- react-text: 394 -->&nbsp;or&nbsp;
          <!-- /react-text --><a class=" " href="#register ">sign up</a>
          <!-- react-text: 396 -->&nbsp;to add comments on this article.
          <!-- /react-text -->
        </p>
        <div>

          <div v-for="comment in comments " class="card ">
            <div class="card-block ">
              <p class="card-text ">{{comment.body}}</p>
            </div>
            <div class="card-footer ">
              <nuxt-link :to=" '/profile/' + comment.author.username ">
                <img :src="comment.author.image " class="comment-author-img ">
              </nuxt-link>
              &nbsp;
              <nuxt-link :to=" '/profile/' + comment.author.username " class="comment-author ">
                {{comment.author.username}}
              </nuxt-link>
              <span class="date-posted ">{{comment.updatedAtDisplay}}</span>
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
    }
  },

  mounted() {
    this.$axios.get(`https://conduit.productionready.io/api/articles/${this.$route.params.slug}`)
      .then(res => {
        this.article = res.data.article;
        this.article.updatedAtDisplay = moment(this.article.updatedAt).format('ddd MMM D YYYY');
      });
    this.$axios.get(`https://conduit.productionready.io/api/articles/${this.$route.params.slug}/comments`)
      .then(res => {
        this.comments = res.data.comments;
        this.comments.forEach(c => c.updatedAtDisplay = moment(c.updatedAt).format('ddd MMM D YYYY'));
      });
  },

}
</script>
