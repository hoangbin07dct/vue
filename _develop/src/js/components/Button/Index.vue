<template>
  <router-link v-if="link" :to="link" :class="`btn btn--${type}${className ? ' ' + className : ''}`">
    <Icon v-if="icon" :typeIcon="icon" /> {{ label }}
  </router-link>
  <span v-else :class="`btn btn--${type}${className ? ' ' + className : ''}`" @click="handleClick">
    <Icon v-if="icon" :typeIcon="icon" /> {{ label }}
  </span>
</template>

<script>
import Icon from './Icon';
export default {
  name: 'Button',
  components: {
    Icon
  },
  props: {
    className: {
      type: String
    },
    type: {
      type: String,
      required: true
    },
    label: {
      type: String,
      required: true
    },
    icon: {
      type: String
    },
    link: {
      type: Object
    }
  },
  methods: {
    handleClick(e) {
      this.$emit('click');
    }
  },
  mounted() {
    // console.log(this.className);
  }
};
</script>

<style lang="scss" scoped>
@import '../../../sass/Common.module';
</style>
