<template>
<div>
  <nav-bar></nav-bar>
  <div class="home-page">
    <banner></banner>
    <main-page></main-page>
  </div>
</div>
</template>

<script>
import Banner from '@/components/Banner';
import MainPage from '@/components/MainPage';
import NavBar from '@/components/NavBar';

export default {
  components: {
    NavBar,
    MainPage,
    Banner,
  },
}
</script>
