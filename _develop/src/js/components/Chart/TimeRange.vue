<template>
  <div class="chart__timeControl__time">
    <!-- <DataTime className="txtDate" language="VN" v-modeViewl="datetime" format="YYYY-MM-DD" @onChanged="onChanged" :input="true" /> -->
    <DataTime
      className="txtDate"
      language="JP"
      :value="datetime"
      dateFormat="YYYY-M-D"
      timeFormat="HH:mm"
      isValidDate="2021-10-27"
      @onChanged="onChanged"
    />
    <DataTime
      className="txtYear"
      language="EN"
      :value="datetime2"
      dateFormat="YYYY"
      modeView="years"
      closeOnSelect="true"
      @onChanged="onChanged2"
    />
    <DataTime
      className="txtMonth"
      language="EN"
      :value="datetime3"
      dateFormat="MM"
      timeFormat="false"
      modeView="months"
      closeOnSelect="true"
      @onChanged="onChanged3"
    />
    <DataTime
      className="txtTime"
      language="EN"
      :value="datetime4"
      timeFormat="HH:mm"
      modeView="times"
      closeOnSelect="true"
      @onChanged="onChanged4"
    />
  </div>
</template>
<script>
// import { Datetime } from 'vue-datetime';
import DataTime from '../DateTimePicker/Index.vue';
export default {
  name: 'TimeRange',
  components: {
    DataTime
  },
  data() {
    return {
      datetime: '',
      datetime2: '',
      datetime3: '',
      datetime4: ''
    };
  },
  methods: {
    onChanged(e) {
      // console.log(e);
      this.datetime = e;
    },
    onChanged2(e) {
      // console.log(e);
      this.datetime2 = e;
    },
    onChanged3(e) {
      this.datetime3 = e;
    },
    onChanged4(e) {
      this.datetime4 = e;
    }
  }
};
</script>

<style lang="scss">
@import '../../../sass/Chart.module';
</style>
