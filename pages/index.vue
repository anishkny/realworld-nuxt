<template>
<div>
  <nav-bar></nav-bar>
  <div class="home-page">
    <banner></banner>
    <main-page></main-page>
  </div>
  <a id="forkOnGH" href="https://github.com/anishkny/realworld-nuxt" target="_top" style="">
  <i class="ion-social-github"></i>&nbsp;&nbsp;Fork on GitHub</a>

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


<style scoped>
#forkOnGH {
  position: fixed;
  bottom: 0;
  width: 100%;
  background: linear-gradient(#485563, #29323c);
  text-align: center;
  padding: 15px;
  box-shadow: 0 5px 5px 5px rgba(0, 0, 0, 0.4);
  z-index: 999;
  color: #fff;
  font-size: 1.5rem;
  display: block
}
</style>
