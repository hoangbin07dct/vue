<template>
  <div class="sidebar" :class="{ show: isActived }">
    <div class="sidebar-action" @click="openMenu">
      <a-icon type="menu" v-if="isActived" :style="{ fontSize: '20px', color: '#fff' }" />
      <a-icon type="arrow-left" v-if="!isActived" :style="{ fontSize: '20px', color: '#fff' }" />
    </div>
    <ul class="menu">
      <li :class="currentPath === '/' ? 'active' : ''">
        <router-link :to="{name: 'Main'}">ホーム<a-icon type="home" /></router-link>
      </li>
      <li :class="currentPath === '/learn-vue/user' ? 'active' : ''">
        <router-link :to="{name: 'User'}">ユーザー<a-icon type="team" /></router-link>
      </li>
      <li :class="currentPath === '/company' ? 'active' : ''">
        <router-link :to="{name: 'Company'}">会社<a-icon type="bank" /></router-link>
      </li>
      <li :class="currentPath === '/chart' ? 'active' : ''">
        <router-link :to="{name: 'Chart'}">チャート<a-icon type="bar-chart" /></router-link>
      </li>
      <!-- <li>{{isActived}}</li> -->
    </ul>
  </div>
</template>

<script>
import { detectDevice } from '../../utils/helpers';
export default {
  data() {
    return {
      isOpen: false,
      isMobile: false
    };
  },
  mounted() {
    this.isMobile = detectDevice();
  },
  computed: {
    isActived() {
      if (this.isMobile) {
        return true;
      } else {
        return this.isOpen;
      }
    }
  },
  methods: {
    currentPath() {
      return this.$route.path;
    },
    openMenu() {
      if (this.isMobile) {
        this.$emit('clicked', true);
        } else {
        this.$emit('clicked', !this.isOpen);
        this.isOpen = !this.isOpen; 
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import '../../../sass/Sidebar.module';
</style>
