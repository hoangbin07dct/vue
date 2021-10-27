<template>
  <div :class="stclasses" v-click-outside="hideCalendar">
    <template>
      <input type="text" name="txtDateTime" v-model="stOutput" autocomplete="off" :class="stclassOutput" @click="showCalendar" />
    </template>
    <div :class="stclassView" v-if="_outputShow">
      <DaysView
        v-if="_showDayView"
        :className="className"
        :language="stlanguage"
        :format="stFormat"
        :timeFormat="stTimeFormat"
        :value="stvalue"
        :output="stOutput"
        @selectDate="selectDate"
        @switchView="switchView"
      />
      <MonthsView
        v-if="_showMonthView"
        :className="className"
        :language="stlanguage"
        :value="stvalue"
        :onlyMode="_modeMonths"
        @selectDate="selectDate"
        @switchView="switchView"
      />
      <YearsView
        v-if="_showYearView"
        :className="className"
        :value="stvalue"
        :onlyMode="_modeYears"
        @selectDate="selectDate"
        @switchView="switchView"
      />
      <TimesView
        v-if="_showTimeView"
        :className="className"
        :format="stFormat"
        :value="stvalue"
        :onlyMode="_modeTimes"
        @switchView="switchView"
        @selectTime="selectTime"
      />
    </div>
  </div>
</template>

<script>
import ClickOutside from 'vue-click-outside';
import { handleDate, getYear, getMonth, getDate, getTime, showValue, getHours, getMins, getSeconds, detectMode, mergeFormat } from './ProcessData.js';
import DaysView from './Views/DaysView.vue';
import MonthsView from './Views/MonthsView.vue';
import YearsView from './Views/YearsView.vue';
import TimesView from './Views/TimesView.vue';
let timer = null;
export default {
  name: 'DateTime',
  components: {
    DaysView,
    MonthsView,
    YearsView,
    TimesView
  },
  props: {
    className: {
      type: String
    },
    time: {
      type: Boolean
    },
    input: {
      type: Boolean
    },
    value: {
      type: String
    },
    language: {
      type: String
    },
    dateFormat: {
      type: String
    },
    timeFormat: {
      type: String
    },
    input: {
      type: Boolean
    },
    modeView: {
      type: String
    }
  },
  data() {
    const valueCurrent = handleDate(this.value);
    const format = mergeFormat(this.dateFormat, this.timeFormat);
    console.log(format);
    return {
      isShow: false,
      ststatus: detectMode(this.modeView),
      stclasses: this.className ? `mrbPicker ${this.className}` : 'mrbPicker',
      stclassOutput: this.className ? `mrbPicker__output ${this.className}__output` : 'mrbPicker__output',
      stclassView: this.className ? `mrbPicker__view ${this.className}__view` : 'mrbPicker__view',
      stDateFormat: this.dateFormat,
      stTimeFormat: this.timeFormat,
      stOutput: this.value ? showValue(this.value, format) : '',
      stFormat: format,
      stvalue: valueCurrent,
      stlanguage: this.language ? this.language : 'VN'
    };
  },
  methods: {
    showCalendar() {
      this.isShow = true;
      this.stclasses = `${this.stclasses} open`;
    },
    hideCalendar() {
      this.isShow = false;
      this.stclasses = this.className ? `mrbPicker ${this.className}` : 'mrbPicker';
    },
    switchView(e) {
      clearTimeout(timer);
      timer = setTimeout(() => {
        this.stYear = e.year.toString();
        this.stMonth = e.month.toString();
        this.ststatus = e.status;
        this.isShow = true;
      }, 0);
    },
    selectDate(e) {
      console.log(e);
      this.$emit('onChanged', e);
      this.isShow = false;
    },
    selectTime(e) {
      this.$emit('onChanged', e);
    }
  },
  computed: {
    _showDayView() {
      return this.ststatus === 0;
    },
    _showMonthView() {
      return this.ststatus === 1;
    },
    _showYearView() {
      return this.ststatus === 2;
    },
    _showTimeView() {
      return this.ststatus === 3;
    },
    _outputShow() {
      return this.isShow;
    },
    _modeMonths() {
      return this.modeView === 'months';
    },
    _modeYears() {
      return this.modeView === 'years';
    },
    _modeTimes() {
      return this.modeView === 'times';
    }
  },
  beforeDestroy() {
    clearTimeout(timer);
    timer = null;
  },
  watch: {
    value() {
      const valueCurrent = handleDate(this.value);
      this.stOutput = this.value ? showValue(this.value, this.stFormat) : '';
      this.stvalue = valueCurrent;
      this.stYear = getYear(valueCurrent);
      this.stMonth = getMonth(valueCurrent);
      this.stDate = getDate(valueCurrent);
      this.stHours = getHours(valueCurrent);
      this.stMins = getMins(valueCurrent);
      this.stSeconds = getSeconds(valueCurrent);
    }
  },
  directives: {
    ClickOutside
  }
};
</script>
<style lang="scss" scoped>
@import './Styles/style.scss';
</style>
