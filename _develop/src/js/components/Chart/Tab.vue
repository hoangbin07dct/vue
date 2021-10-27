<template>
  <dl class="chart__timeControl__tab">
    <dt>期間</dt>
    <dd>
      <ul>
        <li v-for="(item, index) in list" :key="index" :class="tabActive === item.id ? 'active' : ''" @click="handleClick(item.id)">{{ item.label }}</li>
      </ul>
    </dd>
  </dl>
</template>
<script>
export default {
  name: 'Tab',
  data() {
    return {
      list: [
        { id: 1, label: 'すべて' },
        { id: 2, label: '1ヶ月' },
        { id: 3, label: '3ヶ月' },
        { id: 4, label: '6ヶ月' },
        { id: 5, label: '1年' },
        { id: 6, label: '3年' },
        { id: 7, label: '5年' },
      ],
      tabActive: 1
    };
  },
  methods: {
    handleClick(e) {
      this.tabActive = e
    }
  }
};
</script>

<style lang="scss" scoped>
@import '../../../sass/Chart.module';
</style>
