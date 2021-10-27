<template>
  <div class="chart__lineChart">Line chart draw here {{ showLength }}</div>
</template>

<script>
export default {
  name: 'LineChart',
  props: {
    dataChart: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      drawData: this.dataChart
    };
  },
  methods: {
    handleDrawChart() {
      // console.log(this.drawData);
    }
  },
  computed: {
    showLength() {
      return this.drawData.length;
    }
  },
  mounted() {
    this.handleDrawChart();
  },
  watch: {
    dataChart() {
      this.drawData = this.dataChart;
      this.handleDrawChart();
    }
  }
};
</script>

<style lang="scss" scoped>
@import '../../../sass/Chart.module';
</style>
