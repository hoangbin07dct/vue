<template>
  <div class="header">
    <h1 class="header__logo">
      <router-link to="/">
        <figure class="header__logo__image">
          <img :src="logo" width="600" height="65" alt="Cater de Vietnam" />
        </figure>
      </router-link>
    </h1>
    <div class="header__right">
      <p>
        <router-link to="/profile">
          <i class="glyphs-icon_avt"></i>
          <span>{{ userName }}</span>
        </router-link>
      </p>
      <Button type="primary" label="ログアウト" @click="handleLogout" className="header__right__button" />
    </div>
  </div>
</template>
<script>
import Button from '../Button/Index.vue';
import logo from '../../../images/logo2.png'
export default {
  name: 'Header',
  components: {
    Button
  },
  data() {
    return {
      logo: logo,
      userName: ''
    };
  },
  methods: {
    handleLogout() {
      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');
      localStorage.removeItem('users');
      localStorage.removeItem('users_paging');
      this.$store.dispatch('auth/handleLogout');
      this.$router.push({ name: 'Login' });
      this.$store.dispatch('list/handleRoleReset');
    }
  },
  mounted() {
    const token = this.$store.state.auth.info.access_token;
    this.userName = this.$store.getters['auth/info'].user_name;
    this.$store.dispatch('list/handleRole', this.token);
  }
};
</script>

<style lang="scss" scoped>
@import '../../../sass/Header.module';
</style>
