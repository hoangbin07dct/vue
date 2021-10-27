<template>
  <div id="layout">
    <Sidebar @clicked="onClickOpen" v-if="loggedIn" />
    <div class="wrapper" :class="{ full: isActived }">
      <Header v-if="loggedIn" />
      <router-view />
    </div>
  </div>
</template>

<script>
import Header from '../../components/Header/Index.vue';
import Sidebar from '../../components/Sidebar/Index.vue';
import { detectDevice } from '../../utils/helpers';
// import jwt_decode from 'jwt-decode';
// setInterval(() => {
//   const decoded = jwt_decode(localStorage.getItem('access_token'));
//   const currentTime = Date.now() / 1000;
//   console.log(decoded.exp - currentTime);
// }, 1000);
export default {
  name: 'Layout',
  data: () => {
    return {
      isOpen: false
    };
  },
  components: {
    Header,
    Sidebar
  },
  methods: {
    onClickOpen(e) {
      this.isOpen = e;
    }
  },
  computed: {
    loggedIn() {
      return this.$store.getters['auth/info'].isLogin;
    },
    isActived() {
      if (detectDevice()) {
        return true;
      } else {
        return this.isOpen;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import '../../../sass/Wrapper.module';
</style>
