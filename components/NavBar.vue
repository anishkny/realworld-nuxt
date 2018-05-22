<template>
<nav class="navbar navbar-light">
  <div class="container">
    <nuxt-link to="/" class="navbar-brand">conduit</nuxt-link>

    <ul class="nav navbar-nav">
      <li class="nav-item">
        <a href="https://github.com/anishkny/realworld-nuxt" class="nav-link" style="color: red;">Work in progress!</a>
      </li>
    </ul>

    <ul class="nav navbar-nav pull-xs-right">
      <li class="nav-item">
        <nuxt-link to="/" class="nav-link">Home</nuxt-link>
      </li>

      <template v-if="$store.getters.user">
        <li class="nav-item">
          <nuxt-link to="/editor" class="nav-link"><i class="ion-compose"></i>&nbsp;New Post</nuxt-link>
        </li>
        <li class="nav-item">
          <nuxt-link to="/settings" class="nav-link"><i class="ion-gear-a"></i>&nbsp;Settings</nuxt-link>
        </li>
        <li class="nav-item">
          <nuxt-link :to="'/profile/' + $store.getters.user.username" class="nav-link">{{$store.getters.user.username}}</nuxt-link>
        </li>
      </template>

      <template v-else>
        <li class="nav-item">
          <nuxt-link to="/login" class="nav-link">Sign in</nuxt-link>
        </li>
        <li class="nav-item">
          <nuxt-link to="/register" class="nav-link">Sign up</nuxt-link>
        </li>
      </template>
    </ul>
  </div>
</nav>
</template>
