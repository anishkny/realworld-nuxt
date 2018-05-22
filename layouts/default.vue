<template>
<div>
  <nav-bar></nav-bar>
  <nuxt/>
  <a href="https://github.com/anishkny/realworld-nuxt" id="forkOnGH">
    <i class="ion-social-github"></i>&nbsp;&nbsp;Fork on GitHub</a>
</div>
</template>

<script>
import NavBar from '@/components/NavBar';

export default {
  components: {
    NavBar,
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
