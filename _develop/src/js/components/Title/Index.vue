<template id="title">
  <div class="pageHeader">
    <h2 class="pageTitle">{{title}}</h2>
  </div>
</template>
<script>

export default {
  name: 'Title',
  props: {
    title: {
      type: String,
      required: true
    }
  }
};
</script>

<style lang="scss" scoped>
@import '../../../sass/Title.module';
</style>