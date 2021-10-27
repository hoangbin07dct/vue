<template>
  <div class="loginWrapper">
    <figure class="loginLogo">
      <img :src="logo" />
    </figure>
    <div class="loginInner">
      <div class="loginTitle">
        <p>Login System</p>
      </div>
      <p class="loginMessage">{{ message }}</p>
      <form @submit.prevent="handleLogin">
        <div class="formRow">
          <label>Account or Email</label>
          <input type="text" name="user_id" v-model="user_id" autocomplete="off" placeholder="Account or Email" />
        </div>
        <div class="formRow">
          <label>Password</label>
          <input type="password" name="user_password" v-model="user_password" autocomplete="off" placeholder="Password" />
        </div>
        <div class="formRow">
          <button type="submit">Login</button>
        </div>
        <!-- <div class="formRow">
          <p class="forgot">
            <router-link to="/forgot-password">Forgot Password ?</router-link>
          </p>
        </div> -->
      </form>
    </div>
    <!-- <div class="creatAcc">
      <router-link to="/forgot-password">Create an Account</router-link>
    </div> -->
  </div>
</template>

<script>
import { loginRequest } from '../../utils/api-request';
import { pathLogin } from '../../utils/api-path';
import logo from '../../../images/logo.png' 
export default {
  name: 'Login',
  data: () => {
    return {
      logo: logo,
      user_id: '',
      user_password: '',
      message: ''
    };
  },
  methods: {
    handleLogin() {
      const data = {
        user_id: this.user_id,
        user_password: this.user_password
      };
      loginRequest(pathLogin, JSON.stringify(data)).then((rs) => {
        if (rs.status === 200) {
          const { access_token, refresh_token } = rs.result.data;
          this.message = '';
          localStorage.setItem('access_token', access_token);
          localStorage.setItem('refresh_token', refresh_token);
          this.$store.dispatch('auth/handleLogin', access_token);
          this.$router.push({ name: 'Main' });
        } else {
          this.message = rs.result.message;
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
@import '../../../sass/Login.module.scss';
</style>
