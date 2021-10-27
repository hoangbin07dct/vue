<template>
  <div id="app">
    <Layout />
  </div>
</template>

<script>
import Layout from './components/Layout/Index.vue';
// import jwt_decode from 'jwt-decode';
// setInterval(() => {
//   const decoded = jwt_decode(localStorage.getItem('access_token'));
//   const currentTime = Date.now() / 1000;
//   console.log(decoded.exp - currentTime);
// }, 1000);
export default {
  name: 'App',
  components: {
    Layout
  }
};
</script>
